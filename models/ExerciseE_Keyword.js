const Sequelize = require('sequelize')
const db = global.sequelize

const ExerciseE_Keyword = db.define('ExerciseE_Keyword', {
    ID:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
 
})

module.exports = ExerciseE_Keyword