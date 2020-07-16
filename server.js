const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table")

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
            choices: ["View all employees",
                     "Add new employee",
                     "View all roles",
                     "Add new role",
                     "View all departments",
                     "Add new department",
                     "EXIT"],
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
            } if (answer.menu === "View all departments") {
                return viewDepartment();
            }
            if (answer.menu === "View all roles") {
                return viewRole();
            }
            if (answer.menu === "View all employees") {
                return viewEmployee();
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
                name: "title",
                type: "input",
                message: "What is the name of the new department?",
            },
        ])
        .then(function (answer) {
            console.log("Adding " + answer.title + " department...\nSuccess!\n============================");
            start();
        });
}
function addRole() {
    return inquirer
        .prompt([
            {
                name: "title",
                type: "input",
                message: "What is the name of the new role?",
            },
        ])
        .then(function (answer) {
            console.log("Adding " + answer.title + " role...\nSuccess!\n============================");
            start();
        });
}

function addEmployee() {
    return inquirer
        .prompt([
            {
                name: "firstName",
                type: "input",
                message: "What is the name of the new employee?",
            },
            {
                name: "lastName",
                type: "input",
                message: "What is the name of the new employee?",
            },
        ])
        .then(function (answer) {
            console.log("Adding " + answer.firstName + answer.lastName + " employee...\nSuccess!\n============================");
            start();
        });
}

function viewEmployee() {
    // query db for students joined with classes and departments
    const sqlString = `
    SELECT CONCAT(employees.firstName, " ", employees.lastName) AS Name,
    roles.title AS Role,
    departments.title AS Department
  FROM employees
  INNER JOIN roles ON employees.roleId = roles.id
  INNER JOIN departments ON roles.deptId = departments.id;
      `;
    connection.query(sqlString, (error, results) => {
      // display the results a formatted table
      if (error) {
        throw error;
      }
      console.table(results);
      // go back to the menu
      start();
    });
  }


// function update() {
//     console.log("Small successes!")
// }

//connection.query sql strin, values, callback