const Event = require('../models/Event')
const User = require('../models/User')
const Exercise_Event = require('../models/Exercise_event')
const Eventissue = require('../models/Event_IssueCode')
const Eventsol = require('../models/Event_SolutionCode')
const { Op } = require("sequelize")

async function find_Events(req,res) {
    let filtros = {}
    console.log(req.body)

    if(req.body.ID) {
        filtros["ID"] = req.body.ID
    }

    if(req.body.Observation) {
        filtros["Observation"] = {[Op.like]:`%${req.body.Observation}%`}
    }

    if(req.body.UserID) {
        filtros["UserID"] = req.body.UserID
    }

    if(req.body.ExerciseEventID) {
        filtros["ExerciseEventID"] = req.body.ExerciseEventID
    }

    console.log(filtros)
    let result = await Event.findAll({where: filtros,include:[
        {
            model: User,attributes : ["FirstName","LastName","Email","Backlog"]
        },
        {
            model:Exercise_Event,
        },
        {
            model:Eventissue
        },
        {
            model:Eventsol
        }
        ]
    })
    res.json(result)
    return
}

module.exports = {
    find_Events
}