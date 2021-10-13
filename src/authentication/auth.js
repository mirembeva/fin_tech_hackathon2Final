exports.loginRequired = (req, res, next) => {
    if(req.user){
        next();
    } else {
        return res.send('Access denied');
    }
}