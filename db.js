const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: 'Danilo1998',
  database: 'StuffOrganizer'
});

module.exports = connection;