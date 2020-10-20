const Sequelize = require('sequelize')
const db = global.sequelize

const Key_word = db.define('Key_word', {
    Id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Name : {
        type: Sequelize.STRING
    }
})

module.exports = Key_word
