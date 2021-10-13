exports.loginRequired = (req, res, next) => {
    if(req.user){
        next();
    } else {
        return res.status(200).json({
            status: 0,
            message: 'Access denied'
        });
    }
}