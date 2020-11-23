const express = require('express')
const router = express.Router() //criar rotas em arquivos separados
const db = global.sequelize
const { Op } = require("sequelize");


const Event = require('../models/Event')
const EventIssueCode = require('../models/Event_IssueCode')
const EventSolutionCode = require('../models/Event_SolutionCode')
const Code = require('../models/Code')
const Language = require('../models/Language')
const User = require('../models/User');
const Exercise_Event = require('../models/Exercise_event');

router.get("/add",async (req,res)=>{
    let Languages = await Language.findAll()
    let options = []
    
    for(let i in Languages) {
        options.push({OpName:Languages[i].Name})
    }

    res.render("Event/add",{languages:options})
})

router.post("/add",async (req,res)=>{

    console.log(req.body)

    // let data = req.body
    // var langId = {}
    // var new_codes = []
    // for(let x of data.Codes) {
        
    //     //otimazação computação adaptativa :> 
    //     if(langId[x.linguagem]==undefined) {
    //         let temp = await Language.findOne({where:{Name:x.linguagem}})
    //         langId[x.linguagem] = temp.ID
    //     }
        
    //     //Criando e guardando em um vetor as novas instancias
    //     new_codes.push(await Code.create({
    //         LanguageID: langId[x.linguagem],
    //         Code:x.CodeTxt
    //     }))
        
    // }

    // let new_event = await Event.create({
    //     UserID: data.UserID,
    //     ExerciseEventID:data.IDExercise,
    //     Observation:data.observationEvent,
    // })

    // // Code_P_S = Codigo de problema e solução
    // //         .S = Solução
    // //         .P = Problema
    // let sol_code = null
    // let i_code = null 
    // if(data.Code_P_S.S!==''){
        
    //     let lang = await Language.findOne({where:{Name:data.Code_P_S.Language}})

    //     let S_code = await Code.create({
    //         Code:data.Code_P_S.S,
    //         LanguageID : lang.ID
    //     })

    //     sol_code = await EventSolutionCode.create({
    //         EventID : new_event.ID,
    //         CodeID: S_code.ID,
    //         Observation: ""
    //     })
    // }

    // if(data.Code_P_S.P!==''){
    //     let lang = await Language.findOne({where:{Name:data.Code_P_S.Language}})

    //     let P_code = await Code.create({
    //         Code:data.Code_P_S.P,
    //         LanguageID : lang.ID
    //     })

    //     i_code = await EventIssueCode.create({
    //         EventID : new_event.ID,
    //         CodeID: P_code.ID,
    //         When: data.CodeErrWhen,
    //         Observation: data.observationErrorCode
    //     })
    // }
})

router.get("/edit/:id",async (req,res)=>{

    let event = await Event.findByPk(req.params.id)
    if(event==null){
        res.render("404",{err_msg:"Id não encontrada"})
        return
    }
    
    let problem_code = await EventIssueCode.findOne({where:{
        EventID:event.ID
    }})

    let solution_code = await EventSolutionCode.findOne({where:{
        EventID:event.ID
    }})
    
    let P_code = await Code.findByPk(problem_code.CodeID)
    let S_code = await Code.findByPk(solution_code.CodeID)
    
    let BasicLanguage = await Language.findOne({
        where:{LanguageID:P_code.LanguageID}
    })
    
    let BasicLangName = BasicLanguage.Name
    res.render("Event/edit",{
        event,
        problem_code,
        solution_code,
        P_code,
        S_code,
        BasicLangName,

    })
})

//View
router.post('/view',async (req,res)=>{
    if(!req.body.ID) {
        res.render("404",{err_msg:"Id não encontrada"})
        return;
    }
    
    let _event = await Event.findByPk(req.body.ID,{include:[{model:Exercise_Event},{model:User,attributes : ["FirstName","LastName","Email","Backlog"]},{model:EventSolutionCode,include:[{model:Code,include:Language}]},{model:EventIssueCode,include:[{model:Code,include:Language}]}]})

    if(!_event) {
        res.render("404",{err_msg:"Id não encontrada"})
        return
    }

    if(req.body.json)
        res.json(_event)
    else
        res.render('Event/view',{Event:_event})
    //res.json(_event)
    //console.log(_event)
})

router.post('/api/find',require("../api/Event_rest").find_Events)
module.exports = router