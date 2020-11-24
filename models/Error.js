const Sequelize = require('sequelize')
const db = global.sequelize

const Error = db.define('Error', {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Text: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    // Html: {
    //     type: Sequelize.TEXT,
    // }

}, {})

module.exports = Error