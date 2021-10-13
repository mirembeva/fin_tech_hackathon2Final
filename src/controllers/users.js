const UserModel = require('../models/users')

const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken')


exports.UserController = {
    async getusers(req, res) {
        try {
            const response = await UserModel.find();
            //return res.json(response);
            return res.status(201).json({
                status: 1,
                response: response
            });
        } catch(err){
            // throw new Error("Failed to get users");
            res.status(200).json({status: 0, message: err.message });
        }
    },
    async createNewUser(req, res) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        try {
            const response = await UserModel.create({
                fullname:  req.body.fullname,
                email:req.body.email,
                password: hashedPassword,
                mobile: req.body.mobile
               
            });
            //return res.json({response:response._id});
            return res.status(201).json({
                status: 1,
                response:response._id
            });
        } catch(err){
            // console.log(err)
            // throw new Error("Failed to post users");
            res.status(200).json({status: 0, message: err.message });
        }
    },
    // async updateUser(req, res) {
    //     try {
    //         const id = req.params.id;
    //         const response = await UserModel.findByIdAndUpdate({_id: id}, req.body, {new: true});
    //         return res.json(response);
    //     } catch(err){
    //         throw new Error("Failed to updated user");
    //     }
    // },
    // async deleteUser(req, res) {
    //     try {
    //         const id = req.params.id;
    //         const response = await UserModel.findByIdAndDelete({_id: id});
    //         return res.json({message: 'Resource deleted successfully'});
    //     } catch(err){
    //         throw new Error("Failed to delete user");
    //     }
    // },



    async loginUser(req, res) {
        try {
            //valid email
            const user= await UserModel.findOne({email: req.body.email});
            if(!user)
            return  res.status(200).json({status: 0, message: "email does not exist" });
            //valid password
            const validpass = await bcrypt.compare(req.body.password,user.password);
            if(!validpass)
            return  res.status(200).json({status: 0, message: "wrong password" });
            
            //create and assign jwt
            const token = jwt.sign({_id:user._id}, process.env.TOKEN_SECRET)
            res.header('authentication_token', token);
            //res.json(token);
            res.status(200).json({status: 1, token: token, userId:user._id, name:user.fullname})
    
        } catch(err){
            //console.log(err)
            // throw new Error("Failed to login user");
            res.status(200).json({status: 0, message: err.message });
        }
    }
}








//     async loginUser(req, res) {
//         try {
//             const user = await UserModel.findOne({email:req.body.email});
//             if(!user){
//             return res.json({message: 'Email not found'});   
//             }
//             //correct password
//             const validPass = await bcrypt.compare(req.body.password, user.password);
//             if(!validPass) return res.status(400).send('Invalid Password');   
                
//                 res.send("logged in")
        
//         } catch(err){
//            console.log(err) 
//             throw new Error("Failed to login user");
//         }
//     }

// }