const mysql = require("mysql");
const inquirer = require("inquirer");

//set up mysql database connection
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon"
});

//array of choices for the inquirer menu
var menuList = [{
    value: 1,
    name: "View Products for Sale"
},
{
    value: 2,
    name: "View Low Inventory"
},
{
    value: 3,
    name: "Add to Inventory"
},
{
    value: 4,
    name: "Add New Product"
}];

//call the menu function
menu();

//MENU function prompts user with choices
function menu() {
    inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "Welcome to bamazon Manager. What would you like to do?",
            choices: menuList
        }
    ]).then(function (res) {
        switch (res.action) {
            case 1:
                listItems();
                break;
            case 2:
                lowInventory();
                break;
            case 3:
                addInventory();
            case 4:
                addProduct();
        }
    })
}
function returnToMenu() {
    inquirer.prompt([
        {
            type: "confirm",
            name: "back",
            message: "Return to menu"
        }
    ]).then(function (res) {
        if (res.back) {
            return menu();
        }
    })
}

//displays all items in the database
function listItems() {
    inventory = []; //empty out the array
    connection.connect(function (err) {
        if (err) throw err;

        //get all items in the products table
        connection.query("SELECT * FROM products", function (err, res) {
            if (err) throw err;

            //loop through each product
            res.forEach(function (item) {
                //add to the items array
                inventory.push({ value: item.item_id, name: item.product_name });
                //console log for user to see
                console.log("---\n ID: " + item.item_id + "\n Name: " + item.product_name + "\n Price: $" + item.price + "\n Stock: " + item.stock_quantity);
            });
            return returnToMenu();
        });

    });

}
function lowInventory() {
    console.log("LOW INVENTORY");
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, res) {
        if (err) throw err;
        res.forEach(function (product) {
            console.log("ID: " + product.item_id + "\n Name: " + product.product_name + "\n Stock : " + product.stock_quantity);
        })
    })

}

function addInventory() {
    var inventory = [];
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        res.forEach(function (item) {
            inventory.push({ value: item.item_id, name: item.product_name });

        });

        inquirer.prompt([
            {
                type: "list",
                name: "product",
                choices: inventory
            },
            {
                type: "input",
                name: "quantity",
                message: "How many?"
            }

        ]).then(function (answer) {
            var id = answer.product;
            var newStock = answer.quantity;


            connection.query("SELECT * FROM products WHERE ?", {
                item_id: id
            }, function (err, res) {
                if (err) throw err;

                var updatedStock = parseInt(res[0].stock_quantity) + parseInt(newStock);
                connection.query("UPDATE products SET ? WHERE ?", [
                    {
                        stock_quantity: updatedStock
                    },
                    {
                        item_id: id
                    }
                ], function (err, res) {
                    if (err) throw err;
                    console.log(res)
                });

            })

        });

    })
}

function addProduct() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Product name: "
        },
        {
            type: "input",
            name: "dept",
            message: "Department: "
        },
        {
            type: "input",
            name: "price",
            message: "Unit Price: "
        },
        {
            type: "input",
            name: "quantity",
            message: "Quantity: "
        }
    ]).then(function (answer) {
        var name = answer.name;
        var dept = answer.dept;
        var price = answer.price;
        var quantity = answer.quantity;
        connection.query("INSERT INTO products SET ?",
            {
                product_name: name,
                department_name: dept,
                price: price,
                stock_quantity: quantity
            },
            function (err, res) {
                if (err) throw err;
                console.log(res);
            })
    })
}