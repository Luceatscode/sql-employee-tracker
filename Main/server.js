const inquirer = require('inquirer');
const mysql = require('mysql2');
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'employee_tracker'
});
db.connect (err => {
    console.log('ping');
    if (err) throw err;
    displayMenu ();
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
            break;
        case 'Add Role':
            break;
        case 'Add Employee':
            break;
        case 'Update Employee Role':
            break;
        case 'Quit':
            break;

        // connection.end();
        // console.log('Goodbye!');
        // return;
        // default:
        //     console.log(`Invalid action: ${answer.action}`);
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
    db.query('SELECT * FROM role', (err, res) => {
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


//  init();
//  connection.connect();
//  displayMenu();
