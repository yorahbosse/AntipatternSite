const express = require('express')
const bodyparser = require('body-parser')
const handlebars = require('express-handlebars')

const port = process.env.PORT || 80
const app = express()

app.get('/',(req,res)=>{
    res.send("rodando")
})

app.listen(port)