const { UserController } = require('../controllers/users')
const {loginUser, loginRequired} = require('../authentication/auth')

module.exports = (app) => {
    app.route('/users')
        .get(loginRequired,UserController.getusers)
        .post(UserController.createNewUser);
    // app.route('/users/:id')
    //     .put(UserController.updateUser)
    //     .delete(UserController.deleteUser);
    app.route('/users/login')
        .post(UserController.loginUser)
    
}