import React, { useEffect, useState, useRef } from 'react';
import { View, SafeAreaView, StyleSheet, Button, Alert, Text, Dimensions, TextInput, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { textDecorationColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { getTask } from '../components/Firebase/firebase';
import ColorsB from '../utils/colors.js'
import RangeSlider, { Slider } from 'react-native-range-slider-expo';
import EStyleSheet from 'react-native-extended-stylesheet';
import NextBackButton from '../components/NextBackButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { sendData } from '../components/Firebase/firebase';
import Dialog from "react-native-dialog";
import Spinner from '../components/Spinner';
const win = Dimensions.get('window');

export default function StartActivity({ route, navigation}) {
  EStyleSheet.build({ // always call EStyleSheet.build() even if you don't use global variables!

  });
const screen = route.params;

const [doc, setDocs] = useState([])
const { width, height } = Dimensions.get('window');
const [visibility, setVisibility] = useState()
const [text, setText] = useState('')
const [name, setName] = useState('emoticon-cool-outline')
const [value, setValue] = useState(0);
const [isLoading, setIsLoading] = useState(true)

const showDialog = (value) => {
  setVisibility(value)
};

useEffect(() => {
  if(value <2)
    setName('emoticon-cool-outline')
  else if(value >=2 && value < 4)
    setName('emoticon-happy-outline')
  else if(value >=4 && value < 6)
    setName('emoticon-neutral-outline')
  else if(value >=6 && value < 8)
    setName('emoticon-confused-outline')
  else
    setName('emoticon-angry-outline')
})
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


console.log("id: " + JSON.stringify(route))
useEffect(() => {
    const getDocs = async () => {
        let newDoc = await getTask(JSON.stringify(screen.topic), JSON.stringify(screen.id))
        setDocs(newDoc)
        setIsLoading(false)
    }
    getDocs()
}, [])



if (isLoading) {
  return <Spinner />;
}

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
                    {data.weekTitle ? <Text style={styles.weekTitle}>{data.weekTitle}</Text>:<></>}
                    {data.weekSubtitle ? <Text style={styles.weekSubtitle}>{data.weekSubtitle}</Text>:<></>}
                <View style={{ height:height*0.75, justifyContent:'center', alignContent:'center', top:'13%'}}>
                    {data.greenTitle ? data.greenTitle == "ZADANIE" ?<Text style={styles.greenTitle}><MaterialCommunityIcons name="square-edit-outline" color={"#ffffff"} size={50} />{data.greenTitle}</Text>:<Text style={styles.greenTitle} >{data.greenTitle}</Text>:<></>}
                    
                    {data.textInput ?   <TextInput
                                        multiline
                                        style={styles.input}
                                        placeholder={"Wpisz notatkę"}
                                        onChangeText={text => setText(text)}
                                      /> :<></>}
                    {data.icon ? <Text style={{textAlign:'center', marginTop:40}}><MaterialCommunityIcons name={data.icon} size={100} color={"#369e40"}/></Text>:<></>}                  
                    {data.greenSubtitle ?<Text style={styles.greenSubtitle}> {data.greenSubtitle} </Text> :<></>}
                    {data.greenSubtitleIt ?<Text style={styles.greenSubtitleIt} > {data.greenSubtitleIt} </Text>:<></>}
                    {data.subtitle ?<Text style={styles.subtitle} > {data.subtitle} </Text>: <></>}
                    {data.line ?<Text style={{ borderBottomColor: '#3d7849',
                                   borderBottomWidth: 6,
                                   justifyContent:'center',
 
                                   }}></Text>:<></>}
                    {data.list2 ?<FlatList
                          data={data.list2}
                          renderItem={({item}) =><Text style={styles.list}>{item}</Text>}/>:<></>}         
                    {data.subtitle2 ?<Text style={styles.subtitle}> {data.subtitle2} </Text>:<></>}
                
                    {data.slider ?<View style={styles.sliderView}><Slider min={0} max={10} step={1}
                         valueOnChange={value => setValue(value)}
                         initialValue={12}
                         knobColor='#808080'
                         valueLabelsBackgroundColor='grey'
                         inRangeBarColor='#b5b5b5'
                         outOfRangeBarColor='#808080'
                
                    /><Text style={{textAlign:'center'}}><MaterialCommunityIcons name={name} size={40} color={"#ffffff"}/></Text></View> : <></>}
                     {data.list ?<FlatList
                                    style={styles.flatlist}
                                    data={data.list}
                                    renderItem={({item}) => <Text  style={styles.list}>{item}</Text>}/>:<></>}
                    {data.subtitle3 ?<Text  style={styles.subtitle}> {data.subtitle3} </Text>: <></>}
                  
                    {data.subtitleIt ?<Text style={styles.subtitleIt}> {data.subtitleIt} </Text>: <></>}
                    {data.summary  ?<Text  style={styles.summary}> {data.summary} </Text> : <></>}
                 
                    {data.send  ?  <View style={{width:"50%", left:'25%'}}><NextBackButton title="Wyślij" onPress = {() => showDialog(true)}/></View> : <></>} 
                    {data.button1 ?
                        <View style={styles.parent}>
                            <NextBackButton  title={data.button1} onPress={() => navigation.navigate("Wyzwalacz")} />
                        </View>: <></>}
                  
                    {data.hint ?<Text style={styles.hint}> {data.hint} </Text> : <></>}
                    </View>
                    <Dialog.Container visible={visibility}>
                        <Dialog.Title>Zakończenie zadania</Dialog.Title>
                        <Dialog.Description>
                         Czy na pewno chcesz zakończyć zadanie?
                        </Dialog.Description>
                        <Dialog.Button label="Powrót" onPress={() => showDialog(false)}/>
                        <Dialog.Button label="Wyślij"  onPress={() => handleOnSend(data.id, text, value)}/>
                  </Dialog.Container>
                </View>
            )
            })
        }
        </ScrollView>
    </SafeAreaView>
    )
}

