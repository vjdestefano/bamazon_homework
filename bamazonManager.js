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
    {
      type:"list",
      message: "What would you like to do?",
      choices:["View Products for Sale","View Low Inventory","Add to Inventory","Add New Product"],
      name: "option",
    }
  ]).then(function(inquirerResponse){
    console.log(inquirerResponse);
    if(inquirerResponse.option === "View Products for Sale"){
    return browseItems();
    }
    if(inquirerResponse.option === "View Low Inventory"){
      return checkLowInv();
      }
    if(inquirerResponse.option === "Add to Inventory"){
      return inquirerAddInv();
      }
    
  })
};




function addInvNotFromCheck(){
console.log('just to add something')
}




function browseItems(){
  connection.query("SELECT * FROM products;",function(err, res){
    //console.log(res);
    res.forEach(function(item, index) {
      console.log(item.id + ": " + item.item_name + "- $" + item.price + "|Quanity: " + item.stock_quantity);
    });
    return start();
  })
}

function checkLowInv(){
  connection.query("SELECT * FROM products WHERE stock_quantity BETWEEN 0 AND 5;",function(err, res){

    //var oldQuantity = res[0].stock_quantity;
    //console.log(res);
    res.forEach(function(item, index) {
      console.log(item.id + ": " + item.item_name + "- $" + item.price + "|Quanity: " + item.stock_quantity);
    });
    return addInv();
  })
};

function addInv(){

  inquirer.prompt([
    {
      type:"input",
      message:"What is the item ID you want to add more of",
      name:"idAddNum",
      validate: function(val){
        if(!isNaN(val)){
          return true;
        } else {
          return "Please insert a another number";
        }
      }
    },
      {
      type:"input",
      message:"How many more do you need?",
      name:"numCount",
      validate: function(val){
        if(!isNaN(val)){
          return true;
        } else {
          return "Please insert a another number";
        }
      },

    }
  ]).then(function(inquirerResponse){
    console.log(inquirerResponse.idAddNum, inquirerResponse.numCount);

    var newQuantity = parseInt(inquirerResponse.numCount);

    var idFromUser = parseInt(inquirerResponse.idAddNum);

    return addInvCont(newQuantity, idFromUser);
  })

}

function addInvCont(newQuantity, idFromUser){
  console.log("this is how many will be added: " + newQuantity, "this is the ID: " + idFromUser);
  connection.query("SELECT * FROM products WHERE id=?",[
    idFromUser
  ],
     function(err, res){
    var itemName = res[0].item_name;
    var totalQuantity = newQuantity + res[0].stock_quantity;

    return updateInv(totalQuantity, idFromUser, itemName);
  })
}

function updateInv(totalQuantity, idFromUser, itemName){
  console.log("This is new quantity: " + totalQuantity, " This is the ID: " + idFromUser + " This is the name: " + itemName);
  connection.query("UPDATE products SET stock_quantity=? WHERE id=?",[
    totalQuantity,
    idFromUser
  ],
     function(err, res){
    console.log(idFromUser + ": " + itemName + " |Quantity Left: " + totalQuantity);

    return start();
  })
}

start();