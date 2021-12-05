import React, { useEffect, useState, useRef } from 'react';
import { View, SafeAreaView, StyleSheet, Button, Alert, Text, Dimensions, TextInput, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { getQuestions, findQuestion } from '../components/Firebase/firebase';
import ColorsB from '../utils/colors.js'
import NextBackButton from '../components/NextBackButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { sendData } from '../components/Firebase/firebase';
import Spinner from '../components/Spinner';


export default function FLoginToday({ route, navigation}) {

const screen = route.params;

const [doc, setDocs] = useState([])
const [question, setQuestion] = useState([])
const { width, height } = Dimensions.get('window');

let handleOnSend = async (doc, data, value) =>{
  console.log("topic" + doc)
  let values = {data:data,
                value: value}
  setIsLoading(true)
  sendData(screen.topic, doc, values).then( () => {
    setVisibility(false)
    navigation.navigate('Home')
  })
 
}

useEffect(() =>{
    const getQue = async () => {
        let que = await findQuestion()
        setQuestion(que)
    }
    getQue()
    
}, [])


useEffect(() => {
    console.log("AAAAAAAAAAAAAAA" +question[0] +question[1])
    const getDocs = async () => {
        let newDoc = await getQuestions(question[0], question[1])
        setDocs(newDoc)
        setIsLoading(false)
    }
    getDocs()

}, [])



return(
    <SafeAreaView style={{   justifyContent: 'center',alignItems: 'center',flex: 1,  backgroundColor: ColorsB.background}}>
        <ScrollView  
          horizontal={true}
          scrollEventThrottle={16}
          pagingEnabled={true}
          showsVerticalScrollIndicator={true}

          >
        {
            doc.map((data) => {
            return(
                console.log("WYNIK" + data),
                <View style={{ width, height }} >
                
                    {data.greenTitle ? data.greenTitle == "ZADANIE" ? <Text style={styles.greenTitle}><MaterialCommunityIcons name="square-edit-outline" color={"#ffffff"} size={50} />  {data.greenTitle}</Text>: <Text style={styles.greenTitle}>{data.greenTitle}</Text> : <></>}
                    {data.greenSubtitle ? <Text style={styles.greenSubtitle}> {data.greenSubtitle} </Text> : <></>}
                    {data.greenSubtitleIt ? <Text style={styles.greenSubtitleIt}> {data.greenSubtitleIt} </Text> : <></>}
                    {data.subtitle ? <Text style={styles.subtitle}> {data.subtitle} </Text> : <></>}
                    {data.subtitle2 ?<Text style={styles.subtitle}> {data.subtitle2} </Text> : <></>}
                    {data.subtitle3 ?<Text style={styles.subtitle}> {data.subtitle3} </Text> : <></>}
                    {data.send  ?  <View style={{width:"50%", left:'25%'}}><NextBackButton title="Wyślij" onPress = {() => showDialog(true)}/></View> : <></>} 
                    {data.button1 ?
                        <View style={styles.parent}>
                            <NextBackButton  title={data.button1} onPress={() => navigation.navigate("Wyzwalacz")} />
                            <NextBackButton  title={data.button2} onPress={() => navigation.navigate("Wyzwalacz")} />
                        </View>: <></>}
                  
                    {data.hint ?<Text style={styles.hint}> {data.hint} </Text> : <></>}
                
                </View>
            )
            })
        }
        </ScrollView>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  parent:{
    flexDirection:'row',
    justifyContent:'center',
    margin:30,
    marginTop:50
  },
  sliderView:{
    marginTop:40,
    width:'75%',
    marginHorizontal:"15%"
  },
  buttons:{
    position:'absolute',
    bottom:20,
    flexDirection:'row',
    justifyContent:'space-between',
    
  },
    input: {
      height: 300,
      margin: 12,
      marginVertical:30,
      borderWidth: 1,
      padding: 10,
      backgroundColor: ColorsB.lightGrey
    },
    
    wyzwalaczbuttons:{
      width:'30%',

  },
  flatlist:{
    top:'10%',
    padding:0,
  },
  list:{
    fontSize: 16,
    color: 'white',
    textAlign: 'center',

    fontFamily:'sans-serif-light',
    padding:10,

  },
    image: {
      width: 320,
      height: 100,
      marginVertical:140,
    },
    text: {
      color: 'white',
      textAlign: 'center',
      fontSize: 16,
      marginHorizontal: 12
  
    },
    title: {
      marginTop: 120,
      fontSize: 16,
      color: 'white',
      textAlign: 'center',
      fontFamily:'sans-serif-light'
  
    },
    weekTitle: {
     position:'absolute',
      top: 40,
      left: 20,
      fontSize: 16,
      color: '#369e40',
      textAlign: 'left',
      fontFamily:'sans-serif'
  
    },
    weekSubtitle: {
      position:'absolute',
      top: '7%',
      left: 20,
      fontSize: 18,
  
      color: '#369e40',
      textAlign: 'left',
      fontFamily:'sans-serif-medium'
  
    },
   greenTitle: {


      fontSize: 30,
      alignSelf:'center',
      color: '#369e40',
      textAlign: 'center',
      fontFamily:'sans-serif-medium',
      
 
    },
    subtitle: {
      fontSize: 16,
      color: 'white',
      textAlign: 'center',
      marginHorizontal:10,
      fontFamily:'sans-serif-light',
      padding:30,

    },
    subtitleIt: {
      fontSize: 16,
      color: 'white',
      textAlign: 'center',
      marginHorizontal:10,
      fontFamily:'sans-serif-light',
 
      fontStyle:'italic'
    },
    greenSubtitle: {
   
      fontSize: 16,
      color: '#369e40',
      textAlign: 'center',
      marginVertical:40,
      fontFamily:'sans-serif-medium',
      padding:30,
      backgroundColor: '#c2c2c2',
  
    },
    greenSubtitleIt: {
      fontSize: 16,
      color: '#369e40',
      textAlign: 'center',
      marginHorizontal:40,
      fontFamily:'sans-serif-medium',
      fontStyle:'italic'
  
    },
    summary: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        marginHorizontal:30,
        fontFamily:'sans-serif-light',
        marginTop:100,
         
      },
      hint: {
        fontSize: 16,
        color: 'white',
        textAlign: 'left',
       
        fontFamily:'sans-serif-light',
        marginTop:20,
        padding:30,
        width:'75%',
        backgroundColor: '#3d7849',

         
      }
  });
  