const Sequelize = require('sequelize')
const db = global.sequelize

const User_Exercise_Event = db.define('User_Exercise_Event', {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
}, {})

module.exports = User_Exercise_Event