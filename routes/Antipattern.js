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
            so_lang = await Language.findByPk(so.LanguageID)
        }
        if(isu!==null){
            isu_code = await Code.findByPk(isu.CodeID)
            isu_lang = await Language.findByPk(isu_code.LanguageID)
        }

        Events.push({
            event : await Event.findByPk(i.EventID),
            issue_code: {
                Data : isu,
                Code : isu_code,
                Language : isu_lang
            },
            solution_code:{
                Data : so,
                Code : so_code,
                Language : so_lang
            }
        })
    }
    // console.log(Events)
    res.render('Antipattern/viewAntipattern',{antipattern:antipattern,eventos:Events})
})


module.exports = router
