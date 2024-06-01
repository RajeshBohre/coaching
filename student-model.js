const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let studentSchema = new Schema({
    studentName: String,
    parentName: String,
    phoneNumber: Number,
    parentPhone: Number,
    address : Date,
    identityNumber: Object,
    class: String,
    subjects: String,
    schoolName: String,
    registrationDate: Date,
    totalFee: Number,
    comment: String
});

const model = mongoose.model("students", studentSchema);

module.exports = model;