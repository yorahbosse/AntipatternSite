const rota = require('express').Router()

rota.get('/',(req,res)=>{
    res.send("usuario")
})

module.exports = rota