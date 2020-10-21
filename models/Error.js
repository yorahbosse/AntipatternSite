const Sequelize = require('sequelize')
const db = global.sequelize

const Error = db.define('Error', {
    Error_ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Text: {
        type: Sequelize.TEXT,
        allowNull: false
    }
}, {})

module.exports = Error