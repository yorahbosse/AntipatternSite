const local_strategy = require('passport-local')
const bcrypt = require("bcryptjs")
const User = require('../models/User')


module.exports = function (passport){
    passport.use(new local_strategy({usernameField:'login',passwordField:'password'},async (login, password, done)=>{
        let user = await User.findOne({where:{Email:login}})
        if(!user) {
            return done(null,false,{message:"erro user não exist"})
        }
        bcrypt.compare(password,user.Password,(erro,batem)=>{
            if(batem){
                return done(null,user)
            } else {
                return done(null,false,{message:"senha incorreta"})
            }
        })
    }))

    passport.serializeUser(async(user,done)=>{
        done(null,user.ID)
    })
    passport.deserializeUser(async(user,done)=>{
        let usr = await User.findByPk(user)
        done(null,usr)
    })
}