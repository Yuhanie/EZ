// db.collection("upload file").add({
//     id: 2,
//     name: "bbbb",
//     type: "png"
// })
// .then(function(docRef) {
//     console.log("新增成功，id 是"+docRef.id);
// })
// .catch(function(error) {
//     console.error("新增失敗原因： ", error);
// });

/////

// var db = firebase.firestore();
// db.collection("students").doc("image").set({
//     id: 3,
//     name: "cccc",
//     type: "pdf"
// })
// .then(function() {
//     console.log("新增成功");
// })

/////

// var db = firebase.firestore();
// var ref = db.collection('upload file').doc('image');

// ref.set({
//     id: 4,
//     name: "dddd",
//     type: "pdf"
// },{merge: true}).then(() => {
//   console.log('set data successful');
// });


/////
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: '### FIREBASE API KEY ###',
    authDomain: '### FIREBASE AUTH DOMAIN ###',
    databaseURL: '### DATABASE DOMAIN ###',
    projectId: '### CLOUD FIRESTORE PROJECT ID ###',
    appId: '### APP PROJECT ID ###'
  }
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)
  const db = firebase.firestore()

  db.collection('users')
  .add({
    id: 2,
    name: "bbbb",
    type: "png"
  })
  .then(function(docRef) {
    console.log('Document written with ID: ', docRef.id)
  })
  .catch(function(error) {
    console.error('Error adding document: ', error)
  })