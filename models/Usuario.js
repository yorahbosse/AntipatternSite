const mongoo = require('mongoose')
const schema = mongoo.Schema

const Usuario = new schema({
    nome:{
        type: String,
        require: true,
    },
    sobrenome:{
        type: String,
        require: true,
    },
    login:{
        type: String,
        require: true,
    },
    senha:{
        type: String,
        require: true,
    },
    a_mode:{
        type: String,
        default: "user",
    },
    data:{
        type: Date,
        default: Date.now(),
    }
})

moongose.model('Usuarios',Usuario)