const express=require('express');

const app = express();

const bodyParser = require('body-parser');
const url = require('url');
const queryString = require('querystring');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const mongoose=require('mongoose');
//import  port
const serverConfig = require('./configs/server.config');
app.use(express.json());


mongoose.connect("mongodb://127.0.0.1:27017/Restaurant")
        .then(() => {
                console.log("successfully connecting to restaurant DB");
        })
        .catch((err)=>{
                console.log("Error connecting to restaurant DB",err);
                process.exit();
        })
//import route
require('./routes/auth.route')(app);


//userRoute(app);
        app.listen(serverConfig.PORT,()=>{
            console.log(`server is running on ${serverConfig.PORT} PORT`)
        });
