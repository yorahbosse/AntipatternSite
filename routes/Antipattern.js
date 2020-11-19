const express = require('express')
const router = express.Router() //criar rotas em arquivos separados
const db = global.sequelize
const {checkLogin} = require('../config/Middlewares')  

const Antipattern = require('../models/Antipattern')
const Antipattern_Language = require('../models/Antipattern_Language')
const Antipattern_Error = require('../models/Antipattern_Error')
const Antipattern_Code = require('../models/Antipattern_Code')
const Key_Antipattern = require('../models/Key_Antipattern')
const Antipattern_Relationed = require('../models/Antipattern_Relationed')
const Error_Type = require('../models/Error_Type')
const Key_words = require('../models/Key_word')

const A_Event = require('../models/Antipattern_Event')
const Event = require('../models/Event')
const EventIssueCode = require('../models/Event_IssueCode')
const EventSolutionCode = require('../models/Event_SolutionCode')
const Code = require('../models/Code')
const Language = require('../models/Language')
const Antipattern_Event = require('../models/Antipattern_Event')
const Exercise_Event = require('../models/Exercise_event')

const Sequelize = require('sequelize')


router.get('/', (req, res) => {
    Antipattern.findAll().then((antipatterns) => {
        res.render('Antipattern/index', { antipatterns: antipatterns })
    }).catch((error) => {
        console.log('Error in show antipattern, ' + error)
    })

})


router.post('/view', async (req, res) => {

    let antipattern = await Antipattern.findByPk(req.body.ID)

    //Elementos BÁSICOS do Antipadrão

    //Variáveis guardando as informações sem necessidade de consultas
    var isAnt = antipattern.isAntipattern
    var Relativeid = antipattern.RelativeID
    var Title = antipattern.Title
    var Sugestion_teacher = antipattern.Sugestion_Teacher
    var Sugestion_stdnt = antipattern.Sugestion_Std
    var Problem = antipattern.Problem
    //Variáveis que irão guardar os atributos multivalorados
    var Errors = []
    var Languages_ = []
    var Keys = []
    var Codes = []
    var Relationed = []
    //Variável para guardar qualquer mensagem referente erro ou informação
    var Msg = []
    //Variáveis que guardam os resultados das buscas em outras tabelas (relacionamentos N:M)
    var ErrorsID = await Antipattern_Error.findAll({ where: { AntipatternID: antipattern.ID } })
    var LanguagesID = await Antipattern_Language.findAll({ where: { AntipatternID: antipattern.ID } })
    var CodesID = await Antipattern_Code.findAll({ where: { AntipatternID: antipattern.ID } })
    var KeysID = await Key_Antipattern.findAll({ where: { AntipatternID: antipattern.ID } })
    var RelationedID = await Antipattern_Relationed.findAll(
        {
            where:
                Sequelize.or(
                    { AntipatternA_ID: antipattern.ID },
                    { AntipatternB_ID: antipattern.ID }
                )
        }
    )


    if (!Relativeid)
        Relativeid = "Sem atribuição"
    if (!Title)
        Title = "Sem atribuição"

    //Buscas nas tabelas de entidades associativas sendo feitas    
    if (ErrorsID !== null) {//Se tiver erros relacionados
        for (let i of ErrorsID) {
            let errortype = await Error_Type.findByPk(i.ErrorTypeID)
            if (errortype !== null) {//Se aquele tipo de erro existe
                Errors.push(errortype.Name)
                Msg.push('Tipos de erro não encontrado!')
            }
        }
    }
    else {
        Msg.push('Tipos de erros relacionados não encontrados')
    }

    if (LanguagesID !== null) {//Se tiver linguagens relacionadas
        for (let i of LanguagesID) {
            let language = await Language.findByPk(i.LanguageID)
            if (language !== null) {//Se aquele tipo de erro existe
                Languages_.push(language.Name)
                Msg.push('Linguagem não encontrada!')
            }
        }
    }
    else {
        Msg.push('Linguagens relacionadas não encontradas')
    }

    if (KeysID !== null) {//Se tiver linguagens relacionadas
        for (let i of KeysID) {
            let key = await Key_words.findByPk(i.KeyWordID)
            if (key !== null) {//Se aquela key word existe
                Keys.push(key.Name)
                Msg.push('Palavra chave não encontrada!')
            }
        }
    }
    else {
        Msg.push('Conteúdos relacionados não encontrados')
    }

    if (CodesID !== null) {
        for (let i of CodesID) {
            let c = await Code.findByPk(i.CodeID)
            if (c !== null) {
                let language = await Language.findByPk(c.LanguageID)
                if (language !== null)
                    Codes.push({
                        Language: language.Name,
                        CodeText: c.Code,
                        CodeImg: c.IMG
                    })
                Msg.push('Linguagem do código de exemplo não encontrado!')
            } else {
                Msg.push('Código de exemplo não encontrado!')
            }
        }
    } else {
        Msg.push('Códigos de exemplos relacionados não encontrados')
    }

    if (RelationedID !== null) {
        for (let i of RelationedID) {
            let ant = null
            if (i.AntipatternA_ID === antipattern.ID) //Quer dizer que o antipadrao relacionado é o AntipatternB_ID
                ant = await Antipattern.findByPk(i.AntipatternB_ID)
            else //Quer dizer que o antipadrao relacionado é o AntipatternA_ID
                ant = await Antipattern.findByPk(i.AntipatternA_ID)
            Relationed.push({
                Relativeid: ant.RelativeID,
                Textrelationed: i.Text_related
            })

        }
    }
    else {
        Relationed.push('Sem padrões relacionados')
    }

    //JSON do Antipadrão que será enviado
    const AntipatterntoSend = {
        isAntipattern: isAnt,
        Title: Title,
        RelativeID: Relativeid,
        Problem: Problem,
        SugestionTeacher: Sugestion_teacher,
        SugestionStdnt: Sugestion_stdnt,
        ErrorsType: Errors,
        Languages: Languages_,
        Keys: Keys,
        Codes: Codes,
        Relationeds: Relationed
    }


    let Events_IDS = await A_Event.findAll({ where: { AntipatternID: antipattern.ID } })
    let Events = []
    //@
    for (let i of Events_IDS) {
        let so = await EventSolutionCode.findOne({ where: { EventID: i.EventID } })
        let isu = await EventIssueCode.findOne({ where: { EventID: i.EventID } })

        let so_code = null

        let isu_code = null
        let isu_lang = null
        let so_lang = null

        if (so !== null) {
            so_code = await Code.findByPk(so.CodeID)
            so_lang = await Language.findByPk(so_code.LanguageID)
        }

        if (isu !== null) {
            isu_code = await Code.findByPk(isu.CodeID)
            // console.log(isu_code.LanguageID)
            isu_lang = await Language.findByPk(isu_code.LanguageID)
        }

        Events.push({
            event: await Event.findByPk(i.EventID),
            issue_code: {
                Data: isu,
                Code: isu_code,
                Language: isu_lang,
            },
            solution_code: {
                Data: so,
                Code: so_code,
                Language: so_lang
            }
        })
    }

    //não vai precisar no view vai ficar na  função de admin
    let Languages = await Language.findAll()
    letlanguages = []
    for (let i in Languages) {
    languages.push({ OpName: Languages[i].Name })
    }
    // console.log(Events)
    //     
    console.log(AntipatterntoSend)
    if (Msg.length === 0)                                                                          // precisa retirar no final dos testes
        res.render('Antipattern/viewAntipattern', { Antipattern: AntipatterntoSend, eventos: Events, languages:languages })
    else
        res.render('Antipattern/viewAntipattern', { Antipattern: AntipatterntoSend, eventos: Events, languages:languages, Msg: Msg })

})



