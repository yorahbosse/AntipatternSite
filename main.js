const express = require('express')
const bodyparser = require('body-parser')
const handlebars = require('express-handlebars')

const port = 80
const app = express()

app.get('/',(req,res)=>{
    res.send("rodando")
})

app.listen(port)