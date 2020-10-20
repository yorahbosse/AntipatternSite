const Sequelize = require('sequelize')
const db = global.sequelize

const Code = db.define('Code', {
    ID: {
        type: Sequelize.INTEGER,
        primarykey: true,
        autoIncrement: true
    },
    Code: {
        type: Sequelize.TEXT,
        allowNull: false
    }
}, {})

module.exports = Code