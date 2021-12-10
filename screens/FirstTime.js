import React, { useEffect, useState, useRef } from 'react';
import { View, SafeAreaView, StyleSheet, Button, Alert, Text, Dimensions, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { textDecorationColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { getDescription } from '../components/Firebase/firebase';
import ColorsB from '../utils/colors.js'
import NextBackButton from '../components/NextBackButton'
import AppButton from '../components/AppButton';
import EStyleSheet from 'react-native-extended-stylesheet';

export default function DescriptionScreen({ route, navigation}) {
  EStyleSheet.build({ // always call EStyleSheet.build() even if you don't use global variables!

  });
const screen = route.params;
const { width, height } = Dimensions.get('window');
const data = [
    {
      subtitle: 'Cześć! \n Cieszę się, że bierzesz udział w naszym \n PROGRAMIE ROZWOJOWYM.',
      image: require('../assets/temp.png'),
      text: ' Chcę wesprzeć Cię w radzeniu sobie z wymaganiami związanymi z pracą zdalną, godzeniem życia zawodowego z życiem prywatnym oraz zmniejszeniu napięć, które wiążą się ze zmianami, których doświadczasz. ',
      bg: Colors.background,
    },
    {
      title: 'Przez najbliższych',
      greenTitle:'30 dni',
      secondtitle:' będziesz otrzymywać wiadomości,\n\n',
      secondsubtitle: ' które dostarczą Ci użytecznych metod i pomysłów, co robić, aby jeszcze lepiej układać relacje między pracą a domem w rzeczywistości zdalnej i bardziej zadbać o siebie i swoją rodzinę. ',
      bg: Colors.background,
    },
    {
      subtitle: 'W wiadomościach znajdziesz przydatne informacje, techniki i działania, dotyczące takich tematów, jak:',
      circleTextTitlea: "KONTRAKTOWANIE",
      circleTexta:"i umawianie się z innymi tak, aby wywiązać się ze zobowiązań zawodowych  i domowych",
      circleTextTitleb:"RADZENIE SOBIE W SYTUACJACH TRUDNYCH",
      circleTextb: " i konfliktowych, tak aby zadbać o dobre relacje",
      circleTextTitlec:"RADZENIE SOBIE Z EMOCJAMI ",
      circleTextc: "i napięciem",
      circleTextTitled:"BUDOWANIE POCZUCIA WŁASNEJ SKUTECZNOŚCI",
      circleTextd: "i efektywności osobistej",
      bg: Colors.background,
    },
    {
      bg: Colors.background,
      description1:'W każdej wiadomości zaproszę Cię  do krótkich ZADAŃ związanych z zapisaniem najważniejszych wniosków, przyjrzeniem się wybranej sytuacji, wypróbowaniem przedstawionej techniki w praktyce. ​ ',
      description2:'TO TY WYBIERZESZ, które z prezentowanych elementów są dla Ciebie ważne i które z nich zechcesz wykorzystać dla siebie. Zachęcam Cię do zapoznania się z treścią wszystkich wiadomości i wykonania wszystkich zadań. ​ ',
    },
    {
      bg: Colors.background,
      text:'Abyś mógł śledzić swoje postępy, proszę Cię o odpowiedź na kilka krótkich pytań dotyczących napięcia, które odczuwasz w różnych sytuacjach życiowych.  ',
      button:"ODPOWIEDZ NA PYTANIA"
    }
  ];

return(
    <SafeAreaView style={{   justifyContent: 'center',alignItems: 'center',flex: 1,  backgroundColor: ColorsB.background}}>
        <ScrollView  
          horizontal={true}
          scrollEventThrottle={16}
          pagingEnabled={true}
          
          >
        {
            data.map((item) => {
            return(
                <View style={{ width, height, justifyContent: 'center',flex: 1 }} >
                {item.title ?  <Text style={styles.title}>{item.title}</Text> : <></>}
                {item.greenTitle? <Text style={styles.greenTitle}>{item.greenTitle}</Text> : <></>}
                {item.secondtitle ? <Text style={styles.secondtitle}>{item.secondtitle}</Text> : <></>}
                {item.subtitle ? <Text style ={styles.subtitle}> {item.subtitle} </Text>: <></>}
                {item.secondsubtitle ? <Text style ={styles.secondsubtitle}> {item.secondsubtitle} </Text>: <></>}
                
           
                {item.circleTexta ?<View style={{marginHorizontal:'5%',alignSelf:'flex-start', padding:'1.5%', marginVertical:5,backgroundColor:'#133f63', borderRadius:100, width:'75%'}}><Text style ={styles.circleTitlea}> {item.circleTextTitlea} </Text><Text style ={styles.circleTexta}> {item.circleTexta}</Text></View>: <></>}

          
                {item.circleTextb ?<View style={{marginHorizontal:10,alignSelf:'flex-end',padding:'1.5%',marginVertical:5,backgroundColor:'#133f63', borderRadius:100, width:'75%'}}><Text style ={styles.circleTitleb}> {item.circleTextTitleb} </Text><Text style ={styles.circleTextb}> {item.circleTextb} </Text></View>: <></>}


                {item.circleTextc ?<View style={{marginHorizontal:10,alignSelf:'flex-start',padding:'1.5%',marginVertical:5,backgroundColor:'#133f63', borderRadius:100, width:'75%'}}><Text style ={styles.circleTitlea}> {item.circleTextTitlec} </Text><Text style ={styles.circleTexta}> {item.circleTextc} </Text></View>: <></>}


                {item.circleTextc ?<View style={{marginHorizontal:10,alignSelf:'flex-end',padding:'1.5%',marginVertical:5,backgroundColor:'#133f63', borderRadius:100, width:'75%'}}><Text style ={styles.circleTitleb}>{item.circleTextTitled}</Text><Text style ={styles.circleTextb}>{item.circleTextd}</Text></View>: <></>}

                {item.image ? <Image source={item.image} style={styles.image}  />: <></>}
                {item.text ? <Text style={styles.text}>{item.text}</Text>: <></>}

                {item.description1 ? <Text style={styles.description1}>{item.description1}</Text> : <></>}
                {item.description1 ? <Text style={styles.description2}>{item.description2}</Text> : <></>}
                {item.button ?<View style={{alignSelf:'center',width:'75%', marginTop:'15%'}}><AppButton title={item.button} color={"white"}  onPress={()=>navigation.navigate("Pretest")}/></View>: <></>}
                  
                </View>
            )
            })
        }
        </ScrollView>
    </SafeAreaView>
    )
}

const styles = EStyleSheet.create({
    slide: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'blue',
    },
    image: {
      width: 320,
      height: 100,
      marginVertical:'12%',
    },
    text: {
      color: 'white',
      textAlign: 'center',
      fontSize: '1rem',
      marginHorizontal: '5%'
  
    },
    title: {
      fontSize: '1.3rem',
      color: 'white',
      textAlign: 'center',
  
    },
    greenTitle: {
      fontSize: '2.2rem',
      color: 'green',
      textAlign: 'center',
  
    },
    subtitle: {
      fontSize: '1rem',
      color: 'white',
      textAlign: 'center',
      marginHorizontal:'15%',
      marginBottom:'1%'
  
    },
    secondsubtitle:{
      fontSize: '1rem',
      color: 'white',
      marginHorizontal:'15%',
      textAlign: 'center',
    },
    secondtitle: {
      fontSize: '1.3rem',
      color: 'white',
      textAlign: 'center',
  
    },
    circleTitlea:{
      marginHorizontal:'8%',
      fontSize: '1rem',
      marginVertical:5,
      textAlign:'center',
      color: '#369e40',
    },
    circleTexta:{
      textAlign:'center',
      marginBottom:'4%',
      marginHorizontal:'8%',
      color:'white',
      fontSize: '0.8rem',
    },
    circleTitleb:{
      marginHorizontal:'1%',
      fontSize: '1rem',
      marginVertical:'4%',
      textAlign:'center',
      color: '#369e40',
    },
    circleTextb:{
      textAlign:'center',
      marginBottom:'4%',
      marginHorizontal:'8%',
      color:'white',
      fontSize: '0.8rem',
    },
    description1: {
      color: 'white',
      textAlign: 'left',
      fontSize: '1rem',
      marginHorizontal: '5%',
      marginVertical:'12%'
  
    },
    description2: {
      color: 'white',
      textAlign: 'right',
      fontSize: '1rem',
      marginHorizontal: '5%',
      marginVertical:'12%'
  
    },
   
  });
  