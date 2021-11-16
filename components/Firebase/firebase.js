import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/firebase-storage';
import firebaseConfig from './firebaseConfig';



if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


export const auth = firebase.auth();

export const loginWithEmail = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

export const registerWithEmail = (email, password) =>{
  auth.createUserWithEmailAndPassword(email, password);

  let db = firebase.firestore();
  db.collection("userInfo").doc(email).collection("tasks").doc(0).set({
    avaiable:true
  })
  db.collection("userInfo").doc(email).collection("tasks").doc(1).set({
    avaiable:false
  })
  db.collection("userInfo").collection("tasks").doc(2).set({
    avaiable:false
  })
  db.collection("userInfo").collection("tasks").doc(3).set({
    avaiable:false
  })
}


export const checkIfUserIsLoggedIn = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log('user logged')
    }
  });
}

export const logout = () => auth.signOut();

export const passwordReset = email => auth.sendPasswordResetEmail(email);


export const validateCodeTwo = async (code) => {
  let db = firebase.firestore();
  db.collection("registerCodes").get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log("Val " + doc.data().Value + "Av" + doc.data().Avaiable)
        if (doc.data().Value == code && doc.data().Avaiable == true)
          return true
      });
    }).catch((err) => {
      console.log("Eror:" + err)
    })

  return false
}

export const validateCode = async (code) => {
  let db = firebase.firestore();

  let values = await db.collection("registerCodes").get()

  let validated = false
  values.forEach((doc)=>{
    let value = doc.data().Value
    let aval = doc.data().Avaiable
    if (value == code && aval == true)
      validated = true
  })
  return validated
}


export const getNamesOfCategories = async () => {
  let db = firebase.firestore();
  let result = []
  let temp = {}
  let i=0
  let avaiable = []
  const user = firebase.auth().currentUser;

  let values = await db.collection("categories").get()
  let isAvaiable = await db.collection("userInfo").doc(user.email).collection("tasks").get()

  isAvaiable.forEach((doc) => {
    console.log("A" + doc.data().avaiable)
    avaiable.push(doc.data().avaiable)
  })
  
  
  values.forEach((doc)=>{   
    let temp = {}
    temp.id = i
    temp.name = doc.data().Name
    temp.disabled = !avaiable[i]
    result.push(temp)
    i++
  })

  return result
}

export const getDescription = async (document) =>{
  let db = firebase.firestore();
  let values = await db.collection("taskDescription").doc(document).collection("pages").get()
  let results = []
  
  values.forEach((doc) => {
    results.push(doc.data())

  })
  return results
}


export const getDays = async (document) =>{
  let db = firebase.firestore();
  let values = await db.collection("tasks").doc(document).collection("days").get()
  
  let results = []
  
  values.forEach((doc) => {
    results.push(doc.data())

  })

  return results
}


export const getTitle = async (document) =>{
  console.log("Halo getTitle nie dziala jak cos")
  let db = firebase.firestore();
  let values = await db.collection("tasks").doc(document).get()
  let results = []
  values.forEach((doc) => {
    console.log("A" + doc.data())
    results.push(doc.data())

  })
  console.log("results:", results)
  return results
}



export const getTask = async (document, day) =>{
  console.log("Halo getTitle nie dziala jak cos")
  let db = firebase.firestore();
  let values = await db.collection("tasks").doc(document).collection("days").doc(day).collection("pages").get()
  let results = []
  values.forEach((doc) => {
    console.log("A" + doc.data())
    results.push(doc.data())

  })
  console.log("results:", results)
  return results
}
