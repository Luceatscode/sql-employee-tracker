const inquirer = require('inquirer');
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee_tracker'
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
    switch (answer.choices) {
        case 'View All Departments':
            viewAllDepartments();
            break;
        case 'View All Roles':
            break;  
        case 'View All Employees':
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
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.log(res);
        // displayMenu();
    });
};
//  init();
//  connection.connect();
 displayMenu();
