const inquirer = require('inquirer');
const db = require('./db/connection');
require('console.table');

//main menu
function menu() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'options',
            message: 'Where would you like to go?',
            choices: ['View departments list', 'View epmployee roles', 'View employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee position/Role', 'Exit']
        }
    ])
    .then((results) => {
        let option = results.options;
        if (option === 'View departments list') {
            viewDepartments();
        } else if (option === 'View employee roles') {
            viewRoles();
        } else if (option === 'View all employees') {
            viewEmployees();
        } else if (option === 'Add a department') {
            addDepartment();
        } else if (option === 'Add a role') {
            addRole();
        } else if (option === 'Add an employee') {
            addEmployee();
        } else if (option === 'Update an employee position') {
            updateRole();
        } else if (option === "View a department's budget") {
            viewBudget();
        }
        else {
            quitMenu();
        }
    })
}

//list of departments 
function viewDepartments() {
db.query('SELECT * FROM department', (err, result) => {
    if (err) throw err
    console.table(result);
    menu();
})
}

//lists of role 
function viewRoles() {
db.query('SELECT * FROM role', (err, result) => {
    if (err) throw err
    console.table(result);
    menu();
})
}

//list of employees
function viewEmployees() {
db.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department_name FROM employee LEFT JOIN role ON employee.role_id=role.id LEFT JOIN department ON role.department_id=department.id', (err, result) => {
    if (err) throw err
    console.table(result);
    menu();
})
}

//add user input
function addDepartment() {
inquirer.prompt([
    {
        type: 'input',
        name: 'newDepartment',
        message: 'Please enter a department name.'
    }
])
    .then((answer) =>
        db.promise().query('INSERT INTO department (name) VALUES (?)', answer.newDepartment, (err, result) => {
            if (err) throw err
            console.table(result);
        })).then(() => {
            menu();
        })
}

//add user input 
function addRole() {
inquirer.prompt([
    {
        type: 'input',
        name: 'newRole',
        message: 'What is the new role?'
    },
    {
        type: 'input',
        name: 'newSalary',
        message: "What is the new role's salary?"
    },
    {
        type: 'list',
        name: 'whichDepartment',
        message: 'What is the department id? 1=Engineering, 2=IT, 3=Legal, 4=Marketing',
        choices: ['1', '2', '3', '4']
    }
])
    .then((answers) =>
        db.promise().query('INSERT INTO role (title, salary, department_id) VALUE (?, ?, ?)', [answers.newRole, answers.newSalary, answers.whichDepartment], (err, result) => {
            if (err) throw err
            console.table(result);
        })).then(() => {
            menu();
        })
}

//add user input
function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newEmployeeFirst',
            message: "Please enter employee's first name."
        },
        {
            type: 'input',
            name: 'newEmployeeLast',
            message: "Please enter employee's last name."
        },
        {
            type: 'list',
            name: 'newEmployeeRole',
            message: "Please choose employee's role id.",
            choices: ['1', '2', '3', '4', '5', '6', '7', '8']
        }
    ])
        .then((answers) =>
            db.promise().query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [answers.newEmployeeFirst, answers.newEmployeeLast, answers.newEmployeeRole, answers.newEmployeeManager], (err, result) => {
                if (err) throw err
            })).then(() => {
                menu();
            })
    }
    
    //adds user input
    function updateRole() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'chooseEmployee',
            message: 'Choose the id of the employee to update.',
            choices: ['1', '2', '3', '4', '5', '6', '7', '8']
        },
        {
            type: 'list',
            name: 'newRole',
            message: 'Choose the id of the new role',
            choices: ['1', '2', '3', '4', '5', '6', '7', '8']
        }
    ])
        .then((answers) =>
            db.promise().query('UPDATE employee SET role_id=? WHERE id=?', [answers.newRole, answers.chooseEmployee], (err, result) => {
                if (err) throw err
                console.table(result);
            })).then(() => {
                menu();
            })
    }
    
    
    function quitMenu() {
    console.log("Goodbye!");
    process.exit();
    }
    
    menu();