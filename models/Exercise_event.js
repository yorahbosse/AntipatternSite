const Sequelize = require('sequelize')
const db = global.sequelize

const Exercise_event = db.define('Exercise_event', {
    Id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Title : {
        type: Sequelize.STRING,
        allowNull : false
    },
    Description : {
        type: Sequelize.STRING,
        allowNull : false
    },
    Subtitle : {
        type: Sequelize.STRING,
        allowNull : false
    }
})

module.exports = Exercise_event
