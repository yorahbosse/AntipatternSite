const Sequelize = require('sequelize')
//Db Conexão
const db_name = 'Antipadrao'
const user = 'postgres'
const passw = 'admin'
const ip = '177.23.195.33'
global.sequelize = new Sequelize(db_name, user, passw, {
    host: ip,
    dialect: 'postgres',
    define: {
        freezeTableName: true
    }
});
//conectando

const User_Contentrelationed = require('../models/User_Contentrelationed')
const ExerciseE_Code = require('../models/ExerciseE_Code')
const Error_Type = require('../models/Error_Type') 
const User_Class = require('../models/User_Class')
const Exercise_Event = require('../models/Exercise_Event') 
const Antipattern_Code = require('../models/Antipattern_Code')
const Event_IssueCode = require('../models/Event_IssueCode')
const Input = require('../models/Input')
const ExerciseA_Keyword = require('../models/ExerciseA_Keyword')
const Key_Word = require('../models/Key_Word')

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



    // User -> Key_Word N:M
    User.belongsToMany(Key_Word, { through: User_Contentrelationed })
    // Key_Word -> User N:M
    Key_Word.belongsToMany(User, { through: User_Contentrelationed })

    // Exercise_Event -> Code N:M
    Exercise_Event.belongsToMany(Code, { through: ExerciseE_Code })
    // Code -> Exercise_Event N:M
    Code.belongsToMany(Exercise_Event, { through: ExerciseE_Code })

    // User -> Class N:M
    User.belongsToMany(Class, { through: User_Class })

    // Class ->  User N:M
    Class.belongsToMany(User, { through: User_Class })

    // User -> Exercise_Event 1:M
    User.belongsToMany(Exercise_Event, { through: User_Exercise_Event })
    Exercise_Event.belongsToMany(User, { through: User_Exercise_Event })


    User.hasMany(Exercise_Antipattern)
    Exercise_Antipattern.belongsTo(User)

    // Antipattern -> Code
    Antipattern.belongsToMany(Code, { through: Antipattern_Code })
    // Code -> Antipattern
    Code.belongsToMany(Antipattern, { through: Antipattern_Code })

    // Event_IssueCode -> Event 1:1
    Event.hasOne(Event_IssueCode)
    Event_IssueCode.belongsTo(Event)

    Event_IssueCode.belongsTo(Code)
    Code.hasOne(Event_IssueCode)

    //User -> Exercise_Event
    User.hasMany(Exercise_Event)
    Exercise_Event.belongsTo(User)

    //Input -> Exercise_Event 1:N -- BUGUEI
    Exercise_Event.hasMany(Input)
    Input.belongsTo(Exercise_Event)

    // ExerciseA_Keyword -> Key_Word
    Exercise_Antipattern.belongsToMany(Key_Word, { through: ExerciseA_Keyword })
    // Key_Word -> ExerciseA_Keyword
    Key_Word.belongsToMany(Exercise_Antipattern, { through: ExerciseA_Keyword })

    //Antipattern_Language
    Antipattern.belongsToMany(Language, { through: Antipattern_Language })
    Language.belongsToMany(Antipattern, { through: Antipattern_Language })

    //Event
    User.hasMany(Event)
    Event.belongsTo(User)

    Exercise_Event.hasMany(Event)
    Event.belongsTo(Exercise_Event)

    //Antipattern_error
    Antipattern.belongsToMany(Error_Type, { through: Antipattern_Error })
    Error_Type.belongsToMany(Antipattern, { through: Antipattern_Error })

    //ExerciseAnt_Choice
    Exercise_Antipattern.hasMany(ExerciseAnt_Choice)
    ExerciseAnt_Choice.belongsTo(Exercise_Antipattern)

    //Antipattern_Event
    Antipattern.belongsToMany(Event, { through: Antipattern_Event })
    Event.belongsToMany(Antipattern, { through: Antipattern_Event })

    //Class_exercise
    Class.belongsToMany(Exercise_Antipattern, { through: Class_Exercise })
    Exercise_Antipattern.belongsToMany(Class, { through: Class_Exercise })


    //ExerciseE_Keyword
    Exercise_Event.belongsToMany(Key_Word, { through: ExerciseE_Keyword })
    Key_Word.belongsToMany(Exercise_Event, { through: ExerciseE_Keyword })

    //User

    //Permission
    User.hasOne(Permission)
    Permission.belongsTo(User)

    //Output
    Exercise_Event.hasMany(Output)
    Output.belongsTo(Exercise_Event)
    //Class
    User.hasMany(Class, { foreignKey:{allowNull: false,name:"U_Teacher_ID"} })
    Class.belongsTo(User)
    //Exercise_Antipattern
    Language.hasMany(Exercise_Antipattern)
    Exercise_Antipattern.belongsTo(Language)
    //Key_Antipattern
    Antipattern.belongsToMany(Key_Word, { through: Key_Antipattern })
    Key_Word.belongsToMany(Antipattern, { through: Key_Antipattern })
    //Code
    Language.hasMany(Code)
    Code.belongsTo(Language)
    //User_Exercise_Event
    User.belongsToMany(Exercise_Event, { through: User_Exercise_Event })
    Exercise_Event.belongsToMany(User, { through: User_Exercise_Event })
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

