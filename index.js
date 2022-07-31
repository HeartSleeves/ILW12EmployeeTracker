import * as dotenv from "dotenv";
dotenv.config();
import inquirer from "inquirer";
import * as mysql2 from "mysql2";
import cTable from "console.table";
import { exit } from "process";

// create the connection to database
const connection = mysql2.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
connection.connect((err) => {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  startApp();
});

// display start graphic and display main menu
function startApp() {
  console.log("***********************************");
  console.log("*                                 *");
  console.log("*        EMPLOYEE MANAGER         *");
  console.log("*                                 *");
  console.log("***********************************");
  startPrompts();
}
function startPrompts() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choices",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View all Departments",
          "Add Department",
          "Quit",
        ],
      },
    ])
    .then((answers) => {
      const { choices } = answers;

      if (choices === "View All Employees") {
        viewEmployees();
      }
      if (choices === "Add Employee") {
        addEmployee();
      }
      if (choices === "Update Employee Role") {
        updateEmployee();
      }
      if (choices === "View All Roles") {
        viewRoles();
      }
      if (choices === "Add Role") {
        addRole();
      }
      if (choices === "View all Departments") {
        viewDepts();
      }
      if (choices === "Add Department") {
        addDepts();
      }
      if (choices === "Quit") {
        Quit();
      }
    });
}

// view table of employees
function viewEmployees() {
  console.log("Showing all Employees - ");
  const sql = `SELECT employee.id as ID,
                      employee.first_name AS Name,
                      employee.last_name AS Surname,
                      role.title AS Title,
                      department.name AS Department,
                      role.salary AS Salary,
                      CONCAT (manager.first_name, " ", manager.last_name) AS Manager
               FROM employee
                      LEFT JOIN role ON employee.role_id = role.id
                      LEFT JOIN department ON role.dept_id = department.id
                      LEFT JOIN employee manager ON employee.manager_id = manager.id`;

  connection
    .promise()
    .query(sql)
    .then(([rows]) => {
      console.table(rows);
    })
    .catch(console.log)
    .then(() => startPrompts());
}
// add an employee
function addEmployee() {
  let roles;
  let managers;
  connection
    .promise()
    .query("SELECT first_name, last_name, id FROM employee")
    .then((data) => {
      managers = data[0].map(({ id, first_name, last_name }) => ({
        name: first_name + " " + last_name,
        value: id,
      }));
    });
  connection
    .promise()
    .query("SELECT title, id FROM role")
    .then((data) => {
      roles = data[0].map(({ id, title }) => ({ name: title, value: id }));

      inquirer
        .prompt([
          {
            type: "input",
            message: "What is the employee's first name?",
            name: "first_name",
          },
          {
            type: "input",
            message: "What is the employee's last name?",
            name: "last_name",
          },
          {
            type: "list",
            message: "What is the employee's role?",
            name: "role",
            choices: roles,
          },
          {
            type: "list",
            message: "Who is the employee's manager?",
            name: "manager",
            choices: managers,
          },
        ])
        .then((answers) => {
          const sql =
            "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('" +
            answers.first_name +
            "', '" +
            answers.last_name +
            "'," +
            answers.role +
            "," +
            answers.manager +
            ")";

          connection
            .promise()
            .query(sql)
            .then(
              console.log(
                "added " +
                  answers.first_name +
                  " " +
                  answers.last_name +
                  " to the database"
              )
            )
            .catch(console.log)
            .then(() => startPrompts());
        });
    });
}
// update an existing employee
function updateEmployee() {
  let roles;
  let employees;
  connection
    .promise()
    .query("SELECT first_name, last_name, id FROM employee")
    .then((data) => {
      employees = data[0].map(({ id, first_name, last_name }) => ({
        name: first_name + " " + last_name,
        value: id,
      }));
    });
  connection
    .promise()
    .query("SELECT title, id FROM role")
    .then((data) => {
      roles = data[0].map(({ id, title }) => ({ name: title, value: id }));

      inquirer
        .prompt([
          {
            type: "list",
            message: "Who needs to be updated?",
            name: "employee",
            choices: employees,
          },
          {
            type: "list",
            message: "What is the employee's new role?",
            name: "role",
            choices: roles,
          },
        ])
        .then((answers) => {
          const sql =
            "UPDATE employee SET role_id = " +
            answers.role +
            " WHERE id = " +
            answers.employee;

          connection
            .promise()
            .query(sql)
            .then(console.log("employee updated in the database"))
            .catch(console.log)
            .then(() => startPrompts());
        });
    });
}
// view table of roles
function viewRoles() {
  console.log("Showing all Roles - ");
  const sql = `SELECT role.id AS ID,
                      role.title AS Title,
                      role.salary AS Salary,
                      department.name AS Department
                      FROM role
                      JOIN department ON role.dept_id = department.id`;

  connection
    .promise()
    .query(sql)
    .then(([rows]) => {
      console.table(rows);
    })
    .catch(console.log)
    .then(() => startPrompts());
}
// add a role
function addRole() {
  connection
    .promise()
    .query("SELECT name, id FROM department")
    .then((data) => {
      const dept = data[0].map(({ id, name }) => ({ name: name, value: id }));
      inquirer
        .prompt([
          {
            type: "input",
            message: "What is the role Title?",
            name: "title",
          },
          {
            type: "input",
            message: "What is the salary?",
            name: "salary",
          },
          {
            type: "list",
            message: "In which department is the role?",
            name: "dept_id",
            choices: dept,
          },
        ])
        .then((answers) => {
          const sql =
            "INSERT INTO role (title, salary, dept_id) VALUES ('" +
            answers.title +
            "'," +
            answers.salary +
            "," +
            answers.dept_id +
            ")";

          connection
            .promise()
            .query(sql)
            .then(console.log("added " + answers.title + " to the database"))
            .catch(console.log)
            .then(() => startPrompts());
        });
    });
}
// view table of departments
function viewDepts() {
  console.log("Showing all Departments - ");
  const sql = `SELECT department.id AS ID,
  department.name AS Name
  FROM department`;

  connection
    .promise()
    .query(sql)
    .then(([rows]) => {
      console.table(rows);
    })
    .catch(console.log)
    .then(() => startPrompts());
}
// add a department
function addDepts() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the department?",
        name: "name",
      },
    ])
    .then((answers) => {
      const sql =
        "INSERT INTO department (name) VALUES ('" + answers.name + "')";

      connection
        .promise()
        .query(sql)
        .then(console.log("added " + answers.name + " to the database"))
        .catch(console.log)
        .then(() => startPrompts());
    });
}
// exit application
function Quit() {
  console.log("Goodbye");
  exit();
}
