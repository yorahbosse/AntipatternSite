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
    console.log(req.body.language)
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

    if(global.UserTemp[req.sessionID]!=undefined)
        if(global.UserTemp[req.sessionID]["CadCodes"]!=undefined)
            global.UserTemp[req.sessionID]["CadCodes"].push(novo.ID)
        else
            global.UserTemp[req.sessionID]["CadCodes"]=[novo.ID]
    
    //let Usuario_Atual = await User.findByPk(req.body.user)
    //Usuario_Atual.Backlog['Codes'].append(novo)
    //await Usuario_Atual.save()

    if(req.body.paginaPai!=undefined)
        res.redirect(req.body.paginaPai)
})






// Adicionar Code com arquivo
router.post('/addfile',upload.single('img'),async (req,res)=>{
    let novo;
    let Lg = await Language.findOne(({where:{Name:req.body.language}}))
    if(req.body.id!==undefined){
        novo = await Code.findByPk(req.body.objectId)
        novo.update({
            Code : req.body.code,
            LanguageID : Lg.ID
        })
    }else {
        let image_location = `/uploads/${req.file.filename}`
        novo = await Code.create({LanguageID:Lg.ID,Code:req.body.code,IMG:image_location})
    }


    global.UserTemp[req.sessionID]["CadCodes"]=[novo.ID]
    
    let Usuario_Atual = await User.findByPk(req.body.user)
    Usuario_Atual.Backlog['Codes'].append(novo)
    await Usuario_Atual.save()
    
    if(req.body.paginaPai!=undefined)
        res.redirect(req.body.paginaPai)
})


module.exports = router