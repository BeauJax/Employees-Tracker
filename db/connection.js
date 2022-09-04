const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'h0tsaucejackson',
    database: 'employees'
  });

  module.exports = db;