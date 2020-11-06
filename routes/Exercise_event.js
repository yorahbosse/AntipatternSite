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

router.get('/', async (req, res) => {
    // Exercise_event.findAll().then((event_exercises)  => {
    //     res.render('Exercise_event/index', {event_exercises: event_exercises})
    // })

    let exercises = await Exercise_event.findAll()

    let needs = []

    for(let i of exercises){
        let UserID = await User_Exercise_Event.findOne({where: {ExerciseEventID: i.ID}})

        let input = await Input.findAll({where: {ExerciseEventID: i.ID}})

        let keyword_ids = await ExerciseE_Keyword.findAll({where: {ExerciseEventID: i.ID}})

        let CodeIDS = await ExerciseE_Code.findAll({where: {ExerciseEventID: i.ID}})

        let codes = []

        for(let k of CodeIDS){
            codes.push({
                Content: await Code.findByPk(k.CodeID)
            })
        }

        let examples = []

        for(let j of input){
            examples.push({
                Output: await Output.findAll({where: {ExerciseEventID: i.ID, Number: j.Number}}),
                Input: j
            })
        }

        let keywords = []

        for(let l of keyword_ids){
            keywords.push({
                Content: await Key_word.findByPk(i.KeyWordID)
            })
        }

        needs.push({
            Codes: codes,
            Examples: examples,
            Contents: keywords
        })
        
    }

    console.log(needs)

    console.log(needs[0].Codes)

    res.render('Exercise_event/index', {exercises: exercises, needs: needs})
    
})

module.exports = router