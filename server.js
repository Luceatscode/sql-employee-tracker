const inquirer = require('inquirer');
const { up } = require('inquirer/lib/utils/readline');
const mysql = require('mysql2');
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'employee_tracker'
});
db.connect(err => {
    console.log('ping');
    if (err) throw err;
    displayMenu();
});

function displayMenu() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'menu',
            message: 'What would you like to do?',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add Department',
                'Add Role',
                'Add Employee',
                'Update Employee Role',
                'Quit'
            ]
        }
    ])

        .then(answer => {
            switch (answer.menu) {
                case 'View All Departments':
                    viewAllDepartments();
                    break;
                case 'View All Roles':
                    viewAllRoles();
                    break;
                case 'View All Employees':
                    viewAllEmployees();
                    break;
                case 'Add Department':
                    addDepartment();
                    break;
                case 'Add Role':
                    addRole();
                    break;
                case 'Add Employee':
                    addEmployee();
                    break;
                case 'Update Employee Role':
                    updateEmployeeRole();
                    break;
                case 'Quit':
                    console.log('Goodbye!');
                    process.exit();
                    break;
                    displayMenu();
            }
        });
}
function viewAllDepartments() {
    console.log('Selecting all departments...\n');
    db.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.table(res);
        displayMenu();
    });
};
function viewAllRoles() {
    console.log('Selecting all roles...\n');
    db.query('SELECT * FROM role JOIN department on role.department_id = department.id', (err, res) => {
        if (err) throw err;
        console.table(res);
        displayMenu();
    });
};

function viewAllEmployees() {
    console.log('Selecting all employees...\n');
    db.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        console.table(res);
        displayMenu();
    });
};

function addDepartment() {
    console.log('Adding a department...\n');
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the department?'
        }])
        .then(answer => {
            db.query('insert into department (name) values (?);', [answer.name], (err, res) => {
                if (err) throw err;
                console.table(res);
                displayMenu();
            });
        })
};

function addRole() {
    console.log('Adding a role...\n');
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of the role?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the role?'
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'What is the department id of the role?'
        },])
        .then(answer => {
            db.query('insert into role (title, salary, department_id) values (?, ?, ?);', [answer.title, answer.salary, answer.department_id], (err, res) => {
                if (err) throw err;
                console.table(res);
                displayMenu();
            });
        })
};

function addEmployee() {
    console.log('Adding an employee...\n');
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the first name of the employee?'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the last first name of the employee?'
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'What is the role id of the employee?'
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'What is the employees manager id?'
        },
    ])
        .then(answer => {
            db.query('insert into employee (first_name, last_name, role_id, manager_id) values (?, ?, ?, ?);', [answer.first_name, answer.last_name, answer.role_id, answer.manager_id], (err, res) => {
                if (err) throw err;
                console.table(res);
                displayMenu();
            });
        })
};

function updateEmployeeRole() {
    console.log('Updating an employee role...\n');
    inquirer.prompt([
        {
            type: 'input',
            name: 'employee_id',
            message: 'What is the employees role id?'
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'What do you want to update the employees role id to?'
        },

    ])
        .then(answer => {
            db.query('update employee set role_id = ? where id = ?;', [answer.role_id, answer.employee_id], (err, res) => {
                if (err) throw err;
                console.table(res);
                displayMenu();
            });
        });
};