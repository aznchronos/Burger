var connection = require("./connection.js");

var orm = {
    selectAll: function(tableInput, cb){
        var queryString = "Select * from " + tableInput + ";";
        connection.query(queryString, function(err, result){
            if (err) throw err;
            // cb = call back
            cb(result);
        })
    },
    insertOne: function(table, cols, vals, cb){
        var queryString = "Insert into " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, vals, function(err, result){
            if(err) throw err;
            // cb = callback
            cb(result);
        })
    },
    // An example of objColVals would be {name: Burger, devoured: false}
    updateOne: function(table, objColSals, condition, cb){
        var queryString = "Update " + table;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, function(err, result) {
            if (err) throw err;
            // cb = callback
            cb(result);
        })
    }
};

module.exports = orm;