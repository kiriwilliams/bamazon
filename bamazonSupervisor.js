const mysql = require("mysql");
const inquirer = require("inquirer");
const Table = require("cli-table");
require('dotenv').config();

//set up mysql database connection
const connection = mysql.createConnection({
    host: process.env.HOST,
    port: process.env.PORT,
    user: "root",
    password: process.env.PASSWORD,
    database: "bamazon"
});


var menuList = [
    {
        value: 1,
        name: "View Product Sales by Department"
    },
    {
        value: 2,
        name: "Create New Department"
    }
];
menu();
function menu() {
    inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "Welcome to bamazon Supervisor. What would you like to do?",
            choices: menuList
        }
    ]).then(function (answer) {
        switch (answer.action) {
            case 1:
                viewSales();
                break;
            case 2:
                makeDepartment();
                break;

        }
    })
}

function makeDepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Department name: "
        },
        {
            type: "input",
            name: "cost",
            message: "Overhead costs: "
        }
    ]).then(function (answer) {
        connection.query("INSERT INTO departments SET ?", {
            department_name: answer.name,
            over_head_costs: answer.cost
        });
    });

}

function viewSales() {

    var table = new Table({
        head: ["department_id", "department_name", "over_head_costs", "product_sales", "total_profit"],
        colWidths: [20, 20, 20, 20, 20]
    });

    connection.query(`SELECT *
            FROM products
            RIGHT JOIN departments USING (department_name)`, function(err,res){
                if(err) throw err;
                console.log(res);
            })
    table.push(
        ['1',"Electronics","1000","2000","1000"]
    );
    console.log(table.toString());


}

//select SUM product_sales, over_head_costs from products where a.deptName = b.deptName