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
    else
        return start();
});

function start() {
    return inquirer
        .prompt({
            name: "menu",
            type: "list",
            message: "What would you like to do?",
            choices: ["View all employees", "Add new employee", "View all roles", "Add new role", "View all departments", "Add new department", "EXIT"],
        })
        .then((answer) => {
            if (answer.menu === "Add new department") {
                return addDepartment();
            }
            if (answer.menu === "Add new role") {
                return addRole();
            }
            if (answer.menu === "Add new employee") {
                return addEmployee();
            }
            else {
                connection.end();
            }
        })
        .catch((error) => {
            console.log(error);
            process.exit(1);
        });
}

function addDepartment() {
    return inquirer
        .prompt([
            {
                name: "name",
                type: "input",
                message: "What is the name of the new department?",
            },
        ])
        .then(function (answer) {
            console.log("Adding " + answer.name + " department...\nSuccess!\n============================");
            start();
        });
}
function addRole() {
    return inquirer
        .prompt([
            {
                name: "name",
                type: "input",
                message: "What is the name of the new role?",
            },
        ])
        .then(function (answer) {
            console.log("Adding " + answer.name + " role...\nSuccess!\n============================");
            start();
        });
}

function addEmployee() {
    return inquirer
        .prompt([
            {
                name: "name",
                type: "input",
                message: "What is the name of the new employee?",
            },
        ])
        .then(function (answer) {
            console.log("Adding " + answer.name + " employee...\nSuccess!\n============================");
            start();
        });
}

// function update() {
//     console.log("Small successes!")
// }