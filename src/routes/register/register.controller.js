const db = require('../../db/connect');

/**
 *
 * Story:
 * A teacher can register multiple students.
 * A student can also be registered to multiple teachers.
 *
 * Rules:
 *  1. teacher email must be in `teacher` table
 *  2. student email must be in `student` table
 *  3. teacher and student must not
 */
exports.register = async (req, res) => {
  console.log(1);
  const students =
    typeof req.body.students === 'object' && req.body.students.length
      ? req.body.students
      : [''];
  await db({
    async: true,
    queryStr: `
            INSERT INTO enrolledstudents(studentId, teacherId)
                SELECT s.studentId, t.teacherId FROM students AS s
                INNER JOIN teachers t
                LEFT JOIN enrolledstudents e ON s.studentId = e.studentId 
                            AND t.teacherId = e.teacherId
                WHERE e.studentId is NULL AND e.teacherId is NULL AND 
                    s.email IN ? AND t.email=?
        `,
    queryData: [[students.map((s) => s)], req.body.teacher],
    success() {
      res.status(204).send();
    }
  });
};
