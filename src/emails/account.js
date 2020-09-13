
const sgMail = require("@sendgrid/mail");

const sendgridapi = processe.env.sendgrid_api

sgMail.setApiKey(sendgridapi);

const sendemail = function(email,name){


    sgMail.send({
        to:email,
        from:"anjuwadhwa1969@gmail.com",
        subject:"hello world",
        text:"hello how are you"+name,
    })

}

const cancelemail=function(email,name)
{
    sgMail.send({
        to:email,
        from:"anjuwadhwa1969@gmail.com",
        subject:"reason for cancelling the account",
        text:"hi"+name+", i just wanted to know why you remoed your account"

    })
}

module.exports = {
    sendemail:sendemail,
    cancel:cancelemail
}

