const rota = require('express').Router()
const passport = require('passport')
const User = require('../models/User')
const bcrypt = require('bcryptjs')

rota.get('/login',async (req,res)=>{
    res.render("user/login")
})

rota.get('/register',async (req,res)=>{
    res.render("user/register")
})

rota.post('/login',async (req,res,next)=>{
    passport.authenticate("local",{
        successRedirect:'/',
        failureRedirect:'/user/login',
    })(req,res,next)
})

rota.post('/register',async (req,res)=>{
    var erros = []
    if(req.body.FirstName==undefined ||  req.body.LastName==undefined || req.body.InstitutionName==undefined || req.body.Email==undefined || req.body.password==undefined) {
        return
    }
    
    let sault = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(req.body.password,sault)

    let user = await User.create({
        FirstName:req.body.FirstName,
        LastName: req.body.LastName,
        Email:req.body.Email,
        Password: hash,
        InstitutionName: req.body.InstitutionName,
    })
    res.redirect('/user/login')
})

module.exports = rota