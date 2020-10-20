const Sequelize = require('sequelize')
const db = global.sequelize

const Input = db.define('Input', {
    Id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Number : {
        type: Sequelize.INTEGER,
        allowNull : false
    },
    InputInside : {
        type: Sequelize.TEXT
    }
})

module.exports = Input
