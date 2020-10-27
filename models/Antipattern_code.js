const Sequelize = require('sequelize')
const db = global.sequelize

const Antipattern_Code = db.define('Antipattern_Code', {
    ID : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
})

module.exports = Antipattern_Code
