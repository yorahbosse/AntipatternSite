const express = require('express')
const router = express.Router() //criar rotas em arquivos separados
const db = global.sequelize
const { Op } = require("sequelize");

const Error = require('../models/Error') 

//Asiciona um erro a lista
router.post("/add",(req,res)=>{
    if(req.body.Text) {
        Error.create({Text:req.body.Text,Html:req.body.Html})
        req.flash("sucess_msg","Erro enviado com sucesso!")
    } else {
        req.flash("error_msg","Campo de erro vazio!")
    }
    res.redirect("/")
})


router.get('/',async(req,res)=>{
    let erros = await Error.findAll()
    console.log(erros.length)
    res.render('Error/view',{err:erros})
})


module.exports = router