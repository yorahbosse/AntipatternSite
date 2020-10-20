const Sequelize = require('sequelize')
const db = global.sequelize

const Class_Exercise = db.define('Class_Exercise', {
    ID:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
 
})

module.exports = Class_Exercise