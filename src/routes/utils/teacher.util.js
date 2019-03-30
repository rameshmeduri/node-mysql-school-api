const db = require('../../db/connect');

exports.findTeacherByEmail = async (teacherEmail) => {
  return await db({
    async: true,
    queryStr: `
                    SELECT * 
                    FROM teachers
                    WHERE email IN (?)  
                  `,
    queryData: [teacherEmail]
  });
};
