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

const VIEW_EMPLOYEES = "View all employees"
const VIEW_ROLES = "View all roles"
const VIEW_DEPARTMENTS = "View all departments"

const ADD_EMPLOYEES = "Add new employee"
const ADD_ROLES = "Add new role"
const ADD_DEPARTMENTS = "Add new department"

const UPDATE_EMPLOYEE = "Update existing employee's role"

function start() {
    return inquirer
        .prompt({
            name: "menu",
            type: "list",
            message: "What would you like to do?",
            choices: [VIEW_EMPLOYEES,
                ADD_EMPLOYEES,
                VIEW_ROLES,
                ADD_ROLES,
                VIEW_DEPARTMENTS,
                ADD_DEPARTMENTS,
                UPDATE_EMPLOYEE,
                "EXIT",],
        })
        .then((answer) => {
            if (answer.menu === ADD_DEPARTMENTS) {
                return addDepartment();
            }
            if (answer.menu === ADD_ROLES) {
                return addRole();
            }
            if (answer.menu === ADD_EMPLOYEES) {
                return addEmployee();
            } if (answer.menu === VIEW_DEPARTMENTS) {
                return viewDepartments();
            }
            if (answer.menu === VIEW_ROLES) {
                return viewRoles();
            }
            if (answer.menu === VIEW_EMPLOYEES) {
                return viewEmployees();
            }
            if (answer.menu === UPDATE_EMPLOYEE) {
                return updateEmployeeRole();
            }
            else {
                connection.end();
            }
        })
        .catch((error) => {
            console.log(error);
            process.exit(1);
        });
};

function addDepartment() {
    return inquirer
        .prompt([
            {
                name: "title",
                type: "input",
                message: "What is the title of the new department?",
            },
        ])
        .then((answer) => {
            // when finished prompting, insert a new item into the db with that info
            return connection.query(
                "INSERT INTO departments SET VALUES ?",
                //   {
                //     title: answer.title,
                //   },
                (err) => {
                    if (err) {
                        throw err;
                    }
                    console.log("Added new department " + answer.title + "...\nSuccess!\n============================");
                    // re-prompt the user for if they want to bid or post
                    return start();
                }
            );
        });
}
function addRole() {
    return inquirer
        .prompt([
            {
                name: "title",
                type: "input",
                message: "What is the title of the new role?",
            },
        ])
        .then(function (answer) {
            console.log("Adding " + answer.title + " role...\nSuccess!\n============================");
            start();
        });
}

function addEmployee() {
    return connection.query("SELECT * FROM roles", (err, results) => {
        if (err) {
            throw err;
        }
        const roles = results.map((row) => row.title);
        // once you have the items, prompt the user for which they'd like to bid on
        return inquirer
            .prompt([
                {
                    name: "firstName",
                    type: "input",
                    message: "What is the first name of the new employee?",
                },
                {
                    name: "lastName",
                    type: "input",
                    message: "What is the last name of the new employee?",
                },
                {
                    name: "roleId",
                    type: "list",
                    choices: roles,
                    message: "What role would you like to assign?",
                },
            ])
            .then(function (choices) {
                return connection.query(
                    `INSERT INTO employees CONCAT(employees.firstName, " ", employees.lastName),
                    SET VALUES ?`,
                    [
                      {
                        firstName: choices.firstName,
                      },
                      {
                        lastName: choices.lastName,
                      },
                      {
                        roleId: choices.lastName,
                      },
                    ],
                    (error) => {
                      if (error) {
                        throw err;
                      }
                      console.log("Added new employee " + choices.firstName + " " + choices.lastName + "...\nSuccess!\n============================");
                      return start();
                    }
                );


            });
    
});
};

function viewEmployees() {
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
        } else
            console.table(results);
        // go back to the menu
        start();
    });
}

function viewRoles() {
    // query db for students joined with classes and departments
    const sqlString = `
    SELECT 
    roles.title AS Role,
    roles.salary AS Salary,
    departments.title AS Department
  FROM roles
  INNER JOIN departments ON roles.deptId = departments.id;
      `;
    connection.query(sqlString, (error, results) => {
        // display the results a formatted table
        if (error) {
            throw error;
        } else
            console.table(results);
        // go back to the menu
        start();
    });
}

function viewDepartments() {
    // query db for students joined with classes and departments
    const sqlString = `
    SELECT DISTINCT departments.id AS ID, 
    departments.title AS Department FROM departments;
      `;
    connection.query(sqlString, (error, results) => {
        // display the results a formatted table
        if (error) {
            throw error;
        } else
            console.table(results);
        // go back to the menu
        start();
    });
}

function updateEmployeeRole() {
    // get all the students
    const employeesSql = `
    SELECT
    employees.id AS ID,
    CONCAT(employees.firstName, " ", employees.lastName) AS Name,
    roles.title AS Role,
    departments.title AS Department
  FROM employees
  INNER JOIN roles ON employees.roleId = roles.id
  INNER JOIN departments ON roles.deptId = departments.id;
    `;
    connection.query(employeesSql, (error, employeeRows) => {
        // display the results a formatted table
        if (error) {
            throw error;
        }
        console.table(employeeRows);
        inquirer
            .prompt({
                name: "employeeId",
                type: "input",
                message: "Enter employee id:",
            })
            .then((employeeChoiceAnswers) => {
                connection.query("SELECT * FROM roles;", (error, results) => {
                    console.table(results);
                    inquirer
                        .prompt({
                            name: "roleId",
                            type: "input",
                            message: "Enter new role id:",
                        })
                        .then((roleChoiceAnswers) => {
                            const employeeId = employeeChoiceAnswers.employeeId;
                            const roleId = roleChoiceAnswers.roleId;
                            connection.query(
                                "UPDATE employees SET roleId = ? WHERE id = ?;",
                                [roleId, employeeId],
                                (error, results) => {
                                    console.log("Updating employee role...\nSuccess!\n============================");
                                    start();
                                }
                            );
                        });
                });
            });
    });
};
