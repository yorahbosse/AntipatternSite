const Sequelize = require('sequelize')
const db = global.sequelize

const Event_IssueCode = db.define('Event_IssueCode', {
    Code : {
        type: Sequelize.TEXT
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
