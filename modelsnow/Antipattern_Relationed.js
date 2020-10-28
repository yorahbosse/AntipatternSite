const Sequelize = require('sequelize')
const db = global.sequelize

const Antipattern_Relationed = db.define('Antipattern_Relationed', {
    ID:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    AntipatternA_ID: {
        type: Sequelize.INTEGER,
    },
    AntipatternB_ID: {
        type: Sequelize.INTEGER,
    },
    Text_related:{
        type: Sequelize.STRING,
        allowNull: false
    }
    
})

module.exports = Antipattern_Relationed