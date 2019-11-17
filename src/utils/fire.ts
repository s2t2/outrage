
const admin = require("firebase-admin");

let credentialsFile = require("../../google-credentials.json");

admin.initializeApp({
  credential: admin.credential.cert(credentialsFile),
  databaseURL: "https://outrage-classifications.firebaseio.com"
});

let db = admin.firestore();
//console.log("DB", db) //> "Firestore" object

const collectionName = "classifications";
let collectRef = db.collection(collectionName)
console.log("COLLECTION", collectRef) //> "______" object

const documentName = "doc-20191116";
let docRef = collectRef.doc(documentName);
console.log("DOC", docRef) //> "DocumentReference" object

var classification = {
  tweet_uuid: "tweet123",
  username: "user123",
  outrage: false,
  classified_at: new Date().toISOString() //.getTime
}
console.log("RECORD", classification)
let classificationResponse = docRef.set(classification);
console.log("RESPONSE", classificationResponse) //> "Promise" object

docRef.get()
  .then((doc) => {
    console.log("FETCHED A DOCUMENT")
    console.log(doc)
    console.log("DOCUMENT ID", doc.id)
    console.log("DOCUMENT DATA", doc.data());
  })
  .catch((err) => {
    console.log("DOCUMENT RETRIEVAL ERROR", err);
  });




//db.collection('users').get()
//  .then((snapshot) => {
//    snapshot.forEach((doc) => {
//      console.log(doc.id, '=>', doc.data());
//    });
//  })
//  .catch((err) => {
//    console.log('Error getting documents', err);
//  });


//collectRef.on("value", (snapshot) => {
//  console.log("SNAPSHOT", snapshot.val());
//});
//
//usersRef.orderByKey().on('child_added', function(snap) {
//  console.log(snap.getKey(), snap.val());
//});




//var citiesRef = db.collection("cities");
//
//citiesRef.doc("SF").set({
//    name: "San Francisco", state: "CA", country: "USA",
//    capital: false, population: 860000,
//    regions: ["west_coast", "norcal"] });
//
//citiesRef.doc("LA").set({
//    name: "Los Angeles", state: "CA", country: "USA",
//    capital: false, population: 3900000,
//    regions: ["west_coast", "socal"] });
//
//citiesRef.doc("DC").set({
//    name: "Washington, D.C.", state: null, country: "USA",
//    capital: true, population: 680000,
//    regions: ["east_coast"] });
//
//citiesRef.doc("TOK").set({
//    name: "Tokyo", state: null, country: "Japan",
//    capital: true, population: 9000000,


//citiesRef.where("state", "==", "CA")
//citiesRef.where('country', 'in', ["USA", "Japan", "China"])
//citiesRef.where("country", "==", "USA").orderBy("population", "asc")
