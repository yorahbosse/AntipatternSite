const Sequelize = require('sequelize')

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

const Antipattern = require('../models/Antipattern')
const Class = require('../models/Class')
const Code = require('../models/Code')
const Error = require('../models/Error')
const Event_SolutionCode = require('../models/Event_SolutionCode')
const Exercise_Antipattern = require('../models/Exercise_Antipattern')
const Key_Antipattern = require('../models/Key_Antipattern')
const Language = require('../models/Language')
const Output = require('../models/Output')
const User_Exercise_Antipattern = require('../models/User_Exercise_Antipattern')
const User_Exercise_Event = require('../models/User_Exercise_Event')
const { Events } = require('pg')

//Output
Exercise_event.hasMany(Output)
Output.belongsTo(Exercise_event)
//Class
User.hasMany(Class)
Class.belongsTo(User)
//Exercise_Antipattern
Language.hasMany(Exercise_Antipattern)
Exercise_Antipattern.belongsTo(Language)
//Key_Antipattern
Antipattern.belongsToMany(Key_word, { through: Key_Antipattern })
Key_word.belongsToMany(Antipattern, { through: Key_Antipattern })
//Code
Language.hasMany(Code)
Code.belongsTo(Language)
//User_Exercise_Event
User.belongsToMany(Exercise_event, { through: User_Exercise_Event })
Exercise_event.belongsToMany(User, { through: User_Exercise_Event })
//User_Exercise_Antipattern
User.belongsToMany(Exercise_Antipattern, { through: User_Exercise_Antipattern })
Exercise_Antipattern.belongsToMany(User, { through: User_Exercise_Antipattern })
//Event_Solution_Code
Event_SolutionCode.belongsTo(Event)
Event.hasOne(Event_SolutionCode)
//Antipattern
User.hasMany(Antipattern)
Antipattern.belongsTo(User)



