const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.API_EMAIL);

exports.sendEmail = (message) => {
  const msg = {
    to: message.to,
    from: 'iamforu299@gmail.com',
    subject: message.subject,
    text: message.text,
  };
  sgMail
    .send(msg)
    .then(() => console.log('Email sent!'))
    .catch((error) => console.log(error.message));
};
