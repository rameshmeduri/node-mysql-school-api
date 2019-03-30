const mysql = require('mysql');

class Database {
  constructor() {
    const config = {
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_DATABASE
    };
    if (
      process.env.INSTANCE_CONNECTION_NAME &&
      process.env.NODE_ENV === 'production'
    ) {
      config.socketPath = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
    }

    this.db = mysql.createPool(config);
  }
  query(sql, args) {
    var self = this;
    return new Promise((resolve, reject) => {
      self.db.getConnection(function(err, connection) {
        if (err) {
          return reject(err);
        }
        const q = connection.query(sql, args, (err, rows) => {
          //console.log(self.db._freeConnections.indexOf(connection)); // -1

          connection.destroy();

          //console.log(self.db._freeConnections.indexOf(connection)); // 0
          if (err) return reject(err);
          resolve(rows);
        });
        //console.log(q.sql);
      });
    });
  }
  close() {
    return new Promise((resolve, reject) => {
      this.db.end((err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }
}

module.exports = (
  object = {
    async: false,
    queryStr: '',
    queryData: [],
    success,
    error
  },
  res = {}
) => {
  const database = new Database();

  const queryData = object.queryData;
  database.db.getConnection(function(err) {
    if (err) {
      if (typeof object.error !== 'undefined')
        return object.error('Database connection error');
    }

    if (object.async) {
      return database
        .query(object.queryStr, queryData)
        .then((result) => database.close().then(() => object.success(result)));
    } else {
      return database
        .query(object.queryStr, queryData)
        .then((result) => database.close().then(() => object.success(result)));
    }
  });
};
