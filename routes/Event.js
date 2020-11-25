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

// Não foi terminado.
// router.get("/edit/:id",async (req,res)=>{

//     let event = await Event.findByPk(req.params.id)
//     if(event==null){
//         res.render("404",{err_msg:"Id não encontrada"})
//         return
//     }
    
//     let problem_code = await EventIssueCode.findOne({where:{
//         EventID:event.ID
//     }})

//     let solution_code = await EventSolutionCode.findOne({where:{
//         EventID:event.ID
//     }})
    
//     let P_code = await Code.findByPk(problem_code.CodeID)
//     let S_code = await Code.findByPk(solution_code.CodeID)
    
//     let BasicLanguage = await Language.findOne({
//         where:{LanguageID:P_code.LanguageID}
//     })
    
//     let BasicLangName = BasicLanguage.Name
//     res.render("Event/edit",{
//         event,
//         problem_code,
//         solution_code,
//         P_code,
//         S_code,
//         BasicLangName,

//     })
// })



//View usando Post
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