const Sequelize = require('sequelize')
//Db Conexão
const db_name = 'Antipadrao'
const user    = 'postgres'
const passw   = 'admin'
const ip      = '177.23.195.33' 
global.sequelize = new Sequelize(db_name,user, passw, {
    host: ip,
    dialect: 'postgres',
    define: {
        freezeTableName: true
    }
});
//conectando

const User_contentrelationed = require('../models/User_contentrelationed')
const ExerciseE_Code = require('../models/ExerciseE_Code')
const Error_type = require('../models/Error_type')
const User_Class = require('../models/User_Class')
const Exercise_event = require('../models/Exercise_event')
const Antipattern_code = require('../models/Antipattern_code')
const Event_IssueCode = require('../models/Event_IssueCode')
const Input = require('../models/Input')
const ExerciseA_Keyword = require('../models/ExerciseA_Keyword')
const Key_word = require('../models/Key_word')

global.sequelize.authenticate().then(()=>{
    User_contentrelationed.sync()
    ExerciseE_Code.sync()
    Error_type.sync()
    User_Class.sync()
    Exercise_event.sync()
    Antipattern_code.sync()
    Event_IssueCode.sync()
    Input.sync()
    ExerciseA_Keyword.sync()
    Key_word.sync()
})