const Sequelize = require('sequelize')
const db = global.sequelize

const Event = db.define('Event', {
    ID:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Observation:{
        type: Sequelize.STRING,
        allowNull: false
    },
    ExerciseE_ID:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    Corrected:{
        type: Sequelize.INTEGER
    }
})

module.exports = Event
