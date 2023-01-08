function getdb(){
alert("成功!")

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
  //db.collection('file').doc('image').set({
  db.collection('file')
  .add({
    id: 3,
    name: "cccc",
    type: "pdf"
  })
  .then(function(docRef) {
    console.log('Document written with ID: ', docRef.id)
  })
  .catch(function(error) {
    console.error('Error adding document: ', error)
  })
}
