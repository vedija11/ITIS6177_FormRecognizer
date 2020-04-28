const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const axios = require('axios');
var operationId = '';

//Analyze receipt
var analyzeReceipt = function(req, res){
    sourcelocalUrl = req.body.imageUrl;
    var source = sourcelocalUrl
    var body = { "url": source };
    body = JSON.stringify(body);

    headers = {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': process.env.SUBSCRIPTION_KEY
    }

    var endpoint = process.env.ANALYZE_ENDPOINT;

    axios.post(endpoint, body, { headers }).then(response => {
        operationURL = response.headers['operation-location'];
        operationId = operationURL.split("analyzeResults/")[1];
        res.send(response.headers);
    }).catch(err => {
        console.log(err);
        if (err.response.status == 400) {
            res.status(400).send({
                "errors": err.response.data.errors
            });
        } else if (err.response.status == 415) {
            res.status(415).send(err.response.data);
        } else if (err.response.status == 500) {
            res.status(500).send({
                "message": "Internal server error"
            });
        } else {
            res.status(400).send({
                "message": "Error occured"
            });
        }
    });
}

//Get Results from analyzed receipt
var receiptResults = function(req, res){

    headers = {
        'Ocp-Apim-Subscription-Key': process.env.SUBSCRIPTION_KEY
    }

    var endpoint = process.env.RESULTS_ENDPOINT + operationId;

    axios.get(endpoint, { headers }).then(response => {
        res.send(response.data);
    }).catch(err => {
        console.log(err);
        if (err.response.status == 404) {
            res.status(404).send(err.response.data);
        } else if (err.response.status == 500) {
            res.status(500).send({
                "message": "Internal server error"
            });
        } else {
            res.status(400).send({
                "message": "Error occured"
            });
        }
    });
}

var verifyToken = function (req, res, next) {//verifying the token obtained from the user.

    var headerVal = req.headers['authorization'];
    var token = headerVal.split(' ')[1];

    if(!token) return res.status(401).send({
        status : res.statusCode,
        message : 'Access Denied'
    });

    try{
        const verified = jwt.verify(token, 'myKey');
        console.log('verified', verified);
        next();
    }catch(err){
        res.status(400).send({
            status : res.statusCode,
            message : 'Invalid Token'
        });
    }

}

router.post('/analyzeReceipt', analyzeReceipt);
router.get('/receiptResults', receiptResults);

//...........................JWT.............................

router.post('/signIn',function(req,res){

    username = req.body.username;
    password = req.body.password;
    if(username==="vedija" && password==="ajidev"){
        var payLoad = {
            user: username,
    };
    var token = jwt.sign(payLoad,'myKey',{expiresIn:  "1h"})
    return res.json({token: token});
} else {
    res.status(400).send({
        "message" : "Invalid credentials!"
    });
}
});

//using the verifytoken middleware to generate the accesstoken
router.post('/user/analyzeReceipt', verifyToken, analyzeReceipt); 

module.exports = router;






