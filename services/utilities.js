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
      
      async generateUrl(member, transaction, req, type) {
        let newUrl =
          member.lienConfirmation === null
            ? crypto.randomBytes(32).toString("hex")
            : member.lienConfirmation;
        let subject, htmlContent;
        await member.update(
          {
            lienConfirmation: newUrl,
          },
          { transaction }
        );
    
        if (type === "signup") {
          newUrl = process.env._HOST_FRONT + "/confirmAccount/" + newUrl;
          subject = "Bienvenue sur Owayzz - Confirmez votre compte";
          // TODO: Customize this message based on the user's language
          htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Bienvenue sur Owayzz</title>
    </head>
    <body style="font-family: Arial, sans-serif;">
    
    <h1 style="color: #0078D4;">Bienvenue sur Owayzz !</h1>
    
    <p style="font-size: 18px;">Préparez-vous pour une aventure passionnante d'exploration et de connexion avec des voyageurs du monde entier sur Owayzz, votre réseau social dédié aux passionnés de voyages.</p>
    
    <p style="font-size: 18px;">Pour commencer cette aventure, confirmez simplement votre compte en cliquant sur le lien ci-dessous :</p>
    
    <p style="font-size: 20px;"><a href="${newUrl}" style="color: #0078D4; text-decoration: none;">Confirmez Mon Compte</a></p>
    
    <p style="font-size: 18px;">Si vous n'avez pas créé de compte sur Owayzz, vous pouvez ignorer cet e-mail en toute sécurité.</p>
    
    <p style="font-size: 18px;">Rejoignez-nous pour découvrir la beauté de nouvelles destinations, partager vos récits de voyage et vous connecter avec d'autres aventuriers !</p>
    
    <p style="font-size: 18px;">À bientôt sur Owayzz !</p>
    
    <hr>
    
    <p style="font-size: 16px;">Si vous n'avez pas initié cette demande ou si vous avez des questions, veuillez contacter notre équipe d'assistance.</p>
    
    <p style="font-size: 16px;">Cordialement,<br>L'équipe Owayzz</p>
    
    </body>
    </html>
    `;
        } else {
          //TODO:
        }
    
        //send email notification
        await sendMail
          .send(
            process.env._MAIL_USER,
            member.email,
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