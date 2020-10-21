const Sequelize = require('sequelize')
const db = global.sequelize

const Key_Antipattern = db.define('Key_Antipattern', {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
}, {})

module.exports = Key_Antipattern