const express = require('express')
const router = express.Router()
const db = global.sequelize

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
    console.log(needs.Codes[0].Program.ID)
    console.log(needs.Contents[1].Name)
    console.log(needs.Examples[0].Output.InputInside)

    res.render('Exercise_event/view', {exercise: exercise, needs: needs})
    
})

// Rota de cadastro de exercicios de eventos
router.get('/cad',(req,res)=>{
    res.render('Exercise_event/cad')
})

module.exports = router