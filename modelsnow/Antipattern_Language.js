const Sequelize = require('sequelize')
const db = global.sequelize

const Antipattern_Language = db.define('Antipattern_Language', {
    ID:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
    
})

module.exports = Antipattern_Language