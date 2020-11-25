const rota = require('express').Router()
const passport = require('passport')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const {No_Logged} = require('../config/Middlewares')

function PreAllocVars() {
    let SessionVars = {
        "CadCodes" : [],
        "CadEvents" : [],
    }
    return SessionVars
}

//Renderiza a pagina de Login checando com a função (No_Logged) caso esteja logado vai ser redirecionado para a /
//View Rota Get
rota.get('/login',No_Logged,async (req,res)=>{
    res.render("user/login")
})

//View Rota Get
//Renderiza a pagina de Registro checando com a função (No_Logged) caso esteja logado vai ser redirecionado para a /
rota.get('/register',No_Logged,async (req,res)=>{
    res.render("user/register")
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

rota.post('/login',async (req,res,next)=>{
    passport.authenticate("local",{
        successRedirect:'/',
        failureRedirect:'/user/login',
        failureFlash: true
    })(req,res,next)
    

    //Apartir daqui criaremos um json para cada usuario que fazer um requisição.
    //caso não tenha sido criada as variaveis para a sessão atual, as crie.
    if(global.UserTemp[req.sessionID] == undefined) {
        global.UserTemp[req.sessionID] = PreAllocVars()
    }
})

rota.get('/logout',(req,res)=>{

    //caso o usuario se deslogue colocamos undefined nas suas variaveis de sessão
    global.UserTemp[req.sessionID] = undefined
    req.logout()
    res.redirect('/')
})
module.exports = rota