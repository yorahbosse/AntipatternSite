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

// User -> Key_word N:M
    User.belongsToMany(Key_word,{through:User_contentrelationed})
// Key_word -> User N:M
    Key_word.belongsToMany(User,{through:User_contentrelationed})

// Exercise_event -> Code N:M
    Exercise_event.belongsToMany(Code,{through:ExerciseE_Code})
// Code -> Exercise_event N:M
    Code.belongsToMany(Exercise_event,{through:ExerciseE_Code})

// User -> Class N:M
    User.belongsToMany(Class,{through:User_Class})

// Class ->  User N:M
    Class.belongsToMany(User,{through:User_Class})

// User -> Exercise_event 1:M
    User.belongsToMany(Exercise_event,{through:User_Exercise_Event})
    Exercise_event.belongsToMany(User,{through:User_Exercise_Event})


    User.hasMany(Exercise_Antipattern)
    Exercise_Antipattern.belongsTo(User)

// Antipattern -> Code
    Antipattern.belongsToMany(Code,{through:Antipattern_code})
// Code -> Antipattern
    Code.belongsToMany(Antipattern,{through:Antipattern_code})

// Event_IssueCode -> Event 1:1
    Event.hasOne(Event_IssueCode)
    Event_IssueCode.belongsTo(Event)

    Event_IssueCode.belongsTo(Code)
    Code.hasOne(Event_IssueCode)
    
//User -> Exercise_event
    User.hasMany(Exercise_event)
    Exercise_event.belongsTo(User)

//Input -> Exercise_event 1:N -- BUGUEI
    Exercise_event.hasMany(Input)
    Input.belongsTo(Exercise_event)

// ExerciseA_Keyword -> Key_word
    Exercise_Antipattern.belongsToMany(Key_word,{through:ExerciseA_Keyword})
// Key_word -> ExerciseA_Keyword
    Key_word.belongsToMany(Exercise_Antipattern,{through:ExerciseA_Keyword})

//Antipattern_Language
Antipattern.belongsToMany(Language, {through:Antipattern_Language})
Language.belongsToMany(Antipattern, {through:Antipattern_Language})

//Event
User.hasMany(Event)
Event.belongsTo(User)

Exercise_event.hasMany(Event)
Event.belongsTo(Exercise_event)

//Antipattern_error
Antipattern.belongsToMany(Error_type, {through:Antipattern_Error})
Error_type.belongsToMany(Antipattern, {through:Antipattern_Error})

//ExerciseAnt_Choice
Exercise_Antipattern.hasMany(ExerciseAnt_Choice)
ExerciseAnt_Choice.belongsTo(Exercise_Antipattern)

//Antipattern_Event
Antipattern.belongsToMany(Event,{through:Antipattern_Event})
Event.belongsToMany(Antipattern, {through:Antipattern_Event})

//Class_exercise
Class.belongsToMany(Exercise_Antipattern, {through:Class_Exercise})
Exercise_Antipattern.belongsToMany(Class, {through:Class_Exercise})


//ExerciseE_Keyword
Exercise_event.belongsToMany(Key_word, {through:ExerciseE_Keyword})
Key_word.belongsToMany(Exercise_event,{through:ExerciseE_Keyword})

//User

//Permission
User.hasOne(Permission)
Permission.belongsTo(User)

//Output
Exercise_event.hasMany(Output)
Output.belongsTo(Exercise_event)
//Class
User.hasMany(Class,{foreignKey:"U_Teacher_ID"})
Class.belongsTo(User, {foreignKey:"U_Teacher_ID"})
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
Event.hasOne(Event_SolutionCode)
Event_SolutionCode.belongsTo(Event)


Code.hasOne(Event_SolutionCode)
Event_SolutionCode.belongsTo(Code)

//Antipattern
User.hasMany(Antipattern)
Antipattern.belongsTo(User)

global.sequelize.authenticate().then(()=>{
    /*//marcos
    User_contentrelationed.sync(true)
    ExerciseE_Code.sync(true)
    Error_type.sync(true)
    User_Class.sync(true)
    Exercise_event.sync(true)
    Antipattern_code.sync(true)
    Event_IssueCode.sync(true)
    Input.sync(true)
    ExerciseA_Keyword.sync(true)
    Key_word.sync(true)
    //diego
    Antipattern_Error.sync(true)
    Antipattern_Event.sync(true)
    Antipattern_Language.sync(true)
    Antipattern_Relationed.sync(true)
    Class_Exercise.sync(true)
    Event.sync(true)
    ExerciseAnt_Choice.sync(true)
    ExerciseE_Keyword.sync(true)
    Permission.sync(true)
    User.sync(true)
    //henri
    Antipattern.sync(true)
    Class.sync(true)
    Code.sync(true)
    Error.sync(true)
    Event_SolutionCode.sync(true)
    Exercise_Antipattern.sync(true)
    Key_Antipattern.sync(true)
    Language.sync(true)
    Output.sync(true)
    User_Exercise_Antipattern.sync(true)
    User_Exercise_Event.sync(true)
    */testar();
})

async function testar() {
    /*
    const usuario=await User.create({
        FirstName : "adaildo",
        LastName : "a",
        Email : "a@gmail.com",
        Password : "159",
        InstitutionName : "DAnonimo" 
    })
    

    await Antipattern.create({
        Sugestion_Teacher : "Nada não",
        Sugestion_Std : "se vira fi",
        isAntipattern : true,
        Problem : "não sei em",
        UserID : usuario.ID
    })

    await Language.create({
        Name: 'Python'
    }) */

    /*
    var usr = await User.findOne({where: {FirstName: 'adaildo'}})

    await Exercise_event.create({
        Tittle: 'Exercicio1',
        Description: 'marcos_maozinha',
        Subtittle: 'ericPato',
        UserID: usr.ID
    })

    await Event.create({
        Observation:"aaaaaa",
        ExerciseEventID : 1,
        Corrected : 1,
        UserID: usr.ID
    })
    */

    await Key_word.create({
        Name: 'laço'
    })


    
}

