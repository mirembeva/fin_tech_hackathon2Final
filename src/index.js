module.exports = (app) => {
    require('./routes/users')(app);
    require('./routes/payments')(app);
}