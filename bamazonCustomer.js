var mysql = require("mysql");
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "test123",
  database: "bamazonDB"
});

function start(){
  inquirer.prompt([
    // Here we create a basic text prompt.
    {
      type: "list",
      message: "What would you like to do?",
      choices:["Buy an item", "return an item"],
      name: "option",
    }
  
  ]).then(function(inquirerResponse) {
    console.log(inquirerResponse);
    if(inquirerResponse.option === "Buy an item"){
    return browseItems();
    }
  });
}

function browseItems(){
  connection.query("SELECT * FROM products;",function(err, res){
    console.log(res);
  })
}

start();