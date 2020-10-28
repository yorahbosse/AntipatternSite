const Sequelize = require('sequelize')
const db = global.sequelize

const User = db.define('User', {
    ID:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    FirstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    LastName: {
      type: Sequelize.STRING,
      allowNull: false     
    },
    Email:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate:{
            isEmail: true
        }
    },
    Password:{
        type: Sequelize.STRING,
        allowNull: false
    },
    InstitutionName: {
        type: Sequelize.STRING,
        allowNull: false     
    },
    Backlog:{
        type: Sequelize.JSON
    },
    Semester:{
        type: Sequelize.INTEGER
    },
    Year:{ 
        type: Sequelize.INTEGER
    }
      
})

module.exports = User
