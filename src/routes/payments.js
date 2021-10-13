const { PaymentController } = require('../controllers/payments')

module.exports = (app) => {
    app.route('/payments')
        // .get(PaymentController.getpayments)
        .post(PaymentController.createNewPayment);
    app.route('/payments/:id')
        .put(PaymentController.updatePayment)
        //.delete(PaymentController.deletePayment);
    app.route('/payments/user/:userId')
        .get(PaymentController.getpayments)

 
}