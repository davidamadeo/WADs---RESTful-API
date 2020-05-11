const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const courses = require("./courses")

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


mongoose.connect("mongodb+srv://davidamadeo:zef123456789@cluster0-s20qu.mongodb.net/test?retryWrites=true&w=majority",
    {
        useMongoClient: true
    });

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /products'
    });
});

app.post('/courses', (req, res, next) => {
    try {
        req.body._id = mongoose.Types.ObjectId();
        const newCourse = new courses(req.body);
        const result = await newCourse.save();
        res.status(210).json({
            message: "Handling POST requests to /courses. Course added successfully."
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    };
});
app.get('/', (req, res, next) => {
    try {
        Product.find()
            .exec()
            .then(docs => {
                console.log(docs);
                res.status(200).json(docs);
            });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    };
});

app.get('/courses/:coursesId', (req, res, next) => {
    try {
        const id = req.params.coursesId;
        courses.findById(id)
            .exec()
            .then(doc => {
                console.log('From database', doc);
                res.status(200).json(doc);
            });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
});

app.delete('/courses/"courseId', (req, res, next) => {
    try {
        const id = req.params.coursesId;
        courses.remove({ _id: id })
            .exec()
            .then(result => {
                res.status(200).json(result);
            });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
});

app.patch('/courses/:coursesId', (req, res, next) => {
    try {
        const id = req.params.coursesId;
        const updateOps = {};
        for (const ops of req.body) {
            updateOps[ops.propName] = ops.value;
        }
        courses.update({ _id: id }, { $set: updateOps })
            .exec()
            .then(result => {
                console.log(result);
                res.status(200).json(result);
            });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
});

module.exports = app;
