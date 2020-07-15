const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "myOffice_db",
});

connection.connect((err) => {
    if (err) {
        throw err;
    }
    // run the start function after the connection is made to prompt the user
    else
    return start();
});

// function which prompts the user for what action they should take
function start() {
    console.log("Connection successful!")
}

// Start menu
// - Add new department
// - View Departments
// - Add new role
// - View Roles
// - Add new Employee
// - View employee
// - Update employee role