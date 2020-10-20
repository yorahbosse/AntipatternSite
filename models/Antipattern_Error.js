const Sequelize = require('sequelize')
const db = global.sequelize

const Antipattern_Error = db.define('Antipattern_Error', {
    ID:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
   
})

module.exports = Antipattern_Error