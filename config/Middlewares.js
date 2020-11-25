function checkLogin(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/user/login');
}

function No_Logged(req, res, next) {
    if (req.isAuthenticated()) {
        req.flash("sucess_msg","logado!")
        res.redirect('/');
    } else { 
        return next();
    }
}
module.exports = {
    checkLogin,
    No_Logged
}