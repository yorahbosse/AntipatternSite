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

router.get('/',(req,res)=>{
    Antipattern.findAll().then((antipatterns)=>{
        res.render('Antipattern/index',{antipatterns: antipatterns})
    }).catch((error)=>{
        console.log('Error in show antipattern, '+error)
    })
    
})


router.post('/view',async (req,res)=>{
    
    let antipattern = await Antipattern.findByPk(req.body.ID)
    let Events_IDS = await A_Event.findAll({where:{AntipatternID:antipattern.ID}}) 
    let Events = []
    
    for(let i of Events_IDS){
        let so = await EventSolutionCode.findOne({where:{EventID:i.EventID}})
        let isu = await EventIssueCode.findOne({where:{EventID:i.EventID}})
        
        let so_code = null
        
        let isu_code = null
        let isu_lang =  null
        let so_lang = null
        
        if(so!==null){
            so_code = await Code.findByPk(so.CodeID)
            so_lang = await Language.findByPk(so_code.LanguageID)
        }
        
        if(isu!==null){
            isu_code = await Code.findByPk(isu.CodeID)
            console.log(isu_code.LanguageID)
            isu_lang = await Language.findByPk(isu_code.LanguageID)
        }

        Events.push({
            event : await Event.findByPk(i.EventID),
            issue_code: {
                Data : isu,
                Code : isu_code,
                Language : isu_lang,
            },
            solution_code:{
                Data : so,
                Code : so_code,
                Language : so_lang
            }
        })
    }

    //não vai precisar no view vai ficar na  função de admin
    let Languages = await Language.findAll()
    let options = []
    for(let i in Languages) {
        options.push({OpName:Languages[i].Name})
    }
    console.log(Events)
    //                                                                               precisa retirar no final dos testes
    res.render('Antipattern/viewAntipattern',{antipattern:antipattern,eventos:Events,languages:options})
})

router.post('/cadEvent',async (req,res)=>{
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

    //RELACIONANDO ANTIPADRÃO E EVENT
    await Antipattern_Event.create({
        AntipatternID:data.AntipatterID,
        EventID: new_event.ID
    })

    //
    let sol_code = null
    let i_code = null 
    if(data.Code_P_S.S!==''){
        
        let lang_id = await Language.findOne({where:{Name:data.Code_P_S.Language}})

        let S_code = await Code.create({
            Code:data.Code_P_S.S,
            LanguageID : lang_id.ID
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

    res.json({OK:true})
})

module.exports = router
