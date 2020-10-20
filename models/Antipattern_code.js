const Sequelize = require('sequelize')
const db = global.sequelize

const Antipattern_code = db.define('Antipattern_code', {
    Id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
})

module.exports = Antipattern_code
