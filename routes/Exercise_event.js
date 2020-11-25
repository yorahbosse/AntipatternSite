const express = require('express')
const router = express.Router()
const db = global.sequelize
const {checkLogin} = require('../config/Middlewares')//sistema de login

const Exercise_event = require('../models/Exercise_event')
const Event = require('../models/Event')
const User_Exercise_Event = require('../models/User_Exercise_Event')
const Input = require('../models/Input')
const Output = require('../models/Output')
const ExerciseE_Code = require('../models/ExerciseE_Code')
const Code = require('../models/Code')
const ExerciseE_Keyword = require('../models/ExerciseE_Keyword')
const Key_word = require('../models/Key_word')
const Language = require('../models/Language')
const User = require('../models/User')

router.get('/', async (req, res) => {
    let exercises = await Exercise_event.findAll().then(exercises => {
        res.render('Exercise_event/index', {exercises: exercises})
    })
})

router.post('/view', async (req, res) => {
    // Exercise_event.findAll().then((event_exercises)  => {
    //     res.render('Exercise_event/index', {event_exercises: event_exercises})
    // })

    let exercise = await Exercise_event.findByPk(req.body.ID)

    let userid = await User_Exercise_Event.findOne({where: {ExerciseEventID: exercise.ID}})

    let user = await User.findByPk(userid.UserID)

    let input = await Input.findAll({where: {ExerciseEventID: exercise.ID}})

    let keyword_ids = await ExerciseE_Keyword.findAll({where: {ExerciseEventID: exercise.ID}})

    let CodeIDS = await ExerciseE_Code.findAll({where: {ExerciseEventID: exercise.ID}})

    let needs = {
        UserName: user.FirstName + ' ' + user.LastName,
        Codes: [],
        Examples: [],
        Contents: []
    }

    for(let k of CodeIDS){
        let program = await Code.findByPk(k.CodeID)
        needs.Codes.push({
            Program: program,
            Language: await Language.findByPk(program.LanguageID)
        })
    }

    for(let j of input){
        needs.Examples.push({
            Output: await Output.findOne({where: {ExerciseEventID: exercise.ID, Number: j.Number}}),
            Input: j
        })
    }

    for(let l of keyword_ids){
        needs.Contents.push(await Key_word.findByPk(l.KeyWordID))
    }

    console.log(needs)
    console.log(needs.Codes[0].Language.Name)
    console.log(needs.Codes[0].Program.IMG)
    console.log(needs.Contents[1].Name)
    console.log(needs.Examples[0].Output.InputInside)

    res.render('Exercise_event/view', {exercise: exercise, needs: needs})
    
})

// Rota de cadastro de exercicios de eventos
router.get('/cad', checkLogin, async (req,res)=>{
    let keywords = await Key_word.findAll()
    
    let Languages = await Language.findAll()
    let options = []
    for(let i in Languages) {
        options.push({OpName:Languages[i].Name})
    }

    // pegando os codigos inseridos na sessão atual pelo usuario
    var Codes = []
    if (global.UserTemp[req.sessionID]) {
        if (global.UserTemp[req.sessionID]["CadCodes"] != undefined) {
            for (let i of global.UserTemp[req.sessionID]["CadCodes"]) {
                let program = await Code.findByPk(i)
                
                Codes.push({
                    Program: program,
                    Language: await Language.findByPk(program.LanguageID)
                })
            }
        }
    }

    var examples = []
    // pegando os exemplos de entrada e saida inseridos na sessão atual pelo usuario
    if (global.UserTemp[req.sessionID]) {
        if (global.UserTemp[req.sessionID]["CadInOutExamp"] != undefined) {
            for (let i of global.UserTemp[req.sessionID]["CadInOutExamp"]) {
                let inputObj = await Input.findByPk(i.InputID)
                let outputObj = await Output.findByPk(i.OutputID)

                examples.push({
                    Input: inputObj,
                    Output: outputObj
                })
            }
        }
    }

    res.render('Exercise_event/cad', {keywords: keywords, languages:options, Codes:Codes, examples: examples})
})

router.post('/addinoutExamples', async (req, res) => {
    let exercise_event_temp = await Exercise_event.create({
        Tittle: "titulo temporario",
        Description: "descricao temporaria",
        Subtittle: "subtitulo temporario"
    })

    let input_temp = await Input.create({
        Number: req.body.numero,
        InputInside: req.body.entrada,
        ExerciseEventID: exercise_event_temp.ID
    })
    
    let output_temp = await Output.create({
        Number: req.body.numero,
        InputInside: req.body.saida,
        ExerciseEventID: exercise_event_temp.ID
    })
    
    if(global.UserTemp[req.sessionID]!=undefined)
        global.UserTemp[req.sessionID]["CadInOutExamp"].push({
            InputID: input_temp.ID,
            OutputID: output_temp.ID
        })
        
    if(req.body.paginaPai!=undefined)
        res.redirect(req.body.paginaPai)
})

module.exports = router