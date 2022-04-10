const nodemailer = require('nodemailer');
const env = require('./environment')
const ejs = require('ejs');
const path = require('path');

console.log(env.mail_user);
console.log(env.mail_pass);

let transporter = nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:env.mail_user,
        pass:env.mail_pass,
    }
})


let renderTemplate = (data,relativePath) =>{
    let mailHtml;

    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function (err,template) {
            if(err){
                console.log('Error in rendering template for emails',err);
                return;
            }
            mailHtml = template;
        }
    )

    return mailHtml;
}


module.exports = {
    transporter,
    renderTemplate
}