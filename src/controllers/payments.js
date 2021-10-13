const PaymentModel = require('../models/payments')
const { emailSending } = require('../config/email')

exports.PaymentController = {
    async getpayments(req, res) {
        try {
            const payment = await PaymentModel.find({userId:req.params.userId}).populate("userId",["fullname", "mobile" ]);
            //return res.json(payment);
            return res.status(201).json({
                status: 1,
                payment: payment
            });
        } catch(err){
            // throw new Error("Failed to get products");
            res.status(200).json({status: 0, message: err.message });
        }
    },
    async createNewPayment(req, res) {
      
        try {
            // await emailSending(req.user.email, req.user.accNo, `You have deposited ${req.body.amount} EUR to your account : ${req.user.accNo}`)
        
            const newPayment = await PaymentModel.create({
                
                amount: req.body.amount,
                phone: req.body.phone,
                userId: req.body.userId,
                createdAt: Date.now()
            })
            // const result = await PaymentModel.findOne({userId:newPayment.userId}).populate('userId', ['fullName']);
            return res.status(201).json({
                status: 1,
                payment: newPayment
            });
        } catch(err){
            res.status(200).json({status: 0, message: err.message });

        }
    },
    async updatePayment(req, res) {
    const payment = new Payment();
    payment.amount = req.body.amount;
    payment.phone = req.body.phone;
    payment.reference = req.user.id;
    payment.createdAt = Date.now(); 
        
        try {
            const id = req.params.id;
            const response = await PaymentModel.findByIdAndUpdate({_id: id}, req.body, {new: true});
            return res.json(response);
        } catch(err){
            throw new Error("Failed to updated user");
        }
    },
    // async deletePayment(req, res) {
    //     try {
    //         const id = req.params.id;
    //         const response = await PaymentModel.findByIdAndDelete({_id: id});
    //         return res.json({message: 'Resource deleted successfully'});
    //     } catch(err){
    //         throw new Error("Failed to delete user");
    //     }
    // }
}