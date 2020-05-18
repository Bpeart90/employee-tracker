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
});

mainPrompt();
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
                    getAddEmployeeInfo();
                    const newEmployee = getAddEmployeeInfo();
                    console.log("add an employee");
                    console.log(newEmployee);
                    getAddEmployee(newEmployee);
                    break;
                case "Remove employee":
                    const employee = getRemoveEmployeeInfo();
                    removeEmployee(employee);
                    break;
                case "Add department":
                    const newDepartmentName = getDepartmentInfo();
                    addDepartment(newDepartmentName);
                    break;
                case "Add role":
                    addRole();
                    const newRole = getRoleInfo();
                    console.log("add a role");
                    addRole(newRole);
                    break;
                case "Update employee role":
                    const uemployee = getUpdateEmployeeRoleInfo();
                    updateEmployeeRole(uemployee);
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
        })

}

function viewRoles() {
    connection.query('SELECT * FROM role', function (error, results, fields) {
        if (error) throw error;
        console.table(results);
    });
}
function viewDepartments() {
    connection.query('SELECT * FROM role', function (error, results, fields) {
        if (error) throw error;
        console.table(results);
    });
}
function viewEmployees() {
    connection.query('SELECT * FROM role', function (error, results, fields) {
        if (error) throw error;
        console.table(results);
    });
}
function viewEmployeesByDepartments() {
    connection.query('SELECT * FROM role', function (error, results, fields) {
        if (error) throw error;
        console.table(results);
    });
}
async function getAddEmployeeInfo() {
    const managers = await getManagerName();
    const roles = await getRoles();
    return inquirer
        .prompt([
            {
                type: "input",
                name: "first_name",
                message: "What is the employee's first name?"
            },
            {
                type: "input",
                name: "last_name",
                message: "What is the employee's last name?"
            },
            {
                type: "list",
                message: "What is the employee's role?",
                name: "role",
                choices: [
                    // populate from db
                    ...roles
                ]
            },
            {
                type: "list",
                message: "Who is the employee's manager?",
                name: "manager",
                choices: [
                    // populate from db
                    ...managers
                ]
            }
        ])
}
async function getManagerName() {
    let query = "SELECT * FROM employee WHERE manager_id IS NULL";
    connection.query(query, function (err, res) {
        if (err) throw err;

        // Log all results of the SELECT statement
        console.log(res);

    });


    // //console.log("number of rows returned " + rows.length);
    // let employeeNames = [];
    // for (const employee of rows) {
    //     employeeNames.push(employee.first_name + " " + employee.last_name);
    // }
    // return employeeNames;
}
function getRoles() {
    let query = "SELECT title FROM role";
    const rows = connection.query(query);
    console.log(rows);
    return rows;


    //connection.query(query, function (err, res) {
    //if (err) throw err;

    // Log all results of the SELECT statement
    //console.log(res);

    //});
    //console.log("Number of rows returned: " + rows.length);

    // let roles = [];
    // for (const row of rows) {
    //     roles.push(row.title);
    // }

    // return roles;
}
async function getAddEmployee(employeeInfo) {
    let roleId = await getRoleId(employeeInfo.role);
    let managerId = await getEmployeeId(employeeInfo.manager);

    // INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Bob", "Hope", 8, 5);
    let query = "INSERT into employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)";
    let args = [employeeInfo.first_name, employeeInfo.last_name, roleId, managerId];
    const rows = await connection.query(query, args);
    console.log(`Added employee ${employeeInfo.first_name} ${employeeInfo.last_name}.`);
}
async function getRemoveEmployeeInfo() {
    const employees = await getEmployeeNames();
    return inquirer
        .prompt([
            {
                type: "list",
                message: "Which employee do you want to remove?",
                name: "employeeName",
                choices: [
                    // populate from db
                    ...employees
                ]
            }
        ])
}
async function getEmployeeId(fullName) {
    // First split the name into first name and last name
    let employee = getFirstAndLastName(fullName);

    let query = 'SELECT id FROM employee WHERE employee.first_name=? AND employee.last_name=?';
    let args = [employee[0], employee[1]];
    connection.query(query, function (err, res) {
        if (err) throw err;

        // Log all results of the SELECT statement
        console.log(res);

    }); return rows[0].id;
}
async function getRemoveEmployee(employeeInfo) {
    const employeeName = getFirstAndLastName(employeeInfo.employeeName);
    // DELETE from employee WHERE first_name="Cyrus" AND last_name="Smith";
    let query = "DELETE from employee WHERE first_name=? AND last_name=?";
    let args = [employeeName[0], employeeName[1]];
    const rows = await connection.query(query, args);
    console.log(`Employee removed: ${employeeName[0]} ${employeeName[1]}`);
}
async function getDepartmentInfo() {
    return inquirer
        .prompt([
            {
                type: "input",
                message: "What is the name of the new department?",
                name: "departmentName"
            }
        ])
}
async function addDepartment(departmentInfo) {
    const departmentName = departmentInfo.departmentName;
    let query = 'INSERT into department (name) VALUES (?)';
    let args = [departmentName];
    const rows = await connection.query(query, args);
    console.log(`Added department named ${departmentName}`);
}
async function getDepartmentId(departmentName) {
    let query = "SELECT * FROM department WHERE department.name=?";
    let args = [departmentName];
    connection.query(query, args, function (err, res) {
        if (err) throw err;

        // Log all results of the SELECT statement
        console.log(res);

    });
}
async function getRoleInfo() {
    const departments = await getDepartmentName();
    return inquirer
        .prompt([
            {
                type: "input",
                message: "What is the title of the new role?",
                name: "roleName"
            },
            {
                type: "input",
                message: "What is the salary of the new role?",
                name: "salary"
            },
            {
                type: "list",
                message: "Which department uses this role?",
                name: "departmentName",
                choices: [
                    // populate from db
                    ...departments
                ]
            }
        ])
}
async function addRole(roleInfo) {
    // INSERT into role (title, salary, department_id) VALUES ("Sales Manager", 100000, 1);
    const departmentId = await getDepartmentId(roleInfo.departmentName);
    const salary = roleInfo.salary;
    const title = roleInfo.roleName;
    let query = 'INSERT into role (title, salary, department_id) VALUES (?,?,?)';
    let args = [title, salary, departmentId];
    const rows = await connection.query(query, args);
    console.log(`Added role ${title}`);
}
async function getRoleId(roleName) {
    let query = "SELECT * FROM role WHERE role.title=?";
    let args = [roleName];
    connection.query(query, args, function (err, res) {
        if (err) throw err;

        // Log all results of the SELECT statement
        console.log(res);

    });
}
async function addRole(roleInfo) {
    // INSERT into role (title, salary, department_id) VALUES ("Sales Manager", 100000, 1);
    const departmentId = await getDepartmentId(roleInfo.departmentName);
    const salary = roleInfo.salary;
    const title = roleInfo.roleName;
    let query = 'INSERT into role (title, salary, department_id) VALUES (?,?,?)';
    let args = [title, salary, departmentId];
    const rows = await connection.query(query, args);
    console.log(`Added role ${title}`);
}
async function getDepartmentId(departmentName) {
    let query = "SELECT * FROM department WHERE department.name=?";
    let args = [departmentName];
    connection.query(query, args, function (err, res) {
        if (err) throw err;

        // Log all results of the SELECT statement
        console.log(res);

    });
}
async function getUpdateEmployeeRoleInfo() {
    const employees = await getEmployeeNames();
    const roles = await getRoles();
    return inquirer
        .prompt([
            {
                type: "list",
                message: "Which employee do you want to update?",
                name: "employeeName",
                choices: [
                    // populate from db
                    ...employees
                ]
            },
            {
                type: "list",
                message: "What is the employee's new role?",
                name: "role",
                choices: [
                    // populate from a5f4r
                    ...roles
                ]
            }
        ])

}
async function getEmployeeNames() {
    let query = "SELECT * FROM employee";

    const rows = await connection.query(query);
    let employeeNames = [];
    for (const employee of rows) {
        employeeNames.push(employee.first_name + " " + employee.last_name);
    }
    return employeeNames;
}
async function updateEmployeeRole(employeeInfo) {
    // Given the name of the role, what is the role id?
    // Given the full name of the employee, what is their first_name and last_name?
    // UPDATE employee SET role_id=1 WHERE employee.first_name='Mary Kay' AND employee.last_name='Ash';
    const roleId = await getRoleId(employeeInfo.role);
    const employee = getFirstAndLastName(employeeInfo.employeeName);

    let query = 'UPDATE employee SET role_id=? WHERE employee.first_name=? AND employee.last_name=?';
    let args = [roleId, uemployee[0], uemployee[1]];
    const rows = await connection.query(query, args);
    console.log(`Updated employee ${employee[0]} ${employee[1]} with role ${employeeInfo.role}`);
}
async function removeEmployee(employeeInfo) {
    const employeeName = getFirstAndLastName(employeeInfo.employeeName);
    // DELETE from employee WHERE first_name="Cyrus" AND last_name="Smith";
    let query = "DELETE from employee WHERE first_name=? AND last_name=?";
    let args = [employeeName[0], employeeName[1]];
    const rows = await connection.query(query, args);
    console.log(`Employee removed: ${employeeName[0]} ${employeeName[1]}`);
}
function getFirstAndLastName(fullName) {
    // If a person has a space in their first name, such as "Mary Kay", 
    // then first_name needs to ignore that first space. 
    // Surnames generally do not have spaces in them so count the number
    // of elements in the array after the split and merge all before the last
    // element.
    let employee = fullName.split(" ");
    if (employee.length == 2) {
        return employee;
    }

    const last_name = employee[employee.length - 1];
    let first_name = " ";
    for (let i = 0; i < employee.length - 1; i++) {
        first_name = first_name + employee[i] + " ";
    }
    return [first_name.trim(), last_name];
}
function getFirstAndLastName(fullName) {
    // If a person has a space in their first name, such as "Mary Kay", 
    // then first_name needs to ignore that first space. 
    // Surnames generally do not have spaces in them so count the number
    // of elements in the array after the split and merge all before the last
    // element.
    let employee = fullName.split(" ");
    if (employee.length == 2) {
        return employee;
    }

    const last_name = employee[employee.length - 1];
    let first_name = " ";
    for (let i = 0; i < employee.length - 1; i++) {
        first_name = first_name + employee[i] + " ";
    }
    return [first_name.trim(), last_name];
}
process.on("exit", async function (code) {
    await connection.end();
    return console.log(`About to exit with code ${code}`);
});