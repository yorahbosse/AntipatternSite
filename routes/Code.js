const express = require('express')
const router = express.Router() //criar rotas em arquivos separados
const db = global.sequelize

const Code = require('../models/Code')
const Language = require('../models/Language')

//views
// router.get('/view',async (req,res)=>{
//     let codes = await Code.findAll()
//     Codes_j = []
//     console.log(codes)
//     for(let i in codes){
//         let language = await Language.findByPk(codes[i].LanguageID)
//         Codes_j.push({code:codes[i],language:language.Name})
//     }
//     res.render('Code/view',{codes:Codes_j})
// })

// router.get('/view/:id',async (req,res)=>{
//     let code = await Code.findByPk(req.params.id)
//     let language = await Language.findByPk(code.LanguageID)
//     Codes_j = [{code:code,language:language.Name}]
//     res.render('Code/view',{codes:Codes_j})
// })

router.post('/view',async (req,res)=>{
    let code = await Code.findByPk(req.body.id)
    let language = await Language.findByPk(code.LanguageID)
    Codes_j = [{code:code,language:language.Name}]
    res.render('Code/view',{codes:Codes_j})
})

// cad----------------------------------------------------------
router.get('/add',async (req,res)=>{
    let Languages = await Language.findAll()
    let options = []
    for(let i in Languages) {
        options.push({OpName:Languages[i].Name})
    }
    res.render('Code/add',{languages:options,mode:''})
})

router.post('/add',async (req,res)=>{
    let novo;
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
    // res.redirect(`/Code/view/${novo.ID}`)
})





module.exports = router