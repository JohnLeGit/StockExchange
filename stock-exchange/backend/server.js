const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const PORT = 5000;

app.use('/', express.static(path.resolve(__dirname, '../public')));
app.get('/', (req,res) => {
    return res.sendFile(path.resolve(__dirname, '../public/index.html'))
});


//Connect to the database

mongoose
    .connect(
        'mongodb+srv://johnlesoloproject:NhanMa9318006@cluster0.mlmgp.mongodb.net/?retryWrites=true&w=majority',
        {
            useNewUrlParse: true,
            useUnifiedTopology: true,
            dbName: 'StockExchangeDatabase',
        } 
    )
    .then(() => {
        console.log(`Now running from ${PORT} and successfully connect to DB`)
    })
    .catch((error) => {
        console.log(`error boosting up ${PORT} Database`)
    });














    //global error handle

    app.use((error, req,res,next) => {
        const defaultErrorHandler = {
            log: `This trigger from the global error handler`,
            status: 500,
            message: { error : `Error`}
        };
        const errorObj = Object.assign({}, defaultErrorHandler, error);
        console.log(errorObj.log);
        return res.status(errorObj.status).json(errorObj.message)
    })



    //Trigger when connecting to the database
    app.use(PORT, () => {
        console.log(`Server is running on port: ${PORT}`)
    });