const Sequelize = require('sequelize')
const db = global.sequelize

const User_Exercise_Antipattern = db.define('User_Exercise_Antipattern', {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
}, {})

module.exports = User_Exercise_Antipattern