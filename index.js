const express = require('express');

const app = express();

const bodyParser = require("body-parser")

app.use(bodyParser.json())

const cors = require("cors")

app.use(cors());

const mongoose = require('mongoose')

const dbUrl = "mongodb://chetan:chetan55.@ds131531.mlab.com:31531/signup_database"


mongoose.Promise = global.Promise

mongoose.connect(dbUrl, (err) => {
    if (err) {
        console.log("error occur" + err);
    }
    else {
        console.log(`connected with database`);
    }
})

var server_port = process.env.YOUR_PORT || process.env.PORT || 8000;
var server_host = process.env.YOUR_HOST || '0.0.0.0';

app.listen(server_port || server_host, () => {
    console.log(`server started`);
})


const user = require("./user")

const service = require('./service')

app.post('/signUp', (req, res) => {
       
    user.find({ Email: req.body.email }, (err, data) => {
        if (err) {
            console.log("err" + err);
            res.send({ "sms": err })
        }
        else if (JSON.stringify(data) == '[]') {
            const add = new user();
            add.Name = req.body.name,
                add.Email = req.body.email,
                add.Password = service.createPassword(req.body.password),
                add.DateOfBirth = req.body.dateOfBirth,
                add.PhoneNumber = req.body.phoneNumber,
                add.Gender = req.body.gender

            add.save((err, insert) => {
                if (err) {
                    console.log("err" + err);
                    res.send({ "sms": err })
                }
                else {
                    console.log("insert in data base" + insert);
                    res.send({ "sms": "inserted" });
                }
            })
        }
        else {
            console.log("same email address found ");
            res.send({ "sms": "same email found" })
        }
    })
})
app.post("/signIn", (req, res) => {

    console.log("in signin method");
    user.findOne({ Email: req.body.email }, (err, data) => {

        if (err) {
            console.log("error" + err);
            res.send({ "sms": err })
        }
        else if (data === null) {

            res.send({ "sms": "no email exist" })
        }
        else {

            if (service.validPassword(req.body.password, data.Password, data.Password.length)) {
                res.send({ "sms": "password is correct logged in" });
            }
            else {
                res.send({ "sms": "password didn't match" })
            }

        }
    })
})


app.get("/",(req,res)=>{
    res.send("hello chinmay")
})