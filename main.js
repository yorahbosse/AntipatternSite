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
    const antip = [
        {
            err_num: 1,
            code:'#include <stdio.h>\nint main(){\nint x;\nscanf("%d",&x);\nprintf("%d",x);\nreturn 0\n}',
            err:"erro de identação",
            err_nom:"indentação",
        },
    ]
    res.render("index",{antip:antip})
})

app.listen(port)