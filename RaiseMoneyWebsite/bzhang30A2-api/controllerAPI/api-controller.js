const express = require('express');   //Import module
const router = express.Router();
const dbcon = require("../models/crowdfunding_db")


const connection = dbcon.getConnection();  //Call getConnection() to create a new connection to the MySql database

connection.connect(); //Open connection to MySql database
//The get method used to display all active fundraisers on the home page
router.get("/",(req,res)=>{
    connection.query(
        //Use the JOIN operation to join two tables by CATEGORY_ID, and filter out inactive fundraisers by using where f.ascitive =1.
        `SELECT 
            f.FUNDRAISER_ID,
            f.ORGANIZER, 
            f.CAPTION,
            f.TARGET_FUNDING, 
            f.CURRENT_FUNDING, 
            f.CITY, 
            f.ACTIVE, 
            c.NAME AS CATEGORY_NAME,
            c.CATEGORY_ID
        FROM
            FUNDRAISER f  
        JOIN
            CATEGORY c ON f.CATEGORY_ID = c.CATEGORY_ID        
        WHERE 
            f.ACTIVE = 1;`,(err,records,fields)=>{
                if(err){
                    console.error("Error while retrieve the data");
                }else{
                    res.send(records);
                }
             })
});
//Write the get method to the drop-down box of the search page to get all categories
router.get("/use/search/CATEGORY",(req,res)=>{
    connection.query(
        `SELECT * FROM CATEGORY;`,(err,records,fields)=>{
                if(err){
                    console.error("Error while retrieve the data");
                }else{
                    res.send(records);
                }
             })
});
//The get request for the search page, using dynamic routing, and then I queried it by breaking down the string
router.get("/Search/:search",(req,res)=>{

    const searchParts = req.params.search.split('&');
    let query=
        `SELECT 
            f.FUNDRAISER_ID, 
            f.ORGANIZER, 
            f.CAPTION, 
            f.TARGET_FUNDING, 
            f.CURRENT_FUNDING, 
            f.CITY, 
            f.ACTIVE, 
            c.NAME AS CATEGORY_NAME  
        FROM 
            FUNDRAISER f  
        JOIN 
            CATEGORY c ON f.CATEGORY_ID = c.CATEGORY_ID        
        WHERE 
            f.ACTIVE=1 `;

    let queryParams = [];
    let organizer =null;
    let city =null;
    let categoryName=null;

    for(let i=0;i<searchParts.length&&i<3;i++){//Loop through the array obtained from the unraveling string and add the corresponding values to the three parameters
        const part=searchParts[i];
        if(i===0){
            organizer=part;
        }else if(i===1){
            city=part;
        }else if(i===2){
            categoryName=part;
        }
    }
    //Add clauses dynamically
    if(organizer !==''){
        query +='AND f.ORGANIZER=?';
        queryParams.push(organizer);
    }
    if(city !==''){
        query +='AND f.CITY=?';
        queryParams.push(city);
    }
    if(categoryName !==''){
        query +='AND c.NAME=?';
        queryParams.push(categoryName);
    }

    console.log(query,queryParams);

    connection.query(query,queryParams,(err,records,fields)=>{
        if(err){
            console.error("Error while retrieve the data",err);
            res.status(500).send("internal err")
        }else{
            res.send(records);
        }
    }
    
    );

});


router.get("/:ORGANIZER",(req,res)=>{
//The get request on the fundraiser interface concatenates the organizational person in the route into sql to query the information of a single organizational person.
    connection.query(
        `SELECT 
            f.FUNDRAISER_ID, 
            f.ORGANIZER, 
            f.CAPTION, 
            f.TARGET_FUNDING, 
            f.CURRENT_FUNDING, 
            f.CITY, 
            f.ACTIVE, 
            c.NAME AS CATEGORY_NAME  
        FROM 
            FUNDRAISER f  
        JOIN 
            CATEGORY c ON f.CATEGORY_ID = c.CATEGORY_ID        
        WHERE 
            f.ACTIVE=1
            AND f.ORGANIZER='${req.params.ORGANIZER}';`,(err,records,fields)=>{
                if(err){
                    console.error("Error while retrieve the data");
                }else{
                    res.send(records);
                }
             }
    )
}
);


             
module.exports = router;  //Modularize the created routes