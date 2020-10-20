const Sequelize = require('sequelize')
const db = global.sequelize

const ExerciseA_Keyword = db.define('ExerciseA_Keyword', {
    Id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
})

module.exports = ExerciseA_Keyword