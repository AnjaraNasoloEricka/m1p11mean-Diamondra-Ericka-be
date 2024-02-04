const sendMail = require("./sendMailService");
const crypto = require("crypto");

module.exports = {
    async sendCongratulationEmail(pro) {
        let subject = "Bienvenue sur Owayzz - Compte activé";
        // email content
        let htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Bienvenue sur Owayzz</title>
            </head>
            <body style="font-family: Arial, sans-serif;">
                <h1 style="color: #0078D4;">Bienvenue sur Owayzz !</h1>
                <p style="font-size: 18px;">Félicitations, votre compte ${pro.VTR_membre.pseudo} du nom de "${pro.VTR_membre.nom}" a été activé</p>
                <p style="font-size: 18px;">Vous pouvez maintenant vous connecter à votre compte en tant qu'utilisateur de l'entité ${pro.VTR_entite.nom}</p>
                <p style="font-size: 18px;">À bientôt sur Owayzz !</p>
                <hr>
                <p style="font-size: 16px;">Si vous avez des questions, veuillez contacter notre équipe d'assistance.</p>
                <p style="font-size: 16px;">Cordialement,<br>L'équipe Owayzz</p>
            </body>
            </html>`;
    
        //send email notification
        await sendMail
          .send(
            process.env._MAIL_USER,
            pro.VTR_membre.email,
            subject,
            subject,
            htmlContent,
            null,
            null
          )
          .then((info) => {
            console.log(info);
          })
          .catch((error) => {
            console.log(error);
            throw new Error("Impossible d'envoyer l'email de notification");
          });
      },
      
      async sendConfirmationEmail(user) {
        console.log(user);
        console.log("sendConfirmationEmail");
        let newUrl =
          user.confirmationLink === null || user.confirmationLink === "" || user.confirmationLink === undefined
            ? crypto.randomBytes(32).toString("hex")
            : user.confirmationLink;

        let subject, htmlContent;

        user.confirmationLink = newUrl;
        await user.save();
        
        let salonName = "Paradise Glam"
          newUrl = process.env._HOST_FRONT + "/confirmAccount?token=" + newUrl;
          subject = `Registration Confirmation - ${salonName}`;
          // TODO: Customize this message based on the user's language
          htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Registration Confirmation - ${salonName}</title>
    </head>
    <body style="font-family: Arial, sans-serif;">
    
      <p>Dear  ${user.name},</p>

      <p>We are delighted to welcome you to the ${salonName} community! To complete your registration, please click the link below to verify your email address and activate your account:</p>

      <a href="${newUrl}">Verify Your Email</a>

      <p>Once your email address is verified, you will have full access to our exclusive services, special offers, and beauty tips.</p>

      <p>If you did not attempt to sign up for ${salonName}, please ignore this email.</p>

      <p>We look forward to seeing you soon at our salon and taking care of your beauty needs.</p>

      <p>Best regards,<br>
      The ${salonName} Team<br>
    </body>
    </html>
    `;
    
        //send email notification
        await sendMail
          .send(
            process.env._MAIL_USER,
            user.email,
            subject,
            subject,
            htmlContent,
            null,
            null
          )
          .then((info) => {
            console.log(info);
          })
          .catch((error) => {
            console.log(error);
            throw new Error("Impossible d'envoyer l'email de notification");
          });
      },
}