const db = require('../../db/connect');
const LIMIT = 10; //LIMIT OF No. Of students to be fetched

exports.findStudentByEmail = async (emails) => {
  return await db({
    async: true,
    queryStr: `
            SELECT * FROM students
            WHERE email IN (?)
        `,
    queryData: [emails]
  });
};
