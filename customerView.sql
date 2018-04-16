DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  item_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INT default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (id)
);

INSERT INTO products(item_name, department_name, price, stock_quantity)
VALUES("keyboards","tech", 60, 10);
INSERT INTO products(item_name, department_name, price, stock_quantity)
VALUES("mouse","tech", 30, 10);
INSERT INTO products(item_name, department_name, price, stock_quantity)
VALUES("fire-stick","tech", 90, 10);

INSERT INTO products(item_name, department_name, price, stock_quantity)
VALUES("scuba-gear","sports", 60, 10);
INSERT INTO products(item_name, department_name, price, stock_quantity)
VALUES("baseball glove","sports", 30, 10);
INSERT INTO products(item_name, department_name, price, stock_quantity)
VALUES("skateboard","sports", 90, 10);

INSERT INTO products(item_name, department_name, price, stock_quantity)
VALUES("Pappy","food/drink", 200, 3);
INSERT INTO products(item_name, department_name, price, stock_quantity)
VALUES("Stagg","food/drink", 600, 5);
INSERT INTO products(item_name, department_name, price, stock_quantity)
VALUES("Ardbeg Kelpie","food/drink", 99, 5);
INSERT INTO products(item_name, department_name, price, stock_quantity)
VALUES("Pappy 25","food/drink", 1000, 3);
INSERT INTO products(item_name, department_name, price, stock_quantity)
VALUES("Stagg Jr","food/drink", 65, 5);


