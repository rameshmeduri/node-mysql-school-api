const db = require('../../db/connect');

exports.post = async (req, res) => {
  await db({
    async: true,
    queryStr: `
            UPDATE students s
            SET isSuspended = 0
            WHERE s.email = ?
        `,
    queryData: [req.body.student]
  });

  res.status(204).send();
};
