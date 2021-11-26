import React, { useEffect, useState, useRef } from 'react';
import { View, SafeAreaView, StyleSheet, Button, Alert, Text, Dimensions, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { textDecorationColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { getTask } from '../components/Firebase/firebase';
import ColorsB from '../utils/colors.js'
import BigSlider from 'react-native-big-slider'
import NextBackButton from '../components/NextBackButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { sendData } from '../components/Firebase/firebase';
import Dialog from "react-native-dialog";

export default function StartActivity({ route, navigation}) {

const screen = route.params;

const [doc, setDocs] = useState([])
const { width, height } = Dimensions.get('window');
const [visibility, setVisibility] = useState()
const [text, setText] = useState('')


const showDialog = (value) => {
  setVisibility(value)
};


let handleOnSend = async (doc, values) =>{
  console.log("topic" + doc)
  sendData(screen.topic, doc, values).then( () => {
    setVisibility(false)
    navigation.navigate('Home')
  })

 
}

console.log("id: " + JSON.stringify(route))
useEffect(() => {
    const getDocs = async () => {
        let newDoc = await getTask(JSON.stringify(screen.topic), JSON.stringify(screen.id))
        setDocs(newDoc)
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
                <View style={{ width, height }} >
                    {data.weekTitle ? <Text style={styles.weekTitle}>{data.weekTitle}</Text> : <></>}
                    {data.weekSubtitle ? <Text style={styles.weekSubtitle}>{data.weekSubtitle}</Text> : <></>}
                    {data.greenTitle ? data.greenTitle == "ZADANIE" ? <Text style={styles.greenTitle}><MaterialCommunityIcons name="square-edit-outline" color={"#ffffff"} size={50} />  {data.greenTitle}</Text>: <Text style={styles.greenTitle}>{data.greenTitle}</Text> : <></>}
                    
                    {data.textInput ?   <TextInput
                                        multiline
                                        style={styles.input}
                                        placeholder={"Wpisz notatkę"}
                                        onChangeText={text => setText(text)}
                                      /> : <></>}
                                      
                    {data.subtitle ? <Text style={styles.subtitle}> {data.subtitle} </Text> : <></>}
                    {data.line  ?<Text style={{ borderBottomColor: '#3d7849',
                                   borderBottomWidth: 6,
                                   justifyContent:'center',
                        
                                   
                                   }}></Text> : <></>}
                                   
                    {data.subtitle2 ?<Text style={styles.subtitle}> {data.subtitle2} </Text> : <></>}
                
                    {data.slider ? <BigSlider
                                        horizontal
                                        maximumValue={240}
                             
                                        style={{ backgroundColor: 'rgba(0,0,0,.7)', width: 40, marginBottom:160, marginTop:40, marginHorizontal:40, position:'absolute', top:height/4, height:200 }}
                                        trackStyle={{ backgroundColor: 'rgba(143, 255, 160, .7)' }}
                                        label=" "
                                        minimumValue={0} /> : <></>}
                   
                    {data.subtitle3 ?<Text style={styles.subtitle}> {data.subtitle3} </Text> : <></>}
                    {data.summary  ?<Text style={styles.summary}> {data.summary} </Text> : <></>}
                    {data.send  ?  <NextBackButton title="Wyślij" onPress = {() => showDialog(true)}/> : <></>} 
                    {data.button1 ?
                        <View style={styles.parent}>
                            <NextBackButton  title={data.button1} />
                            <NextBackButton title={data.button2} /> 
                        </View>: <></>}
                  
                    {data.hint ?<Text style={styles.hint}> {data.hint} </Text> : <></>}
                    <Dialog.Container visible={visibility}>
                        <Dialog.Title>Zakończenie zadania</Dialog.Title>
                        <Dialog.Description>
                         Czy na pewno chcesz zakończyć zadanie?
                        </Dialog.Description>
                        <Dialog.Button label="Powrót" onPress={() => showDialog(false)}/>
                        <Dialog.Button label="Wyślij"  onPress={() => handleOnSend(data.id, text)}/>
                  </Dialog.Container>
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
    justifyContent:'space-between',
    margin:30,
    marginTop:50
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
     
      top: 40,
      left: 20,
      fontSize: 16,
      color: '#369e40',
      textAlign: 'left',
      fontFamily:'sans-serif'
  
    },
    weekSubtitle: {
     
      top: 40,
      left: 20,
      fontSize: 20,
      marginBottom:40,
      color: '#369e40',
      textAlign: 'left',
      fontFamily:'sans-serif-medium'
  
    },
   greenTitle: {
     
      top: 40,

      fontSize: 30,
      marginBottom:40,
      color: '#369e40',
      textAlign: 'center',
      fontFamily:'sans-serif-medium'
  
    },
    subtitle: {
      fontSize: 16,
      color: 'white',
      textAlign: 'center',
      marginHorizontal:10,
      fontFamily:'sans-serif-light',
      padding:30
  
    },
    summary: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        marginHorizontal:30,
        fontFamily:'sans-serif-light',
        marginTop:280,
         
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
  