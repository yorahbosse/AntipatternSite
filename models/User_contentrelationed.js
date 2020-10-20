const Sequelize = require('sequelize')
const db = global.sequelize

const User_contentrelationed = db.define('User_contentrelationed', {
    Id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    /*User_ID: {
        type: Sequelize.INTEGER,
        allowNull : false
    },
    Key_ID: {
        type: Sequelize.INTEGER,
        allowNull: false
    }*/
})

module.exports = User_contentrelationed
