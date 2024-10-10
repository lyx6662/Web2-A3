/**For connecting to the database */
const dbModel = require("./db_model");         //Import module
const mysql = require('mysql2');

module.exports = {
    getConnection:()=>{
        return mysql.createConnection({     //Create a database connection module
            host:dbModel.host,
            user:dbModel.user,
            password:dbModel.password,
            database:dbModel.database
    });
    }
}