
const admin = require("firebase-admin");

let credentialsFile = require("../../google-credentials.json");

admin.initializeApp({
  credential: admin.credential.cert(credentialsFile),
  databaseURL: "https://outrage-classifications.firebaseio.com"
});

let db = admin.firestore();
//console.log("DB", db) //> "Firestore" object

const collectionName = "classifications";
const documentName = "doc-20191116";
let doc = db.collection(collectionName).doc(documentName);
console.log("DOC", doc) //> "DocumentReference" object

var classification = {
  tweet_uuid: "tweet123",
  username: "user123",
  outrage: false
}
console.log(classification)
let classificationResponse = doc.set(classification);
console.log("RESPONSE", classificationResponse) //> "Promise" object

//db.collection('users').get()
//  .then((snapshot) => {
//    snapshot.forEach((doc) => {
//      console.log(doc.id, '=>', doc.data());
//    });
//  })
//  .catch((err) => {
//    console.log('Error getting documents', err);
//  });
