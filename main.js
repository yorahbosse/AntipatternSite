//importando bibliotecas
const express = require('express')
const session = require('express-session')
const handlebars = require('express-handlebars')
const multer = require('multer')


const bodyparser = require('body-parser')
const path = require('path')

require("./config/dbConnection")
//sistema de login
const config_auth = require('./config/auth')
const passport = require('passport')
const connect_flash = require('connect-flash')

//criando variavel global para guardar itens de sessão
global.UserTemp = {}


function textoAleatorio(tamanho){
    var letras = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
    var aleatorio = '';
    for (var i = 0; i < tamanho; i++) {
        var rnum = Math.floor(Math.random() * letras.length);
        aleatorio += letras.substring(rnum, rnum + 1);
    }
    return aleatorio;
}

//Configs
	
	//Criando app
		//se receber porta do servidor a use , caso contrario use a 80
		const port = process.env.PORT || 8000
		const app = express()
		
		
	//configurando sessão
		app.use(session({
			secret: textoAleatorio( Math.random() *10),
			resave: true,
			saveUninitialized: true,
		}))
		
		app.use(passport.initialize())
		app.use(passport.session())
		config_auth(passport) // iniciando função de autenticação
		app.use(connect_flash())

		//adicionando variavel globar para cada requisição
		app.use((req,res,next)=>{
			res.locals.err_msg = req.flash("err_msg")
			res.locals.sucess_msg = req.flash("sucess_msg")
			res.locals.error = req.flash("error")
			res.locals.user = req.user || null
			next()
		})

	//Setando engine de aplicação, usando o arquivo basic como layout basico
		const handlebar = handlebars.create({
			defaultLayout:'basic',
			helpers: {
				not_equal: function(value1,value2) {
					return value1!=value2;
				},
				not_e_equal: function(value1,value2) {
					return value1!==value2;
				},
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

			app.use("/images",express.static(path.join(__dirname, "public/images" )));

			app.use("/uploads",express.static(path.join(__dirname, "public/uploads")));

	//Setando conversor de corpo
		app.use(bodyparser.urlencoded({extended:false}))
		app.use(bodyparser.json())

	//Adicionando rotas

		//User route
		app.use('/user',require('./routes/User'))
		
		//Antipattern
		const Antipattern = require('./routes/Antipattern')
		app.use('/Antipattern',Antipattern)
		
		//Code
		app.use('/Code',require('./routes/Code'))

		//Exercise_event
        const Exercise_event = require('./routes/Exercise_event')
		app.use('/event-exercises',Exercise_event)

		const Event = require('./routes/Event')
		app.use("/event",Event)

		//Rota de Erro
		app.use('/error',require('./routes/Error'))


		// rota do index
		// app.get("/",function(req,res){
		// 	res.render("index")
		// })

		app.use(function(req, res, next){
			res.status(404).render('404');
		});
		
//iniciando o servidor com a porta informada
app.listen(port)