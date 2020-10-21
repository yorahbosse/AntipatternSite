//Associations

const Antipattern = require("../models/Antipattern")
const Antipattern_Error = require("../models/Antipattern_Error")
const Antipattern_Event = require("../models/Antipattern_Event")
const Antipattern_Relationed = require("../models/Antipattern_Relationed")
const Class = require("../models/Class")
const Class_Exercise = require("../models/Class_Exercise")
const ExerciseAnt_Choice = require("../models/ExerciseAnt_Choice")
const ExerciseE_Keyword = require("../models/ExerciseE_Keyword")
const Exercise_Antipattern = require("../models/Exercise_Antipattern")
const Exercise_event = require("../models/Exercise_event")
const Key_word = require("../models/Key_word")
const Permission = require("../models/Permission")
const User = require("../models/User")



    //Antipattern_Language
    Antipattern.belongsToMany(Language, {through:Antipattern_Language})
    Language.belongsToMany(Antipattern, {through:Antipattern_Language})

    //Event
    User.hasMany(Event)
    Event.belongsTo(User)

    //Antipattern_error
    Antipattern.belongsToMany(Error_Type, {through:Antipattern_Error})
    Error_Type.belongsToMany(Antipattern, {through:Antipattern_Error})

    //ExerciseAnt_Choice
    Exercise_Antipattern.hasMany(ExerciseAnt_Choice)
    ExerciseAnt_Choice.belongsTo(Exercise_Antipattern)

    //Antipattern_Event
    Antipattern.belongsToMany(Event,{through:Antipattern_Event})
    Event.belongsToMany(Antipattern, {through:Antipattern_Event})

    //Class_exercise
    Class.belongsToMany(Exercise_Antipattern, {through:Class_Exercise})
    Exercise_Antipattern.belongsToMany(Class, {through:Class_Exercise})

    //Antipattern_Relationed
    Antipattern.hasMany(Antipattern_Relationed)
    Antipattern_Relationed.hasMany(Antipattern)

    //ExerciseE_Keyword
    Exercise_event.belongsToMany(Key_word, {through:ExerciseE_Keyword})
    Key_word.belongsToMany(Exercise_event,{through:ExerciseE_Keyword})

    //User
    
    //Permission
    User.hasOne(Permission)
    Permission.belongsTo(User)

