/**The file used to start the server */
const express = require("express");    //Import module
const bodyParser = require("body-parser");
const path = require("path");

const app = express();  //Create an express application instance.

app.use(bodyParser.urlencoded({extended:true}));  //to parse URL-encoded & JSON data 
app.use(bodyParser.json());

app.use(express.static(__dirname));  //Provide static files (html,css, etc.) in the current directory

app.get("/",(req,res)=>{   //Home routing service
    res.sendFile(path.join(__dirname,"./html/index.html"));
});

app.get("/search",(req,res)=>{   //Search for page routing services
    res.sendFile(path.join(__dirname,"./html/search.html"));
});

app.get("/fundraiser",(req,res)=>{   //Fundraiser page routing service
    res.sendFile(path.join(__dirname,"./html/fundraiser.html"));
});

app.listen(8080,()=>{  //Listens on port 8080
    console.log("8080...(~_~)");
});


