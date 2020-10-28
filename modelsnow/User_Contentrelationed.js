const Sequelize = require('sequelize')
const db = global.sequelize

const User_Contentrelationed = db.define('User_Contentrelationed', {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
})

module.exports = User_Contentrelationed