// Rota de cadastro de antipadrão 
router.get('/cad',checkLogin,async (req,res)=>{
    console.log(global.UserTemp[req.sessionID]["CadEvents"])
    //Obtendo lista de linguagens disponiveis
    var Db_Languages = await Language.findAll() //Linguagens
    var ErrorsType = await Error_Type.findAll() //Tipos de erros
    var Key = await Key_words.findAll() //Palavras chaves
    
    var languages = []
    var errorstypes = []
    var keys = []

    for(let i of Db_Languages) {
        languages.push({OpName:i.Name})
    }

    for (let i in ErrorsType) {
        errorstypes.push(ErrorsType[i].Name)
    }

    for (let i in Key) {
        keys.push(Key[i].Name)
    }
    // pegando os codigos inseridos na sessão atual pelo usuario
    var Codes = []
    if (global.UserTemp[req.sessionID]) {
        if (global.UserTemp[req.sessionID]["CadCodes"] != undefined) {
            for (let i of global.UserTemp[req.sessionID]["CadCodes"]) {
                let Cod = await Code.findByPk(i)
                let Lang = await Language.findByPk(Cod.LanguageID)
                console.log(Lang)
                Codes.push({ Code: Cod, Lang })
            }
        }
    }

    res.render('Antipattern/cadAntipattern', {languages:languages, Codes:Codes,CodesLength:Codes.length, Errorstypes:errorstypes, Keys:keys})
})

router.post('/cad_', (req, res) => {
    console.log(req.body)
})



// Rota de edição de antipadrão
router.get('/edit', (req, res) => {
    res.render('Antipattern/editAntipattern')
})

// Cadastro de Event do ANtipadrão
router.post('/cadevent', async (req, res) => {
    
    let Exercise = await Exercise_Event.findByPk(req.body.ExerciseID) 
    
    if (Exercise==null) {
        req.flash("err_msg","O Exercício informado não existe!")
        
        if(req.body.paginaPai)
            res.redirect(req.body.paginaPai)
        return
    }

    console.log(req.body)

    let N_Event = await Event.create({
        Observation : req.body.EObservacao,
        UserID : req.body.UserID,
        ExerciseEventID : req.body.ExerciseID
    })

    let E_IssueCode = await EventIssueCode.create({
        When : req.body.WhenErr,
        Observation : req.body.ObsPCode,
        EventID : N_Event.ID,
        CodeID: req.body.ProblemCodeID
    })

    let Event_SolutionCode = await EventSolutionCode.create({
        Observation : req.body.ObsSCode,
        EventID : N_Event.ID,
        CodeID: req.body.SolutionCodeID
    })

    if(global.UserTemp[req.sessionID]!=undefined)
        if(global.UserTemp[req.sessionID]["CadEvents"]!=undefined)
            global.UserTemp[req.sessionID]["CadEvents"].push(N_Event.ID)
        else
            global.UserTemp[req.sessionID]["CadEvents"]=[N_Event.ID]

    if(req.body.paginaPai)
        res.redirect(req.body.paginaPai)
    else
        res.redirect('/')
})

module.exports = router
