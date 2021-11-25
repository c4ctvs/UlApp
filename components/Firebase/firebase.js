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
  db.collection("userInfo").doc(email).set({
    "firstLogin":true
  })

  for(let j=0; j<4; j++){
    db.collection("userInfo").doc(email).collection("tasks").doc(JSON.stringify(j)).set({
        "avaiable":false
    })
    for(let i=0; i<5; i++){
      db.collection("userInfo").doc(email).collection("tasks").doc(JSON.stringify(j)).collection("days").doc(JSON.stringify(i)).set({
        "avaiable":false,
        "done":false
      })
    }
}
db.collection("userInfo").doc(email).collection("tasks").doc(JSON.stringify(0)).set({
  "avaiable":true
})
db.collection("userInfo").doc(email).collection("tasks").doc(JSON.stringify(0)).collection("days").doc(JSON.stringify(0)).set({
  "avaiable":true,
  "done":false
})
}

export const firstLogin = async () => {
  let db = firebase.firestore();
  const user = firebase.auth().currentUser
  let query = await  db.collection("userInfo").doc(user.email).get()
  return query.data().firstLogin
}

export const getAvaiability = async (doc) => {
  let db = firebase.firestore();
  const user = firebase.auth().currentUser;
  let values = await db.collection("userInfo").doc(user.email).collection("tasks").doc(JSON.stringify(doc)).collection("days").get()
  let results = []

  values.forEach((doc) => {
    results.push(doc.data())

  })
  return results
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

export const getEmail = () => {
  const user = firebase.auth().currentUser;
  return user.email;
}

export const validateCodeTwo = async (code) => {
  let db = firebase.firestore();
  db.collection("registerCodes").get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {

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
export const sendData = async(topic, doc, data) =>{
  let db = firebase.firestore();
  const user = firebase.auth().currentUser;

  db.collection("userInfo").doc(user.email).collection("tasks").doc(JSON.stringify(topic)).collection("days").doc(doc).update({
    "data":data,
    "time": firebase.firestore.Timestamp.now(),
    "done":true
  })

  var d = new Date();

  d.setHours(24,0,0,0); 

  if(doc == 0){
    db.collection("userInfo").doc(user.email).collection("tasks").doc(JSON.stringify(topic)).collection("days").doc(JSON.stringify(1)).update({
      "time": firebase.firestore.Timestamp.fromDate(d)
    })
  }else if(doc == 1){
    db.collection("userInfo").doc(user.email).collection("tasks").doc(JSON.stringify(topic)).collection("days").doc(JSON.stringify(2)).update({
      "time": firebase.firestore.Timestamp.fromDate(d)
    })
  } else if(doc == 2){
    db.collection("userInfo").doc(user.email).collection("tasks").doc(JSON.stringify(topic)).collection("days").doc(JSON.stringify(3)).update({
      "time": firebase.firestore.Timestamp.fromDate(d)
    })
  }else if(doc == 3){
    db.collection("userInfo").doc(user.email).collection("tasks").doc(JSON.stringify(topic)).collection("days").doc(JSON.stringify(4)).update({
      "time": firebase.firestore.Timestamp.fromDate(d)
    })
  }

}


export const updateAv = async(doc) =>{
  let db = firebase.firestore();
  const user = firebase.auth().currentUser;
  let results = []
  let values = await db.collection("userInfo").doc(user.email).collection("tasks").doc(JSON.stringify(doc)).collection("days").get()

  values.forEach((doc) => {
    results.push(doc.data())
 
  })
  console.log(results)
  results.map((data) => {
   
    if(data.time <= firebase.firestore.Timestamp.now() && data.done == false){
      db.collection("userInfo").doc(user.email).collection("tasks").doc(JSON.stringify(doc)).collection("days").doc(data.id).update({
        "avaiable": true
      })
    }
  })
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
  return results
}



export const getTask = async (topic, day) =>{

  let db = firebase.firestore();
  let values = await db.collection("tasks").doc(topic).collection("days").doc(day).collection("pages").get()
  let results = []
  values.forEach((doc) => {
    results.push(doc.data())
  })
  return results
}
