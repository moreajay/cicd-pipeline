// db.js
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'todo-mysql',
    user: 'todo-user',
    password: 'mypass', // Your MySQL password
    database: 'todo_app'
});

module.exports = pool.promise();
