const Sequelize = require('sequelize')
const db = global.sequelize

const Event_IssueCode = db.define('Event_IssueCode', {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    When : {
        type: Sequelize.TEXT
    },
    Observation : {
        type: Sequelize.TEXT
    },
    IMG : {
        type: Sequelize.TEXT
    }
})

module.exports = Event_IssueCode
