const Sequelize = require('sequelize')
const db = global.sequelize

const Antipattern_Event = db.define('Antipattern_Event', {
    ID:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
 
})

module.exports = Antipattern_Event