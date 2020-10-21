const Sequelize = require('sequelize')
const db = global.sequelize

const Language = db.define('Language', {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Name: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {})

module.exports = Language