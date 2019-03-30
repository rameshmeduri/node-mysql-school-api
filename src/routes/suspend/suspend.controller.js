const db = require('../../db/connect');

exports.post = async (req, res) => {
  const { student } = req.body;
  const studentEmail = (typeof student === 'object') ? student.join(' ') : student;
  console.log(studentEmail);
  await db({
    async: true,
    queryStr: 'UPDATE students SET \`isSuspended\`=1 WHERE \`email\`=?',
    queryData: [studentEmail],
    success() {
      if (typeof student !== 'object') {
        res.status(204).send();
      } else {
        res.status(206).send({
          message:
            'Multiple student suspension not allowed. Please check your parameter'
        });
      }
    }
  });
};
