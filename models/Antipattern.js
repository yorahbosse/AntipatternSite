const Sequelize = require('sequelize')
const db = global.sequelize

const Antipattern = db.define('Antipattern', {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    RelativeID:{
        type: Sequelize.STRING,
        defaultValue:""
    },
    Title:{
        type: Sequelize.STRING,
        defaultValue:""
    },
    Sugestion_Teacher: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Sugestion_Std: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Problem: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    isAntipattern: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
}, {})

module.exports = Antipattern