const styles = EStyleSheet.create({
  parent:{
    flexDirection:'row',
    justifyContent:'center',
    margin:'15%',
  },
  sliderView:{
    marginTop:'2%',
    width:'75%',
    marginHorizontal:"15%"
  },
    input: {
      height: win.height * 0.4,
      margin: '5%',
      marginVertical:'7%',
      borderWidth: 1,
      padding:'1rem',
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

    color: 'white',
    textAlign: 'center',
    fontSize:'1rem',
    fontFamily:'sans-serif-light',
    padding:'2%',

  },
    image: {
      width: 320,
      height: 100,
      marginVertical:140,
    },
    text: {
      color: 'white',
      textAlign: 'center',
      fontSize:'1rem',
      marginHorizontal: 12
  
    },
    title: {
      marginTop: '20%',
      fontSize:'1rem',
      color: 'white',
      textAlign: 'center',
      fontFamily:'sans-serif-light'
  
    },
    weekTitle: {
     position:'absolute',
      top: '6%',
      left: '5%',
      fontSize:'1rem',
      color: '#369e40',
      textAlign: 'left',
      fontFamily:'sans-serif'
  
    },
    weekSubtitle: {
      position:'absolute',
      top: '8%',
      left: '5%',
      fontSize:'1.1rem',
      color: '#369e40',
      textAlign: 'left',
      fontFamily:'sans-serif-medium',
  
    },
   greenTitle: {


      fontSize:'1.6rem',
      alignSelf:'center',
      color: '#369e40',
      textAlign: 'center',
      fontFamily:'sans-serif-medium',
      
 
    },
    subtitle: {
      fontSize:'0.9rem',
      color: 'white',
      textAlign: 'center',
      marginHorizontal:'6%',
      fontFamily:'sans-serif-light',
      padding:'2%',

    },
    subtitleIt: {
      fontSize:'1rem',
      color: 'white',
      textAlign: 'center',
      marginHorizontal:'5%',
      fontFamily:'sans-serif-light',
 
      fontStyle:'italic'
    },
    greenSubtitle: {
   

      color: '#369e40',
      textAlign: 'center',
      marginVertical:'10%',
      fontFamily:'sans-serif-medium',
      padding:30,
      backgroundColor: '#c2c2c2',
  
    },
    greenSubtitleIt: {
      color: '#369e40',
      textAlign: 'center',
      marginHorizontal:'15%',
      fontFamily:'sans-serif-medium',
      fontStyle:'italic'
  
    },
    summary: {
      fontSize:'0.9rem',
        color: 'white',
        textAlign: 'center',
        marginHorizontal:'7%',
        fontFamily:'sans-serif-light',
        marginTop:100,
         
      },
      hint: {
        color: 'white',
        textAlign: 'left',
        fontSize:'1rem',
        fontFamily:'sans-serif-light',
        marginTop:'15%',
        padding:'10%',
        width:'75%',
        backgroundColor: '#3d7849',

         
      }
  });
  