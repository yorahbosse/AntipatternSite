const express = require('express')
const router = express.Router()
const db = global.sequelize

const Exercise_event = require('../models/Exercise_event')

router.get('/', async (req, res) => {
    res.render('Exercise_event/index')
})

module.exports = router