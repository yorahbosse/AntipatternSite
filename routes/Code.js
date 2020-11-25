const express = require('express')
const router = express.Router() //criar rotas em arquivos separados
const db = global.sequelize


const Code = require('../models/Code')
const Language = require('../models/Language')


const path = require('path')
const multer = require('multer')
const User = require('../models/User')

//Configurando mutler
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/uploads")
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+'_'+file.fieldname+'_'+file.originalname)
    }
  })
var upload = multer({ storage: storage })




// tela de view
router.post('/view',async (req,res,next)=>{
    let code = await Code.findByPk(req.body.id)
    let language = await Language.findByPk(code.LanguageID)
    Codes_j = [{code:code,language:language.Name}]
    res.render('Code/view',{codes:Codes_j})
})





// Tela de Cadastro
router.get('/add',async (req,res)=>{
    console.log(global.UserTemp[req.sessionID])
    let Languages = await Language.findAll()
    let options = []
    for(let i in Languages) {
        options.push({OpName:Languages[i].Name})
    }
    res.render('Code/add',{languages:options,mode:''})
})



// Adicionar Code sem arquivo
router.post('/add',async (req,res)=>{
    let novo;
    if(!req.body.code || req.body.code=="") {
        req.flash("err_msg","Campo de Código vazio!")
        if(req.body.paginaPai!=undefined)
            res.redirect(req.body.paginaPai)
    }
    
    let Lg = await Language.findOne(({where:{Name:req.body.language}}))
    if(req.body.id!==undefined){
        novo = await Code.findByPk(req.body.objectId)
        novo.update({
            Code : req.body.code,
            LanguageID : Lg.ID
        })
    }else {
        novo = await Code.create({LanguageID:Lg.ID,Code:req.body.code})
    }

    

    //Adicionando na lista da sessão para reutilizar
    global.UserTemp[req.sessionID]["CadCodes"].push(novo.ID)
    req.flash("sucess_msg","Código cadastrado com sucesso!")
    //Retorna para a Pagina pai caso ela exista
    if(req.body.paginaPai!=undefined)
        res.redirect(req.body.paginaPai)
})

module.exports = router