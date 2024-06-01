var express = require('express');
const cron = require("node-cron");
var app = express();
var path = require("path");
var cors = require('cors')
var bodyParser = require('body-parser');
//var studentModel = require('./student-model');
var mongo = require("mongoose");
//const DB = "mongodb://localhost:27017/coaching"
const DB = "mongodb+srv://rajeshkh76:rajesh@cluster0.2e8kjso.mongodb.net/coaching?retryWrites=true&w=majority"
var db = mongo.connect(DB, function (err, response) {
    if (err) { console.log(err); }
    else { console.log('Connected to ' + db, ' + ', response); }
});
app.use(cors())
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    app.use(function (req, res, next) {
        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:4200/home, http://127.0.0.1:8082/api/');

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);

        res.setHeader('Content-Security-Policy', 'upgrade-insecure-requests')

        // Pass to next layer of middleware
        next();
    });
    next();
});
var Schema = mongo.Schema;
var studentSchema = new Schema({
    firstName: {type: String},
    fathername: {type: String},
    phonenumber: {type: Number},
    fphonenumber: {type: String},
    Address : {type: String},
    INumber: {type: String},
    studentClass: {type: Object},
    subject: {type: Object},
    schoolName: {type: String},
    registrationDate: {type: String},
    totalFee: {type: String},
    comment:{type: String}},{ versionKey: false });
var studentModel = mongo.model('students', studentSchema, 'students');
app.post("/api/StudentRegistration", function (req, res) {
    var mod = new studentModel(req.body);
    if (req.body) {
        mod.save(function (err, data) {
            if (err) {
                res.send(err);
            } else {
                res.send({ data: "Record has been Inserted..!!" });
            }
        });
    }
});
var newSchema = mongo.Schema;
var feesSchema = new newSchema({
    studentName: {type: Object},
    amount: {type: String},
    paidTo: {type: Object},
    paidBy: {type: String},
    paidOn : {type: String},
    transactionMode: {type: String},
    comment:{type: String}},{ versionKey: false });
    var feesModel = mongo.model('studentfees', feesSchema, 'studentfees');
app.post("/api/feeSubmission", function (req, res) {
    var feeModel = new feesModel(req.body);
    if(req.body) {
        feeModel.save(function (err, data){
            if(err){
                res.send(err);
            } else {
                res.send({ data: "Record has been Inserted..!!"});
            }
        })
    }
} )
app.post("/api/getStudentFeeByPaidTo", function(req, res){
    const condition = req.body;
    studentModel.find(condition, function(err,data){
    if(err){
    res.send(err);
    }else{
    res.send(data);
    }});
})
app.post("/api/getStudentByClass", function(req, res){
    const condition = req.body 
    console.log("student class",req.body);
    studentModel.find(condition, function(err,data){
    if(err){
    res.send(err);
    }else{
    res.send(data);
    }});
})
app.post("/api/getStudentByName", function(req, res){
    const condition = {firstName: req.body.firstName};
    studentModel.find(condition, function(err,data){
    if(err){
    res.send(err);
    }else{
    res.send(data);
    }});
})
app.post("/api/getStudentBacklogByName", function(req, res){
    const condition =  {firstName: req.body.firstName};
    studentModel.find(condition, function(err,data){
    if(err){
    res.send(err);
    }else{
    res.send(data);
    }});
})
app.get("/api/getStudentList", function(req, res){
    studentModel.find({}, function(err,data){
    if(err){
    res.send(err);
    }else{
    res.send(data);
    }});
})
app.post("/api/deleteUser",function(req,res){
    studentModel.remove({ _id: req.body.id }, function(err) {
    if(err){
    res.send(err);
    }else{
    res.send({data:"Record has been Deleted..!!"});
    }});})
app.get("/api/getStudentFee", function(req, res){
    feesModel.find({}, function(err,data){
    if(err){
    res.send(err);
    }else{
    res.send(data);
    }});
})
var port = process.env.PORT || 8082;
app.listen(port, function () {
    console.log('Example app listening on port 8082!')
})