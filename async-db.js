const inquirer = require("inquirer");
require('dotenv').config();


var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: process.env.DB_Password,
    database: "cmsDB"
});

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);

    mainPrompt();
});


function mainPrompt() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "What would you like to do?",
                name: "action",
                choices: [
                    "Add department",
                    "Add employee",
                    "Add role",
                    "Remove employee",
                    "Update employee role",
                    "View all departments",
                    "View all employees",
                    "View all employees by department",
                    "View all roles",
                    "Exit"
                ]
            }
        ]).then(answers => {
            // Use user feedback for... whatever!!

            switch (answers.action) {
                case "View all roles":
                    viewRoles();
                    break;
                case "View all departments":
                    viewDepartments();
                    break;
                case "View all employees":
                    viewEmployees();
                    break;
                case "View all employees by department":
                    viewEmployeesByDepartments();
                    break;
                case "Add employee":
                    addEmployee();
                    break;
                case "Remove employee":
                    removeEmployee();
                    break;
                case "Add department":
                    addDepartment();
                    break;
                case "Add role":
                    addRole();
                    break;
                case "Update employee role":
                    updateEmployeeRole();
                    break;
                case 'Exit': {
                    exitLoop = true;
                    process.exit(0); // successful exit
                    return;
                }
                default:
                    // code block
                    console.log(`Internal warning. Shouldn't get here. action was ${prompt.action}`);

            }
        });

};

function viewRoles() {
    connection.query('SELECT * FROM role', function (error, results, fields) {
        if (error) throw error;
        console.table(results);
    });
};
function viewEmployees() {
    connection.query('SELECT * FROM employee', function (error, results, fields) {
        if (error) throw error;
        console.table(results);
    });
}
function viewDepartments() {
    connection.query('SELECT * FROM department', function (error, results, fields) {
        if (error) throw error;
        console.table(results);
    });
}
function viewEmployeesByDepartments() {
    connection.query('SELECT employee.first_name, employee.last_name, department.name FROM employee INNER JOIN department ON employee.manager_id = department.id', function (error, results, fields) {
        if (error) throw error;
        console.table(results);
    });

};
function addEmployee() {
    let questions = [
        {
            type: "input",
            name: "id",
            message: `what is the employee's id?`
        },
        {
            type: "input",
            name: "first_name",
            message: `what is the employee's first name?`

        },
        {
            type: "input",
            name: "last_name",
            message: `what is the employee's last name?`
        },
        {
            type: "input",
            name: "role_id",
            message: "what is your role id?"
        },
        {
            type: "input",
            name: "managers_id",
            message: `what is your manager's id?`
        }
    ];
    inquirer
        .prompt(questions)
        .then(answers => {
            // tableName = employee
            // console.log(answers);
            answers_id = parseInt(answers.id);
            answers.role_id = parseInt(answers.role_id);
            answers.managers_id = parseInt(answers.managers_id);
            connection.query('INSERT INTO employee (id,first_name, last_name, role_id, manager_id) VALUES (?, ?, ?,?,?)', [answers_id, answers.first_name, answers.last_name, answers.role_id, answers.managers_id], function (error, results, fields) {

                if (error) throw error;
                console.log("Employee was added")
            });
        })
};
function addDepartment() {
    let questions = [
        {
            type: "input",
            name: "id",
            message: `what is the department's id?`
        },
        {
            type: "input",
            name: "name",
            message: `what is the department's name?`
        }
    ];
    inquirer
        .prompt(questions)
        .then(answers => {
            // let answers_id = employee.id
            // tableName = department
            // console.log(answers);
            answers_id = parseInt(answers.id);
            connection.query('INSERT INTO department (id, name) VALUES (?, ?)', [answers.id, answers.name], function (error, results, fields) {
                if (error) throw error;
                console.log("Department was added")
            });
        })
};
function addRole() {
    let questions = [
        {
            type: "input",
            name: "id",
            message: `what is the Role's id?`
        },
        {
            type: "input",
            name: "title",
            message: `what is the Role's Title?`

        },
        {
            type: "input",
            name: "salary",
            message: `what is the role's salary?`
        },
        {
            type: "input",
            name: "department_id",
            message: "what is department id for this role?"
        }
    ];
    inquirer
        .prompt(questions)
        .then(answers => {
            answers.answers_id = parseInt(answers.id);
            answers.department_id = parseInt(answers.department_id);
            connection.query('INSERT INTO role (id,title, salary, department_id) VALUES (?, ?, ?, ?)', [answers.id, answers.title, answers.salary, answers.department_id], function (error, results, fields) {
                if (error) throw error;
                console.log("Role was added")
            });
        })
};
function removeEmployee() {
    let questions = [
        {
            type: "input",
            name: "id",
            message: `what is the employee's id?`
        },
        // {
        //     type: "input",
        //     name: "first_name",
        //     message: `what is the employee's first name?`
        // },
        // {
        //     type: "input",
        //     name: "last_name",
        //     message: `what is the employee's last name?`
        // },
        // {
        //     type: "input",
        //     name: "role_id",
        //     message: "what is your role id?"
        // },
        // {
        //     type: "input",
        //     name: "managers_id",
        //     message: `what is your manager's id?`
        // }
    ];
    inquirer
        .prompt(questions)
        .then(answers => {
            connection.query('DELETE FROM employee where id = ?', [answers.id], function (error, results, fields) {
                if (error) throw error;
                console.log("Employee was deleted")
            });
        })
}
function updateEmployeeRole() {
    let questions = [
        {
            type: "input",
            name: "id",
            message: `what is the employee's id?`
        },
        {
            type: "input",
            name: "first_name",
            message: `what is the employee's first name?`

        },
        {
            type: "input",
            name: "last_name",
            message: `what is the employee's last name?`
        },
        {
            type: "input",
            name: "role_id",
            message: "what is the new role id?"
        },
        {
            type: "input",
            name: "manager_id",
            message: "what is the new manager_id?"
        }
    ];
    inquirer
        .prompt(questions)
        .then(answers => {
            answers.id = parseInt(answers.id);
            answers.role_id = parseInt(answers.role_id);
            answers.manager_id = parseInt(answers.manager_id);
            connection.query('INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?, ?)', [answers.id, answers.first_name, answers.last_name, answers.role_id, answers.managers_id], function (error, results, fields) {
                if (error) throw error;
                console.log("Employee was Updated")
            });
        })
}
process.on("exit", async function (code) {
    await connection.end();
    return console.log(`About to exit with code ${code}`);
});
