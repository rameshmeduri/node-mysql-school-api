const db = require('../../db/connect');
const notificationUtil = require('../utils/notification.util');
const _ = require('lodash');

/**
 *
 *  req.body.notification
 *      - expects to be a message
 *      - tagging students message should contain `@<student email>` e.g. @student@email.com
 *
 *  notificationUtil.getAllMentionStudentsEmail
 *      -  returns array [] e.g. ['@student@email.com']
 *      -  message that contains email format that does not
 *         start with `@` (e.g. `sample_email@email.com`) will be ignored
 *
 *  cleanStudentEmails
 *      - removes '@' from the array
 *      - returns new array [] e.g. ['student@email.com']
 *
 * @returns {[]} array of student emails
 */
exports.get = (req, res) => {
  const teacher = req.body.teacher;
  const studentArray = notificationUtil.getAllMentionStudentsEmail(
    req.body.notification
  ) || [''];
  let cleanStudentEmails = studentArray.map((s) => (s ? s.substr(1) : s));
  cleanStudentEmails = cleanStudentEmails.length
    ? _.uniq(cleanStudentEmails)
    : cleanStudentEmails;
  db({
    queryStr: `
                    SELECT DISTINCT s.email as email
                    FROM enrolledstudents AS e
                    INNER JOIN teachers t ON (e.teacherId = t.teacherId)
                    LEFT JOIN students s ON (e.studentId = s.studentId)
                    WHERE t.email = ? AND s.isSuspended = 0
                    UNION
                    SELECT DISTINCT mentionedStuds.email as email
                    FROM students AS mentionedStuds
                    WHERE mentionedStuds.email IN (?) AND mentionedStuds.isSuspended = 0    
                    `,
    queryData: [teacher, cleanStudentEmails],
    success(studes) {
      res.status(200).send({
        recipients: studes
          .map((s) => s.email)
          .sort((a, b) => a.localeCompare(b))
      });
    }
  });
};
