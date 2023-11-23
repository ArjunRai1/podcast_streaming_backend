const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const userRoute = require('./controller/userRoute');
const bodyParser = require("body-parser");
const audioRoutes = require('./controller/audioroute');
const app = express();
app.use(cors());
app.use(express.json());
mongoose.set("strictQuery", true);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/audioroute', audioRoutes);
mongoose.connect('mongodb+srv://arjunrai2214:Arjunrai2002@cluster0.42oofbu.mongodb.net/echopulse');

var db = mongoose.connection;
db.on("open", ()=>console.log("Connected to DB"));
db.on("error", ()=>console.log("Error occurred"));

app.use("/userRoute", userRoute);

app.listen(4000, ()=>{
    console.log("Server started at 4000");
})