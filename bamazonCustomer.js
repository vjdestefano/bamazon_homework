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
    //console.log(res);
    res.forEach(function(item, index) {
      console.log(item.id + ": " + item.item_name + "- $" + item.price + "|Quanity: " + item.stock_quantity);
    });
    return buyItem();
  })
}

function buyItem(){
  inquirer.prompt([
    {
      type:"input",
      message:"Please tell is the ID of the Item you want to buy. ex(4)",
      name:"customerPurchase",
      validate: function(val){
        if(!isNaN(val)){
          return true;
        } else {
          return "Please insert a another number";
        }
      }
    }, {
      type:"input",
      message:"How many would you like to buy?",
      name:"customerAmount",
      validate: function(val){
        if(!isNaN(val)){
          return true;
        } else {
          return "Please insert a another number";
        }
      }
    },
  ]).then(function(inquirerResponse){
    console.log("this is your item: " + inquirerResponse.customerPurchase + " " + typeof inquirerResponse.customerPurchase);
    return checkItem(parseInt(inquirerResponse.customerPurchase), parseInt(inquirerResponse.customerAmount));
  })
}

function checkItem(numID, numOfItems){
  console.log(numID + " and " + numOfItems);
  connection.query("SELECT * FROM products WHERE id=?",[numID],function(err, res){

    var selectedItem = res[0].item_name;
    var amountLeft = res[0].stock_quantity - numOfItems;

    res.forEach(function(item, index) {
      console.log(item.id + ": " + item.item_name + "- $" + item.price + "|Quanity: " + item.stock_quantity);
    });
    console.log(res[0].stock_quantity);
    console.log("this is the amount left: " + amountLeft);
    //check at see if the number of items are able to be purchased

    if(res[0].stock_quantity< numOfItems){
      console.log("this item doesn't have that many units availble");
      return buyItem();
    }
    if(res[0].stock_quantity === numOfItems){
      console.log("this item can be purchased but you will wipe out all of the stock");
      return checkout(numID, selectedItem, numOfItems, amountLeft);
    }
    if(res[0].stock_quantity > numOfItems){
      console.log("we have more than enough product for you");
      return checkout(numID, selectedItem, numOfItems, amountLeft);
    }

    });
  }

function checkout(numID, selectedItem, numOfItems, amountLeft){
    inquirer.prompt([
       {
      type: "list",
      message: "are you sure you want to purchase?",
      choices:["yes", "no"],
      name: "confirm",
    },
    ]).then(function(inquirerResponse){
      if(inquirerResponse.confirm === "yes"){
        console.log(inquirerResponse.confirm);
        connection.query("UPDATE products SET stock_quantity=? WHERE id=?",[
          amountLeft,
          numID
        ],
           function(err, res){
          console.log(numID + ": " + selectedItem + " |Quantity Left: " + amountLeft);
          return browseItems();
        })

      } else{
        return browseItems();
      }

    })
  }


start();