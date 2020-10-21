const Sequelize = require('sequelize')
const db = global.sequelize

const Error_type = db.define('Error_type', {
    ID : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Name : {
        type: Sequelize.INTEGER,
        allowNull : false
    },
})

module.exports = Error_type
