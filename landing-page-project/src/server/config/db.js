const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',     // Cambia esto por tu usuario de MySQL
    password: '',     // Cambia esto por tu contraseña de MySQL
    database: 'landing_page_db'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database!');
});

module.exports = connection;