const Sequelize = require('sequelize')
const db = global.sequelize

const Error_Type = db.define('Error_Type', {
    ID : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Name : {
        type: Sequelize.STRING,
        allowNull : false
    },
})

module.exports = Error_Type
