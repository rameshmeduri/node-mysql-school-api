const router = require('express').Router();
const stringUtil = require('./utils/string.util');
const notificationUtil = require('./utils/notification.util');
const enrollmentUtil = require('./utils/enrollment.util');
const accessUtil = require('./utils/access.util');
const _ = require('lodash');

let arr = [];

function getAllEmails(obj) {
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      if (prop === 'notification') {
        (notificationUtil.getAllMentionStudentsEmail(obj[prop]) || []).map(
          (n) => {
            arr.push(n.substr(1));
          }
        );
      } else if (typeof obj[prop] === 'object') {
        getAllEmails(obj[prop]);
      } else {
        arr.push(obj[prop]);
      }
    }
  }
  return arr;
}

router.use(async (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  let params;
  arr = [];
  switch (req.method) {
    case 'POST':
      params = req.body;
      break;
    case 'GET':
      params = req.query;
      break;
  }

  const emails = getAllEmails(params);

  const invalidEmails = emails.filter((s) => {
    return !stringUtil.validateEmail(s);
  });

  // check for valid api parameters
  const pathname = req.baseUrl.concat(req.path);
  const requiredParameters = accessUtil.apiAccess(pathname, params);
  if (requiredParameters) {
    return res.status(206).send({
      message: `Invalid access. Required parameters \`${requiredParameters}\`. Please refer to the documents.`
    });
  }

  // Output invalid emails
  if (invalidEmails.length > 0) {
    return res.status(206).send({
      message: 'Invalid emails: '.concat(invalidEmails.join(', '))
    });
  }

  enrollmentUtil.checkEmailStudentOrTeacher(emails, {
    success: function(checkedEmails) {
      let registeredEmails = checkedEmails.map((r) => r.email);

      let unregisteredEmails = emails.filter(function(m) {
        return registeredEmails.indexOf(m) === -1;
      });

      if (unregisteredEmails.length) {
        req.proceed = false;
        return res.status(206).send({
          message: 'Unregistered emails: '.concat(unregisteredEmails.join(', '))
        });
      } else {
        next();
      }
    },
    error: function(err) {
      req.proceed = false;
      return res.status(500).send({
        message: err
      });
    }
  });
});

router.use('/register', require('./register/register.route'));
router.use('/commonstudents', require('./commonstudents/commonstudents.route'));
router.use('/suspend', require('./suspend/suspend.route'));
router.use('/unsuspended', require('./unsuspended/unsuspended.route'));
router.use(
  '/retrievefornotifications',
  require('./notifications/notifications.route')
);

module.exports = router;
