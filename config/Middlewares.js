function checkLogin(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/user/login');
}

module.exports = {
    checkLogin
}