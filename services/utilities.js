const sendMail = require("./sendMailService");
const crypto = require("crypto");

module.exports = {

    async setSpecialOfferEmail(specialOffer, clients) {
      let salonName = "Paradise Glam";

      let startDate = new Date(specialOffer.startDate).toLocaleDateString('en-US');
      let endDate = new Date(specialOffer.endDate).toLocaleDateString('en-US');

      let reductionType = specialOffer.reductionType === 'percentage' ? '%' : '';

      let htmlContent = `
          <!DOCTYPE html>
          <html>
          <head>
              <title>Special Offer from ${salonName}</title>
              <style>
                  body {
                      font-family: Arial, sans-serif;
                      background-color: #f8f8f8;
                      color: #333;
                      margin: 0;
                      padding: 20px;
                  }
          
                  .container {
                      max-width: 600px;
                      margin: 0 auto;
                      background-color: #fff;
                      border-radius: 10px;
                      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                      padding: 20px;
                  }
          
                  h2 {
                      color: #333;
                      margin-top: 0;
                  }
          
                  p {
                      margin-top: 0;
                      margin-bottom: 20px;
                  }
          
                  .offer {
                      background-color: #ffc107;
                      color: #333;
                      padding: 10px;
                      border-radius: 5px;
                      font-weight: bold;
                      display: inline-block;
                  }
          
                  .date {
                      background-color: #007bff;
                      color: #fff;
                      padding: 5px 10px;
                      border-radius: 5px;
                      font-weight: bold;
                  }
              </style>
          </head>
          <body>
              <div class="container">
                  <h2>Special Offer from ${salonName}</h2>
                  <p>Don't miss our special offer!</p>
                  <p>Get <span class="offer">${specialOffer.reductionValue}${reductionType}</span> off on selected services.</p>
                  <p>Valid from <span class="date">${startDate}</span> to <span class="date">${endDate}</span>.</p>
              </div>
          </body>
          </html>
      `;

      for(const client of clients){
        await sendMail
          .send(
            process.env._MAIL_USER,
            client.user.email,
            "Special Offer",
            "Special Offer",
            htmlContent,
            null,
            null
          )
          .catch((error) => {
            throw new Error("Cannot send email notification");
          });
      }



    },

      async sendAppointmentReminder(appointment, delayInHour) {
        let formattedDate = appointment.startDateTime.toLocaleString("en-US", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });
        let salonName = "Paradise Glam"
        htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Appointment Reminder</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #ffffff;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }
                h1, p {
                    color: #333333;
                    margin: 0;
                    padding: 0;
                }
                p {
                    margin-bottom: 20px;
                }
                .signature {
                    margin-top: 40px;
                    font-size: 14px;
                    color: #666666;
                }
            </style>
        </head>
        <body>

        <div class="container">
            <h1>Appointment Reminder</h1>
            <p>Dear ${appointment.client.user.name},</p>
            <p>This is a reminder that you have an appointment at ${salonName} on ${formattedDate} in ${delayInHour} hours.</p>
            <p>If you need to cancel or reschedule your appointment, please contact us as soon as possible.</p>
            <p>We look forward to seeing you soon!</p>
            <p class="signature">Best regards,<br>The ${salonName} Team</p>
        </div>

        </body>
        </html>
        `;
        //send email notification
        await sendMail
          .send(
            process.env._MAIL_USER,
            appointment.client.user.email,
            "Appointment Reminder",
            "Appointment Reminder",
            htmlContent,
            null,
            null
          )
          .catch((error) => {
            console.log(error);
            throw new Error("Cannot send email notification");
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
          newUrl = process.env._HOST_FRONT + "/auth/register-verify/" + newUrl;
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