var connection = require("./connection.js");

function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        if (Object.hasOwnProperty.call(ob, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }

    // translate array of strings to a single comma-separated string
    return arr.toString();
}

var orm = {
    selectAll: function (tableInput, cb) {
        var queryString = "Select * from " + tableInput + ";";
        connection.query(queryString, function (err, result) {
            if (err) throw err;
            // cb = call back
            cb(result);
        })
    },
    insertOne: function (table, cols, vals, cb) {
        var queryString = "Insert into " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, vals, function (err, result) {
            console.log("This is the error in orm " + err)
            if (err) throw err;
            // cb = callback
            cb(result);
        })
    },
    // An example of objColVals would be {name: Burger, devoured: false}
    updateOne: function (table, objColVals, condition, cb) {
        var queryString = "Update " + table;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, function (err, result) {
            if (err) throw err;
            // cb = callback
            cb(result);
        })
    },

    delete: function(table, condition, cb){
        var queryString = "Delete from " + table;
        queryString += " where ";
        queryString += condition;

        connection.query(queryString, function(err, result){
            if (err) throw err;
            
            cb(result);
        })
    }
};

module.exports = orm;