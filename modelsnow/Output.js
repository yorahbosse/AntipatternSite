const Sequelize = require('sequelize')
const db = global.sequelize

const Output = db.define('Output', {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Number: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    InputInside: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {})

module.exports = Output