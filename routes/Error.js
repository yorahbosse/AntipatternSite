const express = require('express')
const router = express.Router() //criar rotas em arquivos separados
const db = global.sequelize
const { Op } = require("sequelize");

const Error = require('../models/Error') 

router.post("/add",(req,res)=>{
    if(req.body.Text)
        Error.create({Text:req.body.Text,Html:req.body.Html})
    res.redirect("/")
})



module.exports = router