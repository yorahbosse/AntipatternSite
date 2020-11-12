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
		const handlebar = handlebars.create({
			defaultLayout:'basic',
			helpers: {
				equal : function(value1,value2){
					return value1==value2;
				},
				e_equal : function(value1,value2){
					return value1===value2;
				},
				isdefined : function (value) {
					return value !== undefined;
				},

				isNull : function (value) {
					return value === null;
				}, 
			}
		})

		app.engine('handlebars',handlebar.engine)
		app.set("view engine","handlebars")
		
		


	//Setando pasta publica (bootstrap)
		app.use(express.static(path.join(__dirname,"public")))
		
		//setando os caminhos dos arquivos como se estivessem na pasta publica
			app.use("/css", express.static(path.join(__dirname, "node_modules/bootstrap/compiler")));
			
			app.use("/js", express.static(path.join(__dirname, "node_modules/jquery/dist")));
			
			app.use("/js", express.static(path.join(__dirname, "node_modules/bootstrap/dist/js")));

			app.use("/images", express.static(path.join(__dirname, "node_modules/bootstrap-icons/icons")));

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
		// app.use('/Code',require('./routes/Code'))

		//Exercise_event
        const Exercise_event = require('./routes/Exercise_event')
		app.use('/event-exercises',Exercise_event)

		const Event = require('./routes/Event')
		app.use("/event",Event)
		
//iniciando o servidor com a porta informada
app.listen(port)