const express = require('express')
const router = express.Router() //criar rotas em arquivos separados
const db = global.sequelize


const Code = require('../models/Code')
const Language = require('../models/Language')


const path = require('path')
const multer = require('multer')

//var upload = multer({ dest: "public/uploads/"})
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/uploads")
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+'_'+file.fieldname+'_'+file.originalname)
    }
  })
   
  var upload = multer({ storage: storage })


router.post('/view',async (req,res,next)=>{
    let code = await Code.findByPk(req.body.id)
    let language = await Language.findByPk(code.LanguageID)
    Codes_j = [{code:code,language:language.Name}]
    res.render('Code/view',{codes:Codes_j})
})

// cad----------------------------------------------------------
router.get('/add',async (req,res)=>{
    console.log(global.UserTemp[req.sessionID])
    let Languages = await Language.findAll()
    let options = []
    for(let i in Languages) {
        options.push({OpName:Languages[i].Name})
    }
    res.render('Code/add',{languages:options,mode:''})
})

router.post('/add',upload.single('img'),async (req,res)=>{
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

    if(global.UserTemp[req.sessionID]!=undefined)
        if(global.UserTemp[req.sessionID]["CadCodes"]!=undefined)
            global.UserTemp[req.sessionID]["CadCodes"].push(novo.ID)
        else
            global.UserTemp[req.sessionID]["CadCodes"]=[novo.ID]
})





module.exports = router