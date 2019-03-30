const db = require('../../db/connect');

const TABLE = 'enrolledstudents';

exports.getAllEnrolledStudents = async () => {
  return await db({
    async: true,
    queryStr: `SELECT * FROM ${TABLE}`
  });
};

exports.findEnrolledStudent = async (studentId, teacherId) => {
  return await db({
    async: true,
    queryStr: `
            SELECT * FROM ${TABLE}
            WHERE studentId IN ? AND teacherId = ?
        `,
    queryData: [studentId, teacherId]
  });
};

exports.checkEmailStudentOrTeacher = (emails, callback) => {
  db({
    queryStr: `
            SELECT groupST.email
            FROM (select s.email as email from students as s
                UNION
                select t.email as email  from teachers as t) as groupST
            WHERE groupST.email IN (?)
        `,
    queryData: [emails],
    success: callback.success,
    error: callback.error
  });
};
