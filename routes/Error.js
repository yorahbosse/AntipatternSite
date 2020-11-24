const express = require('express')
const router = express.Router() //criar rotas em arquivos separados
const db = global.sequelize
const { Op } = require("sequelize");

const Error = require('../models/Error') 

router.post("/err",(req,res)=>{
    Error.create({Text:req.body.Text})
    res.redirect("Back")
})



module.exports = router