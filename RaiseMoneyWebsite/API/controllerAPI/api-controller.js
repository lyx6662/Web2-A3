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
            CATEGORY c ON f.CATEGORY_ID = c.CATEGORY_ID;`,(err,records,fields)=>{
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
// 获取筹款活动详细信息（通过 ID）及捐款列表
router.get("/fundraiser/:id", (req, res) => {
    const fundraiserId = req.params.id;
    connection.query(`
        SELECT 
            f.FUNDRAISER_ID, 
            f.ORGANIZER, 
            f.CAPTION, 
            f.TARGET_FUNDING, 
            f.CURRENT_FUNDING, 
            f.CITY, 
            f.ACTIVE, 
            c.NAME AS CATEGORY_NAME,
            d.* -- 假设 DONATION 表的字段
        FROM 
            FUNDRAISER f  
        JOIN 
            CATEGORY c ON f.CATEGORY_ID = c.CATEGORY_ID
        LEFT JOIN -- 左连接以获取可能没有捐款的筹款活动信息
            DONATION d ON f.FUNDRAISER_ID = d.FUNDRAISER_ID
        WHERE 
            f.FUNDRAISER_ID =?;`, [fundraiserId], (err, records, fields) => {
                if (err) {
                    console.error("Error while retrieving fundraiser details", err);
                    res.status(500).send("Internal Error");
                } else {
                    res.send(records);
                }
            });
});

// 插入新的捐款
router.post("/donation", (req, res) => {
    const { fundraiserId, donorName, amount } = req.body;
    connection.query(`INSERT INTO DONATION (FUNDRAISER_ID, DONOR_NAME, AMOUNT) VALUES (?,?,?)`, [fundraiserId, donorName, amount], (err, result) => {
        if (err) {
            console.error("Error while inserting donation", err);
            res.status(500).send("Internal Error");
        } else {
            res.send("Donation inserted successfully");
        }
    });
});

// 插入新的筹款人
router.post("/fundraiser", (req, res) => {
    console.log('Received request body:', req.body);
    const { ORGANIZER, CAPTION, TARGET_FUNDING, CURRENT_FUNDING, CITY, CATEGORY_ID, ACTIVE } = req.body;
    connection.query(`INSERT INTO FUNDRAISER (ORGANIZER, CAPTION, TARGET_FUNDING, CURRENT_FUNDING, CITY, CATEGORY_ID, ACTIVE) VALUES (?,?,?,?,?,?,?)`, [ORGANIZER, CAPTION, TARGET_FUNDING, CURRENT_FUNDING, CITY, CATEGORY_ID,ACTIVE], (err, result) => {
        if (err) {
            console.error("Error while inserting fundraiser", err);
            res.status(500).send("Internal Error");
        } else {
            res.send({ "message": "Fundraiser inserted successfully" });
        }
    });
});

// 更新筹款人信息
router.put("/fundraiser/:id", (req, res) => {
    const fundraiserId = req.params.id;
    console.log('Received request body:', req.body);
    const { ORGANIZER, CAPTION, TARGET_FUNDING, CURRENT_FUNDING , CITY, CATEGORY_ID,ACTIVE } = req.body;
    console.log('Received request body:', req.body);

    connection.query(`UPDATE FUNDRAISER SET ORGANIZER =?, CAPTION =?, TARGET_FUNDING =?,CURRENT_FUNDING=?, CITY =?, CATEGORY_ID=?,ACTIVE=? WHERE FUNDRAISER_ID =?`, [ORGANIZER, CAPTION, TARGET_FUNDING, CURRENT_FUNDING, CITY, CATEGORY_ID, ACTIVE,fundraiserId], (err, result) => {
        if (err) {
            console.error("Error while updating fundraiser", err);
            res.status(500).send("Internal Error");
        } else {
            res.send({"message": "Fundraiser updated successfully"});
        }
    });
});

// 删除筹款人信息（如果没有捐款）
router.delete("/fundraiser/:id", (req, res) => {
    const fundraiserId = req.params.id;
    connection.query(`SELECT COUNT(*) AS donationCount FROM DONATION WHERE FUNDRAISER_ID =?`, [fundraiserId], (err, donationCountResult) => {
        if (err) {
            console.error("Error while checking donations for fundraiser", err);
            res.status(500).send("Internal Error");
        } else {
            const donationCount = donationCountResult[0].donationCount;
            if (donationCount > 0) {
                res.status(400).send({ "message":"You cannot delete fundraiser who have contributed"});  
            } else {
                connection.query(`DELETE FROM FUNDRAISER WHERE FUNDRAISER_ID =?`, [fundraiserId], (err, deleteResult) => {
                    if (err) {
                        console.error("Error while deleting fundraiser", err);
                        res.status(500).send("Internal Error");
                    } else {
                        res.send({"message": "Fundraiser deleted successfully"});
                    }
                });
            }
        }
    });
});

             
module.exports = router;  //Modularize the created routes