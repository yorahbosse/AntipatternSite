const Sequelize = require('sequelize')
const db = global.sequelize

const ExerciseAnt_Choice = db.define('ExerciseAnt_Choice', {
    ID:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Description:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    Explanation:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    Corrected:{
        type: Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue: false
    }
})

module.exports = ExerciseAnt_Choice