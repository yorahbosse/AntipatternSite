const Sequelize = require('sequelize')
const db = global.sequelize

const Event_SolutionCode = db.define('Event_SolutionCode', {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Observation: {
        type: Sequelize.TEXT,
    }
})

module.exports = Event_SolutionCode