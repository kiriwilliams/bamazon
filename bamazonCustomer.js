const mysql = require("mysql");
const inquirer =  require("inquirer");
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon"
});

var inventory = [];

function Item(id, name, department, price, quantity){
    this.id = id,
    this.name = name,
    this.department = department,
    this.price = price,
    this.quantity = quantity
};
welcome();
function welcome(){
    console.log("welcome to Bamazon!!");
    listItems();
}
function listItems(){
    connection.connect(function(err){
        if(err) throw err;
        connection.query("SELECT * FROM products", function(err, res){
            if (err) throw err;
            res.forEach(function (item){
                inventory.push(new Item(item.item_id, item.product_name, item.department_name, item.price, item.stock_quantity));
                console.log("---\n ID: "+item.item_id+ "\n Name: " + item.product_name+ "\n Price: $" +item.price);
            });
            userInput();
        });
    });
  
}

function userInput(){
    inquirer.prompt([
        {
            type: "input",
            name: "product",
            message: "Please enter the ID # of the product you would like to buy: "
        },
        {
            type: "input",
            name: "quantity",
            message: "How many units would you like to buy?"
        }
    ]).then(function(res){
        var product = res.product;
        var quantity = res.quantity;
        console.log("Bought "+quantity+" unit(s).");
        buyItems(product, quantity)
    })
}

function buyItems(product, quantity){
    connection.query("SELECT * FROM products WHERE ? ",
    {
        item_id: product
    }, function(err, res){
        if (err) throw err;
        var stock = parseInt(res[0].stock_quantity);
        var cost = parseInt(res[0].price) * parseInt(quantity);

        var previousSales = parseInt(res[0].product_sales);
        var product_sales;
        if(previousSales){
            product_sales = previousSales +  parseInt(cost);
        }
        else{
            product_sales = parseInt(cost);
        }


        if (stock >= quantity){
            var remainingStock = stock - quantity;
            connection.query("UPDATE products SET ? WHERE ?",[{
                stock_quantity: remainingStock,
                product_sales: product_sales
            },
            {
                item_id: product
            }],function(err, res){
                if (err) throw err;
                console.log("Your total comes to "+cost);
               
            });

        }
        else{
            console.log("There are only "+stock+ " left in stock.")
        }
    })
}