global.sequelize.authenticate().then(() => {
    
    // User_Contentrelationed.sync()
    // ExerciseE_Code.sync()
    // Error_Type.sync()
    // User_Class.sync()
    // Exercise_Event.sync()
    // Antipattern_Code.sync()
    // Event_IssueCode.sync()
    // Input.sync()
    // ExerciseA_Keyword.sync()
    // Key_Word.sync()
    // //diego
    // Antipattern_Error.sync()
    // Antipattern_Event.sync()
    // Antipattern_Language.sync()
    // Antipattern_Relationed.sync()
    // Class_Exercise.sync()
    // Event.sync()
    // ExerciseAnt_Choice.sync()
    // ExerciseE_Keyword.sync()
    // Permission.sync()
    // User.sync()
    // //henri
    // Antipattern.sync()
    // Class.sync()
    // Code.sync()
    // Error.sync()
    // Event_SolutionCode.sync()
    // Exercise_Antipattern.sync()
    // Key_Antipattern.sync()
    // Language.sync()
    // Output.sync()
    // User_Exercise_Antipattern.sync()
    // User_Exercise_Event.sync()
    testar();
})

async function testar() {
    
    // const usuario=await User.create({
    //     FirstName : "adaildo",
    //     LastName : "a",
    //     Email : "a@gmail.com",
    //     Password : "159",
    //     InstitutionName : "DAnonimo" 
    // })

    // await Antipattern.create({
    //     Sugestion_Teacher : "Nada não",
    //     Sugestion_Std : "se vira fi",
    //     isAntipattern : true,
    //     Problem : "não sei em",
    //     UserID : 1
    // })

    // await Language.create({
    //     Name: 'Python'
    // }) 


    // var usr = await User.findOne({where: {FirstName: 'adaildo'}})

    // await Exercise_Event.create({
    //     Tittle: 'Exercicio1',
    //     Description: 'marcos_maozinha',
    //     Subtittle: 'ericPato',
    //     UserID: usr.ID
    // })
    
    // await Key_Word.create({
    //     Name: 'laço'
    // })
    
    // Antipattern_Event.create({
    //     AntipatternID : 2,
    //     EventID: 4
    // })
    // Antipattern.destroy({where:{ID:1}})

    // Key_Word.create({
    //     Name : "laço"
    // })
    
    // Key_Antipattern.create({
    //     KeyWordID:2,
    //     AntipatternID: 2
    // })
    
    
    // ExerciseE_Keyword.create({
    //     ExerciseEventID:1,
    //     KeyWordID:2
    // })
    
    
    // User_Contentrelationed.create({
    //     UserID:1,
    //     KeyWordID:2
    // })
    
    
    // Exercise_Antipattern.create({
    //     UserID:1,
    //     LanguageID: 1,
    //     Description: "sei não"
    // })
    
    // ExerciseA_Keyword.create({
    //     ExerciseAntipatternID:1,
    //     KeyWordID:2
    // })
    // Error_Type.create({
    //     Name: 1000
    // })

    // Antipattern_Error.create({
    //     AntipatternID: 2,
    //     ErrorTypeID: 1
    // })

    // Code.create({
    //     LanguageID: 1,
    //     Code: "print('marcos')"
    // })

    // Antipattern_Code.create({
    //     AntipatternID: 2,
    //     CodeID: 1
    // })

    // Antipattern_Language.create({
    //     AntipatternID : 2,
    //     LanguageID : 1
    // })

    // User_Exercise_Antipattern.create({
    //     UserID : 1,
    //     ExerciseAntipatternID : 1
    // })

    // User_Exercise_Event.create({
    //     UserID : 1,
    //     ExerciseEventID: 1
    // })

    // ExerciseAnt_Choice.create({
    //     Description:"nada de mais",
    //     Explanation:"se vira",
    //     ExerciseAntipatternID: 1
    // })

    // await Class.create({
    //     Name:"c1",
    //     Class_code:"00000",
    //     U_Teacher_ID:1
    // })

    // await Class_Exercise.create({
    //     ClassID:1,
    //     ExerciseAntipatternID:1
    // })

    // await User.create({
    //     FirstName : "adaildo",
    //     LastName : "a",
    //     Email : "a@gmail.com",
    //     Password : "159",
    //     InstitutionName : "DAnonimo" 
    // })
    
    // await Language.create({
    //     Name:"java"
    // })
    // await Language.create({
    //     Name:"javascript"
    // })
    // await Language.create({
    //     Name:"python"
    // })
    // await Language.create({
    //     Name:"c#"
    // })
    // await Code.create({
    //     LanguageID:2,
    //     Code:"sadsadsad"
    // })
    
    // await Exercise_Event.create({
    //     UserID:1,
    //     Tittle: "s",
    //     Description: "s",
    //     Subtittle:"s"
    // })

    // await ExerciseE_Code.create({
    //     ExerciseEventID:1,
    //     CodeID:1
    // })
    

    // User.create({
    //     FirstName: "Marcos",
    //     LastName: "brendon",
    //     Email:"m@gmail.com",
    //     Password:"1597",
    //     InstitutionName: "nada"
    // })

    // Input.create({
    //     ExerciseEventID: 1,
    //     Number: 1,
    //     InputInside: "aaaaaa",
    // })
    // Output.create({
    //     ExerciseEventID: 1,
    //     Number: 1,
    //     InputInside: "aaaaaa",
    // })
    
    // Event.create({
    //     UserID:1,
    //     ExerciseEventID:1,
    //     Observation: "    ",
    // })

    // Event_SolutionCode.create({
    //     Observation:" aaa",
    //     IMG:"AAAA",
    //     EventID:1,
    //     CodeID:1,
    // })    


    // Event_IssueCode.create({
    //     EventID:1,
    //     CodeID:1,
    //     When : "asdasdsa",
    //     Observation : " asdsadasd",
    //     IMG : "SADASDASD"
    // })
    
    


}

