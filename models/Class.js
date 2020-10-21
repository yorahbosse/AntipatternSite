const Sequelize = require('sequelize')
const db = global.sequelize

const Class = db.define('Class', {
   ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
   },
   Name: {
       type: Sequelize.STRING,
       allowNull: false
   },
   Class_code: {
       type: Sequelize.STRING,
       allowNull: false
   }
}, {})

module.exports = Class