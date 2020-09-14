const express = require('express')
const bodyparser = require('body-parser')
const handlebars = require('express-handlebars')
const path = require('path')

const port = process.env.PORT || 80
const app = express()

app.engine('handlebars',handlebars({defaultLayout:'basic'}))
app.set("view engine","handlebars")
app.use(express.static(path.join(__dirname,"public")))

app.get('/',(req,res)=>{
    res.render("index")
})

app.listen(port)