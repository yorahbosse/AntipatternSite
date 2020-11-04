//importando bibliotecas
const express = require('express')
const bodyparser = require('body-parser')
const handlebars = require('express-handlebars')
const path = require('path')

require("./config/dbConnection")

//Configs

	//Criando app
		//se receber porta do servidor a use , caso contrario use a 80
		const port = process.env.PORT || 8000
		const app = express()

	//Setando engine de aplicação, usando o arquivo basic como layout basico
		app.engine('handlebars',handlebars({defaultLayout:'basic'}))
		app.set("view engine","handlebars")

	//Setando pasta publica (bootstrap)
		app.use(express.static(path.join(__dirname,"public")))

	//Setando conversor de corpo
		app.use(bodyparser.urlencoded({extended:false}))
		app.use(bodyparser.json())

	//Adicionando rotas
		//pegando rota
		//const Usuario = require('./routes/usuario')
		//const Index = require('./routes/index')
		
		//setando rotas
		//app.use('/',Index)
		//app.use('/usuario',Usuario)
		
		//Antipattern
		const Antipattern = require('./routes/Antipattern')
		app.use('/Antipattern',Antipattern)
		//Code
		app.use('/Code',require('./routes/Code'))

//iniciando o servidor com a porta informada
app.listen(port)