const Sequelize = require('sequelize')
const db = global.sequelize

const ExerciseE_code = db.define('ExerciseE_code', {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    /*ExerciseE_ID: {
        type: Sequelize.INTEGER,
        allowNull : false
    },
    Code_ID: {
        type: Sequelize.INTEGER,
        allowNull: false
    }*/
})

module.exports = ExerciseE_code
