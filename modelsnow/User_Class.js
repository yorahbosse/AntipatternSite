const Sequelize = require('sequelize')
const db = global.sequelize

const User_Class = db.define('User_Class', {
    ID : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
})

module.exports = User_Class
