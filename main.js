//importando bibliotecas
const express = require('express')
const bodyparser = require('body-parser')
const handlebars = require('express-handlebars')
const path = require('path')
//criando app
    //se receber porta do servidor a use , caso contrario use a 80
    const port = process.env.PORT || 80
    const app = express()

//setando engine de aplicação, usando o arquivo basic como layout basico
    app.engine('handlebars',handlebars({defaultLayout:'basic'}))
    app.set("view engine","handlebars")

//setando pasta publica
    app.use(express.static(path.join(__dirname,"public")))

//setando conversor de corpo
    app.use(bodyparser.urlencoded({extended:false}))
    app.use(bodyparser.json())

//adicionando rotas
    //pegando rota
    const Usuario = require('./routes/usuario')
    const Index = require('./routes/index')
    //setando rotas
    app.use('/',Index)
    app.use('/usuario',Usuario)

//iniciando o servidor com a porta informada
app.listen(port)