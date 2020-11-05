const express = require('express')
const Exercise_Event = require('../models/Exercise_event')
const router = express.Router()
const db = global.sequelize

const Exercise_event = require('../models/Exercise_event')
const User_Exercise_Event = require('../models/User_Exercise_Event')

router.get('/', async (req, res) => {
    Exercise_event.findAll().then((event_exercises) => {
        res.render('Exercise_event/index', {event_exercises: event_exercises})
    }).catch((error) => {
        console.log('Error in show event exercises, :'+error)
    })
})

module.exports = router