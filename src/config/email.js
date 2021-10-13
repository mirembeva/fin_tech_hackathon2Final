const nodemailer = require('nodemailer');
         
module.exports.emailSending = async function(user, topic, message){
    // Working with nodemailer to send messages
    let mailTransporter = nodemailer.createTransport({ 
        service: 'gmail', 
        auth: { 
            user: 'ossaveapp@gmail.com', 
            pass: 'eva2020hack'
        },
        tls: {
            rejectUnauthorized: false
        } 
    }); 

    let mailDetails = { 
        from: 'ossaveapp@gmail.com', 
        to: user, 
        subject: topic,
        text: `${message}
                Thanks you very much
                `
    };

    await mailTransporter.sendMail(mailDetails, (err, data)=>{
        if(err){
            console.log(err.message)
        }
        console.log('hhhh')
    }) 
}


    
      
        