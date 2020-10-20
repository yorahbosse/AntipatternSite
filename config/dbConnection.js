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

const Antipattern_Error = require('../models/Antipattern_Error')
const Antipattern_Event = require('../models/Antipattern_Event')
const Antipattern_Language = require('../models/Antipattern_Language')
const Antipattern_Relationed = require('../models/Antipattern_Relationed')
const Class_Exercise = require('../models/Class_Exercise')
const Event = require('../models/Event')
const ExerciseAnt_Choice = require('../models/ExerciseAnt_Choice')
const ExerciseE_Keyword = require('../models/ExerciseE_Keyword')
const Permission = require('../models/Permission')
const User = require('../models/User')

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

    Antipattern_Error.sync()
    Antipattern_Event.sync()
    Antipattern_Language.sync()
    Antipattern_Relationed.sync()
    Class_Exercise.sync()
    Event.sync()
    ExerciseAnt_Choice.sync()
    ExerciseE_Keyword.sync()
    Permission.sync()
    User.sync()
})