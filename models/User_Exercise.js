const Sequelize = require('sequelize')
const db = global.sequelize

const User_Exercise = db.define('User_Exercise', {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    isAntipattern: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
}, {})

module.exports = User_Exercise