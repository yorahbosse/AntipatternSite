const Sequelize = require('sequelize')
const db = global.sequelize

const Exercise_event = db.define('Exercise_event', {
    ID : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Tittle : {
        type: Sequelize.STRING,
        allowNull : false
    },
    Description : {
        type: Sequelize.STRING,
        allowNull : false
    },
    Subtittle : {
        type: Sequelize.STRING,
        allowNull : false
    }
})

module.exports = Exercise_event
