const FCM = require("fcm-node");
require("dotenv").config();

const serverKey = process.env._FCM_SERVER_KEY;
const fcm = new FCM(serverKey);


module.exports = {
  send(token, title, body) {
    const message = {
      to: token,
      notification: {
        title: title,
        body: body,
      },
    };
    if (token) {
      fcm.send(message, function (err, response) {
        if (err) {
          console.error("Erreur lors de l'envoi de la notification :", err);
        } else {
          console.log("Notification envoyée avec succès :", response);
        }
      });
    }
  },
  async sendNotificationStream(token, title, body) {

    return new Promise((resolve, reject) => {
      const message = {
        to: token,
        notification: {
          title: title,
          body: body,
        },
      };
      if (token) {
        fcm.send(message, function (err, response) {
          if (err) {
            console.error("Erreur lors de l'envoi de la notification :", err);
            reject(err)
          } else {
            console.log("Notification envoyée avec succès :", response);
            resolve(response)
          }
        });
      }
    })
   
  }
}

