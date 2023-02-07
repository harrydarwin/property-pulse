const functions = require("firebase-functions");

const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

const SENDGRID_API_KEY = functions.config().sendgrid.key;

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(SENDGRID_API_KEY);

exports.firestoreEmail = functions.firestore
    .document("propertyPulseUsersDb47/{userId}")
    .onWrite((change, context) => {
      const userId = context.params.userId;

      const db = admin.firestore();

      return db.collection("propertyPulseUsersDb47").doc(userId)
          .get()
          .then((doc)=> {
            const user = doc.data();

            const msg = {
              to: user.email,
              from: "hellopropertypulse@gmail.com",
              subject: "Welcome, " + user.name,

              // custom template
              templateId: "d-afa8f01ffd4544c2b1682080d859b96e",
              substitutions: {
                name: user.name,
              },
            };

            return sgMail.send(msg);
          })
          .then(()=> console.log("Email sent!"))
          .catch((err) => console.log(err));
    });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
