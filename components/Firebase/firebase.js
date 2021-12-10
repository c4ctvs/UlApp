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
    "firstLogin":true,
    "wyzwalacze": [{0:'0', a:'a'}]
  })

  db.collection("userInfo").doc(email).collection("tasks").doc(JSON.stringify(0)).set({
    "avaiable":true,
    "time": firebase.firestore.Timestamp.now(),
  })
  var d = new Date();

  d.setHours(24,0,0,0); 
  for(let j=1; j<4; j++){
    if(j==1)
      d = new Date(d.getTime() + 6 * 24 * 60 * 60 * 1000)
    else
      d = new Date(d.getTime() + 6 * 24 * 60 * 60 * 1000)

      db.collection("userInfo").doc(email).collection("tasks").doc(JSON.stringify(j)).set({
        "avaiable":false,
        "time":firebase.firestore.Timestamp.fromDate(d)
    })
    
  }

  for(let j=0; j<4; j++){
    for(let i=0; i<5; i++){
      if(i==0 && j==0)
      {
        db.collection("userInfo").doc(email).collection("tasks").doc(JSON.stringify(0)).collection("days").doc(JSON.stringify(0)).set({
          "avaiable":true,
          "done":false,
          "day":i,
          "week":j,
        })
      }else{
      db.collection("userInfo").doc(email).collection("tasks").doc(JSON.stringify(j)).collection("days").doc(JSON.stringify(i)).set({
        "avaiable":false,
        "done":false,
        "day":i,
        "week":j,
      })
    }
    }
  }

}
const reauthenticate = async (currentPassword) => {
  var user = firebase.auth().currentUser;
  var cred = firebase.auth.EmailAuthProvider.credential(
      user.email, currentPassword);
  let re = await user.reauthenticateWithCredential(cred);

  return re
}
export const changePassword = async (data) => {
    let currentPassword = data.oldPassword
    let newPassword = JSON.stringify(data.newPassword)
    console.log("new" + newPassword)
    reauthenticate(currentPassword).then(() => {
      var user = firebase.auth().currentUser;
      user.updatePassword(newPassword).then(() => {
        return "Haslo zostalo zmienione!";
      }).catch((error) => {console.log(error); return "W formularzu są błędy, spróbuj ponownie"; })
    }).catch((error) => {console.log(error); return "W formularzu są błędy, spróbuj ponownie"; });
  }
 

export const getUserData = async (topic, doc) => {
  let db = firebase.firestore();
  const user = firebase.auth().currentUser;
  let values = await db.collection("userInfo").doc(user.email).collection("tasks").doc(topic).collection("days").get(doc)
  let results = []
  values.forEach((doc) => {
    results.push(doc.data())

  })

  return results
}

export const findQuestion = async() =>{
  let db = firebase.firestore();
  const user = firebase.auth().currentUser;
  let x, y;
  let found = false;
  x=99
  y=99
  let i=0
  for(let j=0; j<4; j++){
     let values = await db.collection("userInfo").doc(user.email).collection("tasks").doc(JSON.stringify(j)).collection("days").get()
     values.forEach((doc) =>{
       if(doc.data().firstLoginToday == true){
          x = j
          y = i
          found = true
          return;
        }
        if(found == true)
          return;
        i=i+1
     })
     if(found == true)
     return [x,y];
     i=0
    }
  
  return [x, y]
}


