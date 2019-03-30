const db = require('../../db/connect');
const _ = require('lodash');

exports.get = (req, res) => {
  let { teacher } = req.query; //required parameter
  teacher = typeof teacher === 'object' ? teacher : (teacher || '').split(','); //convert to array irregardless
  const teachers = _.uniq(teacher); //get unique teacher e.g. ['t1@teacher.com,' 't1@teacher.com'] => ['t1@teacher.com']
  const teachersLength = typeof teachers === 'object' ? teachers.length : 1;
  db({
    queryStr: `
                        SELECT s.email
                        FROM enrolledstudents AS e
                        INNER JOIN teachers t ON e.teacherId = t.teacherId
                        INNER JOIN students s ON e.studentId = s.studentId
                        WHERE t.email IN (?)
                        GROUP BY s.studentId
                        HAVING count(*)= ? 
                    `,
    queryData: [teachers, teachersLength],
    success(studes) {
      res.status(200).send({
        students: studes.map((s) => s['email'])
      });
    },
    error(err) {
      res.status(206).send({
        message: err
      });
    }
  });
};
