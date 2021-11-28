import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, Alert, Text, ScrollView, Dimensions } from 'react-native';
import useStatusBar from '../hooks/useStatusBar';
import SafeView from '../components/SafeView';
import Colors from '../utils/colors';
import NextBackButton from '../components/NextBackButton';
import { sendPretest } from '../components/Firebase/firebase';
import AppButton from '../components/AppButton';
import RangeSlider, { Slider } from 'react-native-range-slider-expo';
const { width, height } = Dimensions.get('window');

const doc = [
  {
    greenTitle:"PRETEST",
    subtitle: ' Przed rozpoczęciem pracy z aplikacją, zapraszamy Cię do ustosunkowania się do kilku ważnych dla nas stwierdzeń, co pozwoli nam wspólnie określić, czy i na ile nasza wspólna praca jest dla Ciebie wspierająca i monitorować zmiany w Twoim funkcjonowaniu.  ',
    subtitle2: ' Po 30 dniach poprosimy Cię o ponowne udzielenie odpowiedzi do tych samych stwierdzeń, a w tak zwanym międzyczasie będziemy podsyłać pojedyncze pytania o Twój stan i nastawienie. ',
    subtitle3:'Zachęcamy do udzielenia odpowiedzi szybko, bez specjalnego zastanawiania się. ',

  },
  {
    greenText:"Pytanie 1 z 12",
    summary: 'Mam jasną i precyzyjną umowę pomiędzy mną a innymi domownikami, określającą nasze zadania, odpowiedzialności, co pozwala mi efektywnie dbać o siebie, swoją pracę, i inne zobowiązania w domu i pracy. ',
    slider:'true'
 
  },
  {
    greenText:"Pytanie 2 z 12",
    summary:'Mam jasną i precyzyjną umowę pomiędzy mną a moimi współpracownikami, określającą nasze zadania, odpowiedzialności, co pozwala mi efektywnie dbać o siebie, swoją prace, i inne zobowiązania w domu i w pracy. ',
    slider:'true'
  },
  {
    greenText:"Pytanie 3 z 12",
    summary:'Moje cechy i kompetencje pozwalają mi efektywnie wywiązywać się z różnych zadań w życiu osobistym. ',
    slider:'true'
  },
  {
    greenText:"Pytanie 4 z 12",
    summary:'Moje cechy i kompetencje pozwalają mi efektywnie wywiązywać się z różnych zadań w życiu zawodowym. ',
    slider:'true'
  },
  {
    greenText:"Pytanie 5 z 12",
    summary:'Dobrze radzę sobie w sytuacjach trudnych (w tym trudnych rozmowach) z innymi domownikami. ',
    slider:'true'
  },
  {
    greenText:"Pytanie 6 z 12",
    summary:'Dobrze radzę sobie w sytuacjach trudnych (w tym trudnych rozmowach) z moimi współpracownikami. ',
    slider:'true'
  },
  {
    greenText:"Pytanie 7 z 12",
    summary:'Potrafię efektywnie regulować swoje trudne emocje w domu. ',
    slider:'true'
  },
  {
    greenText:"Pytanie 8 z 12",
    summary:'Potrafię efektywnie regulować swoje trudne emocje w pracy. ',
    slider:'true'
  },
  {
    greenText:"Pytanie 9 z 12",
    summary:'Potrafię odpowiednio reagować na trudne emocje innych domowników. ',
    slider:'true'
  },
  {
    greenText:"Pytanie 10 z 12",
    summary:'Potrafię odpowiednio reagować na trudne emocje moich współpracowników. ',
    slider:'true'
  },
  {
    greenText:"Pytanie 11 z 12",
    summary:'Mój poziom stresu i napięcia w domu jest wysoki. ',
    slider:'true'
  }
  ,
  {
    greenText:"Pytanie 12 z 12",
    summary:'Mój poziom stresu i napięcia w pracy jest wysoki.  ',
    slider:'true',
    send:'true'
  }
];


let handleOnSend = async (navigation) =>{
  sendPretest().then( () => {
    navigation.navigate('Home')
  })

 
}


export default function PretestScreen({navigation}) {
  const [value, setValue] = useState(0);
  return (
    <SafeView style={styles.container}>
   
   <ScrollView  
          horizontal={true}
          scrollEventThrottle={16}
          pagingEnabled={true}
          showsVerticalScrollIndicator={true}

          >
        {
            doc.map((data) => {
            return(
                <View style={{ width, height ,justifyContent: 'center'}} >
                    {data.weekTitle ? <Text style={styles.weekTitle}>{data.weekTitle}</Text> : <></>}
                    {data.weekSubtitle ? <Text style={styles.weekSubtitle}>{data.weekSubtitle}</Text> : <></>}
                    {data.greenText ? <Text style={styles.greenText}>{data.greenText}</Text> : <></>}
                    {data.greenTitle ? <Text style={styles.greenTitle}>{data.greenTitle}</Text> : <></>}
                    
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
                    {data.subtitle3 ?<Text style={styles.subtitle}> {data.subtitle3} </Text> : <></>}
                  
                         
                    {data.slider ?  <View style={styles.sliderView}><Slider min={0} max={10} step={1}
                         valueOnChange={value => setValue(value)}
                         initialValue={12}
                         knobColor='#369e40'
                         valueLabelsBackgroundColor='grey'
                         inRangeBarColor='grey'
                         outOfRangeBarColor='#369e40'
                
                    /></View>:<></>}
                    
                    {data.summary  ?<Text style={styles.summary}> {data.summary} </Text> : <></>}
                    {data.send  ? <View style={{position:'absolute', bottom:'25%',width:'50%', left:'25%'}}><NextBackButton title="Zakończ" onPress={() => handleOnSend(navigation)}/></View> : <></>} 
             
             
                </View>
            )
            })
        }
        </ScrollView>

    </SafeView>
    
    )
}
const styles = StyleSheet.create({
  sliderView:{
    marginTop:40,
    width:'75%',
    marginHorizontal:"15%"
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  logoutButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
  },
  menuButton:{
    margin:30,
    padding:20
  },
  buttons:{
    fontSize:12,
  }, 
  greenTitle: { 
    fontSize: 22,
    marginBottom:'10%',
    color: '#369e40',
    textAlign: 'center',
    fontFamily:'sans-serif-medium'

  },
  greenText: { 
    position:'absolute',
    top:'5%',
    fontSize: 20,
    color: '#369e40',
    textAlign:'right',
    margin:'5%',
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
      marginTop:50,
  },
});


var customStyles8 = StyleSheet.create({
  container: {
    height: 30,
  },
  track: {
    height: 2,
    backgroundColor: '#303030',
  },
  thumb: {
    width: 100,
    height: 100,
    backgroundColor: '#31a4db',
    borderRadius: 10 / 2,
    shadowColor: '#31a4db',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 2,
    shadowOpacity: 1,
  }
});