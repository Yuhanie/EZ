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

//-------------------------------------------

// var db = firebase.firestore();
// db.collection("students").doc("image").set({
//     id: 3,
//     name: "cccc",
//     type: "pdf"
// })
// .then(function() {
//     console.log("新增成功");
// })

//-------------------------------------------

// var db = firebase.firestore();
// var ref = db.collection('upload file').doc('image');

// ref.set({
//     id: 4,
//     name: "dddd",
//     type: "pdf"
// },{merge: true}).then(() => {
//   console.log('set data successful');
// });

//-------------------------------------------

// Your web app's Firebase configuration
function getdb(){
alert("測試")

const firebaseConfig = {
  apiKey: "AIzaSyDpK9585Nist4dDRMyUbxf98APPUeF051g",
  authDomain: "ez-group-6808f.firebaseapp.com",
  projectId: "ez-group-6808f",
  storageBucket: "ez-group-6808f.appspot.com",
  messagingSenderId: "747617601049",
  appId: "1:747617601049:web:f158c5e83fadb3505a0c88",
  measurementId: "G-PGXTMCCV8T"
  }
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)
  const db = firebase.firestore()

  //console.log("a")
  db.collection('test')
  .add({
    id: 1,
    //name: "",
    //type: ""
  })
  .then(function(docRef) {
    console.log('Document written with ID: ', docRef.id)
  })
  .catch(function(error) {
    console.error('Error adding document: ', error)
  })
}
