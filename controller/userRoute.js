const express = require("express");
const registerSchema = require("../models/Register");
const userRoute = express.Router();
const mongoose = require("mongoose");




userRoute.post("/register", (req, res) => {
    const { name, email, password } = req.body;
    registerSchema.findOne({ email: email })
        .then(user => {
            if (user)
                res.json("User already exists");
            else {
                registerSchema.create({ name: name, email: email, password: password })
                    .then(result => alert("Account created"))
                    .catch(err => res.json("Error"));
            }
        }).catch(err => res.json("Error"));
})

userRoute.get("/", (req, res) => {
    registerSchema.find((err, data) => {
        if (err)
            return err;
        else
            return res.json(data);
    })
})

userRoute.post("/user-login", (req, res) => {
    const { email, password } = req.body;

    
    registerSchema.findOne({ email: email }, (err, user) => {
        if (err) {
          
            return res.status(500).json({ message: "Error" });
        }

        if (!user) {
            
            return res.status(401).json({ message: "User not found" });
        }

        
        if (user.password === password) {
            
            res.status(200).json({ message: "Authentication success" });
        } else {
         
            res.status(401).json({ message: "Authentication failed" });
        }
    });
});



module.exports = userRoute;