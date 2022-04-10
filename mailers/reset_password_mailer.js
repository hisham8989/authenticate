const nodemailer = require('../config/nodemailer');

exports.resetPassword = (user,tokken)=>{

    let htmlString = nodemailer.renderTemplate({user,tokken},'/reset_password/reset.ejs')

nodemailer.transporter.sendMail({
    from:'admin@auth.in',
    to:user.email,
    subject: "Reset Password",
    html:htmlString
},function (err,info) {
    if(err){
        console.log('Error in Sending Mails',err);
        return;
    }
    console.log("Message Sent");
    return;
})
}

