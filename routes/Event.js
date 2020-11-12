const express = require('express')
const router = express.Router() //criar rotas em arquivos separados
const db = global.sequelize

const Antipattern = require('../models/Antipattern')
const A_Event = require('../models/Antipattern_Event')
const Event = require('../models/Event')
const EventIssueCode = require('../models/Event_IssueCode')
const EventSolutionCode = require('../models/Event_SolutionCode')
const Code = require('../models/Code')
const Language = require('../models/Language')
const Antipattern_Event = require('../models/Antipattern_Event')

router.get("/add",async (req,res)=>{
    let Languages = await Language.findAll()
    let options = []
    
    for(let i in Languages) {
        options.push({OpName:Languages[i].Name})
    }

    res.render("Event/add",{languages:options})
})

router.post("/add",async (req,res)=>{

    let data = req.body
    var langId = {}
    var new_codes = []
    
    for(let x of data.Codes) {
        
        //otimazação computação adaptativa :> 
        if(langId[x.linguagem]==undefined) {
            let temp = await Language.findOne({where:{Name:x.linguagem}})
            langId[x.linguagem] = temp.ID
        }
        
        //Criando e guardando em um vetor as novas instancias
        new_codes.push(await Code.create({
            LanguageID: langId[x.linguagem],
            Code:x.CodeTxt
        }))
        
    }

    let new_event = await Event.create({
        UserID: data.UserID,
        ExerciseEventID:data.IDExercise,
        Observation:data.observationEvent,
    })

    // Code_P_S = Codigo de problema e solução
    //         .S = Solução
    //         .P = Problema
    let sol_code = null
    let i_code = null 
    if(data.Code_P_S.S!==''){
        
        let lang = await Language.findOne({where:{Name:data.Code_P_S.Language}})

        let S_code = await Code.create({
            Code:data.Code_P_S.S,
            LanguageID : lang.ID
        })

        sol_code = await EventSolutionCode.create({
            EventID : new_event.ID,
            CodeID: S_code.ID,
            Observation: ""
        })
    }

    if(data.Code_P_S.P!==''){
        let lang = await Language.findOne({where:{Name:data.Code_P_S.Language}})

        let P_code = await Code.create({
            Code:data.Code_P_S.P,
            LanguageID : lang.ID
        })

        i_code = await EventIssueCode.create({
            EventID : new_event.ID,
            CodeID: P_code.ID,
            When: data.CodeErrWhen,
            Observation: data.observationErrorCode
        })
    }
})

module.exports = router