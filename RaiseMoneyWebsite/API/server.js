/**The file used to start the server */
const express =require('express');  //Import the express module
const cors = require('cors')
const app = express();  //Create an instance of the express application
const RaiseMoneyAPI = require("./controllerAPI/api-controller");  // Configure a restful API path
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cors());   //Make it support cross-domain requests

app.use("/api/raisemoney", RaiseMoneyAPI);  //Mount the route to this path

app.listen(3060);  //Listen to port 3060

console.log("Server up and running on port 3060");