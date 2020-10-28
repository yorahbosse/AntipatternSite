const Sequelize = require('sequelize')
const db = global.sequelize

const Key_Word = db.define('Key_Word', {
    ID : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Name : {
        type: Sequelize.STRING
    }
})

module.exports = Key_Word
