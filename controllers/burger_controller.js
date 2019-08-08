var express = require("express");

var router = express.Router();

// Imports the model (burger.js) to use its database functions.
var burger = require("../models/burger.js")

router.get("/", function(req, res){
    burger.selectAll(function(data){
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/api/burgers", function(req, res){
    console.log("This is the req.body " + req.body.burger_name)
    burger.insertOne([
        "burger_name", "devoured"
    ],
    [
        req.body.burger_name, 0
    ], function(result){
        console.log("This is the result " + result);
        res.json({ id: result.insertId });
    });
});

router.put("/api/burgers/:id", function(req, res){
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.updateOne({
        devoured: req.body.devoured
    }, condition, function(result){
        if(result.changedRows == 0){
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

router.delete("/api/burgers/:id", function(req, res){
    var condition = "id = " + req.params.id;

    burger.delete(condition, function(result){
        if(result.affectedRows == 0){
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    })
})

module.exports = router;