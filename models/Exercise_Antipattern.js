const Sequelize = require('sequelize')
const db = global.sequelize

const Exercise_Antipattern = db.define('Exercise_Antipattern', {
    ExerciseA_ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Description: {
        type: Sequelize.TEXT,
        allowNull: false
    }
}, {})

module.exports = Exercise_Antipattern