const express = require('express')
const router = express.Router() //criar rotas em arquivos separados
const db = global.sequelize

const Antipattern = require('../models/Antipattern')

router.get('/',(req,res)=>{
    Antipattern.findAll().then((antipatterns)=>{
        res.render('Antipattern/index',{antipatterns: antipatterns})
    }).catch((error)=>{
        console.log('Error in show antipattern, '+error)
    })
    
})

router.post('/view',(req,res)=>{
    Antipattern.findByPk(req.body.ID).then((antipattern)=>{
        res.render('Antipattern/viewAntipattern',{antipattern:antipattern})
    }).catch((e)=>{
        console.log('N achou! '+ e)
    })
    
})


module.exports = router