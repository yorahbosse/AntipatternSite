const Sequelize = require('sequelize')
const db = global.sequelize

const Language = db.define('Language', {
    Language_ID: {
        type: Sequelize.INTEGER,
        primarykey: true,
        autoIncrement: true
    },
    Name: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {})

module.exports = Language