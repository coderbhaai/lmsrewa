var mysql = require('mysql')

// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'totalinfrasolutions_in_user',
//   database: 'totalinfrasolutions_in_db',
//   password: 'CnnV64jwvh0jqK3/jEmpMmN/N8Si+0nX6d9',
//   multipleStatements: true
// });

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'lmsrewa',
  password: '',
  multipleStatements: true,
  
});

module.exports = pool;
// exports.pool = pool;