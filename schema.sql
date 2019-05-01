CREATE DATABASE bamazon;

USE bamazon;



SELECT * FROM products;


CREATE TABLE products(
	item_id INTEGER(11) AUTO_INCREMENT,
    product_name VARCHAR(60) NOT NULL,
    department_name VARCHAR(60),
    price INTEGER(11) NOT NULL,
    stock_quantity INTEGER(11),
    product_sales INTEGER(11),
    PRIMARY KEY (item_id)
);


CREATE TABLE departments(
	department_id INTEGER(11) AUTO_INCREMENT,
    department_name VARCHAR(60) NOT NULL,
    over_head_costs INTEGER(11),
    PRIMARY KEY (department_id)
);


