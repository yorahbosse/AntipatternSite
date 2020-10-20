const Sequelize = require('sequelize')
const db = global.sequelize

const Permission = db.define('Permission', {
    User_ID:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    P1:{ type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false},
    P2:{ type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false},
    P3:{ type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false},
    P4:{ type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false},
    P5:{ type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false},
    P6:{ type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false},
    P7:{ type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false},
    P8:{ type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false},
    P9:{ type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false},
    P10:{ type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false},
    P11:{ type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false},
    P12:{ type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false},
    P13:{ type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false}
    
})

module.exports = Permission