export const getQuestions = async (document, day) =>{
    let db = firebase.firestore()
 
    let values = await db.collection("questions").doc(JSON.stringify(document)).collection("days").doc(JSON.stringify(day)).collection("pages").get()
    let results = []
    values.forEach((doc) => {
      results.push(doc.data())
  
    })
    return results
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

export const sendZasobki = async(week, day, ilosc) =>{
  let db = firebase.firestore();
  const user = firebase.auth().currentUser;

  let zasobki = await db.collection("userInfo").doc(user.email).get()
  zasobki = zasobki.data().zasobki
  zasobki = parseInt(zasobki)
  db.collection("userInfo").doc(user.email).collection("tasks").doc(JSON.stringify(week)).collection("days").doc(JSON.stringify(day)).update({
    "askedQuestion":true,
  })

  db.collection("userInfo").doc(user.email).update({
    "zasobki":parseInt(zasobki + ilosc),
  })
}

export const getZasobki = async() =>{
  let db = firebase.firestore();
  const user = firebase.auth().currentUser;

  let zasobki  = await db.collection("userInfo").doc(user.email).get()

  zasobki = zasobki.data().zasobki
  return zasobki
}

export const sendWyzwalacze = async(values) =>{
  let db = firebase.firestore();
  const user = firebase.auth().currentUser;

  db.collection("userInfo").doc(user.email).update({
    "wyzwalacze":values,
  })

}


export const getWyzwalacze = async() =>{
  let db = firebase.firestore();
  const user = firebase.auth().currentUser;
  let wyzwalacze =[]
  wyzwalacze = await db.collection("userInfo").doc(user.email).get()
  console.log(wyzwalacze.data())
  return wyzwalacze.data().wyzwalacze
}


export const sendData = async(topic, doc, data) =>{
  let db = firebase.firestore();
  const user = firebase.auth().currentUser;

  db.collection("userInfo").doc(user.email).collection("tasks").doc(JSON.stringify(topic)).collection("days").doc(doc).update({
    "data":data.data,
    'value':data.value,
    "time": firebase.firestore.Timestamp.now(),
    "done":true,
  })

  var d = new Date();

  d.setHours(24,0,0,0); 

  if(doc == 0){
    db.collection("userInfo").doc(user.email).collection("tasks").doc(JSON.stringify(topic)).collection("days").doc(JSON.stringify(1)).update({
      "time": firebase.firestore.Timestamp.fromDate(d),
      "askedQuestion":false
    })
  }else if(doc == 1){
    db.collection("userInfo").doc(user.email).collection("tasks").doc(JSON.stringify(topic)).collection("days").doc(JSON.stringify(2)).update({
      "time": firebase.firestore.Timestamp.fromDate(d),
      "askedQuestion":false
    })
  } else if(doc == 2){
    db.collection("userInfo").doc(user.email).collection("tasks").doc(JSON.stringify(topic)).collection("days").doc(JSON.stringify(3)).update({
      "time": firebase.firestore.Timestamp.fromDate(d),
      "askedQuestion":false
    })
  }else if(doc == 3){
    db.collection("userInfo").doc(user.email).collection("tasks").doc(JSON.stringify(topic)).collection("days").doc(JSON.stringify(4)).update({
      "time": firebase.firestore.Timestamp.fromDate(d),
      "askedQuestion":false
    })
  }
  else if(doc == 4){
    let num = parseInt(topic) + 1
    console.log(num)
    db.collection("userInfo").doc(user.email).collection("tasks").doc(JSON.stringify(num)).collection("days").doc(JSON.stringify(0)).update({
      "time": firebase.firestore.Timestamp.fromDate(d),
      "askedQuestion":false
    })
  }


  let zasobki = await db.collection("userInfo").doc(user.email).get()
  zasobki = zasobki.data().zasobki
  if(zasobki){
    zasobki = parseInt(zasobki)
  db.collection("userInfo").doc(user.email).update({
    "zasobki":parseInt(zasobki + 2),
  })}
  else{
    db.collection("userInfo").doc(user.email).update({
      "zasobki":2,
    })
  }

}

export const sendPretest = async(data) =>{
  let db = firebase.firestore();
  const user = firebase.auth().currentUser;

  db.collection("userInfo").doc(user.email).update({
    "firstLogin":false
  })
}



export const isFirstLoginToday = async(doc) =>{
  let db = firebase.firestore();
  const user = firebase.auth().currentUser;
  let day, week = 99;
  let results = []
  let values = await db.collection("userInfo").doc(user.email).collection("tasks").doc(JSON.stringify(doc)).collection("days").get()

  values.forEach((doc) => {
    results.push(doc.data())

  })

  
  for(let i=0; i<results.length; i++){
    if(results[i].time <= firebase.firestore.Timestamp.now() && results[i].askedQuestion == false){
      day = results[i].day
      week = results[i].week
      break;
    }
  }
  return [week, day]
}

export const updateAv = async(doc) =>{
  let db = firebase.firestore();
  const user = firebase.auth().currentUser;
  let results = []
  let values = await db.collection("userInfo").doc(user.email).collection("tasks").doc(JSON.stringify(doc)).collection("days").get()

  values.forEach((doc) => {
    results.push(doc.data())
 
  })
  let i=0
  results.map((data) => {
    if(data.time <= firebase.firestore.Timestamp.now() && data.done == false){
      db.collection("userInfo").doc(user.email).collection("tasks").doc(JSON.stringify(doc)).collection("days").doc(JSON.stringify(i)).update({
        "avaiable": true
      })
  
    }
    i=i+1
  })
}

export const firstLoginToday = async () =>{
  let db = firebase.firestore();
  const user = firebase.auth().currentUser;
  let results = []
  for(let i=0; i<5; i++){
  let values = await db.collection("userInfo").doc(user.email).collection("tasks").doc(JSON.stringify(i)).collection("days").get()

  values.forEach((doc) => {
    results.push(doc.data())
  })
  results.map((data) => {
    if(data.time <= firebase.firestore.Timestamp.now() && data.done == true && data.firstLoginToday == true){
        return true
    }
  })
}
  return false
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
    temp.name = doc.data().Name
    temp.id = doc.data().id
    
  console.log(temp.id)
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
