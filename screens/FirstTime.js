import React, { useEffect, useState, useRef } from 'react';
import { View, SafeAreaView, StyleSheet, Button, Alert, Text, Dimensions, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { textDecorationColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { getDescription } from '../components/Firebase/firebase';
import ColorsB from '../utils/colors.js'
import NextBackButton from '../components/NextBackButton'
import AppButton from '../components/AppButton';
export default function DescriptionScreen({ route, navigation}) {

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
      secondtitle: 'Przez najbliższych 30 dni \n będziesz otrzymywać wiadomości',
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
      text:'Abyś mógł śledzić swoje postępy proszę Cię o odpowiedź na kilka krótkich pytań dotyczących napięcia, które odczuwasz w różnych sytuacjach życiowych.  ',
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
                {item.tile ?  <Text style={styles.title}>{item.title}</Text> : <></>}
        {item.secondtitle ? <Text style={styles.secondtitle}>{item.secondtitle}</Text> : <></>}
        {item.subtitle ? <Text style ={styles.subtitle}> {item.subtitle} </Text>: <></>}
        {item.secondsubtitle ? <Text style ={styles.secondsubtitle}> {item.secondsubtitle} </Text>: <></>}
        
        {item.circleTextTitlea ? <Text style ={styles.circleTitlea}> {item.circleTextTitlea} </Text>: <></>}
        {item.circleTexta ? <Text style ={styles.circleTexta}> {item.circleTexta} </Text>: <></>}

        {item.circleTextTitlea ? <Text style ={styles.circleTitleb}> {item.circleTextTitleb} </Text>: <></>}
        {item.circleTextb ? <Text style ={styles.circleTextb}> {item.circleTextb} </Text>: <></>}

        {item.circleTextTitlea ? <Text style ={styles.circleTitlea}> {item.circleTextTitlec} </Text>: <></>}
        {item.circleTextc ? <Text style ={styles.circleTexta}> {item.circleTextc} </Text>: <></>}

        {item.circleTextTitlea ? <Text style ={styles.circleTitleb}> {item.circleTextTitled} </Text>: <></>}
        {item.circleTextc ? <Text style ={styles.circleTextb}> {item.circleTextd} </Text>: <></>}

        {item.image ? <Image source={item.image} style={styles.image}  />: <></>}
        {item.text ? <Text style={styles.text}>{item.text}</Text>: <></>}

        {item.description1 ? <Text style={styles.description1}>{item.description1}</Text> : <></>}
        {item.description1 ? <Text style={styles.description2}>{item.description2}</Text> : <></>}
        {item.button ?  <AppButton title={item.button} color={"white"}  onPress={()=>navigation.navigate("Pretest")}/> : <></>}
                  
                </View>
            )
            })
        }
        </ScrollView>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    slide: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'blue',
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
      fontSize: 22,
      color: 'white',
      textAlign: 'center',
  
    },
    subtitle: {
      fontSize: 18,
      top:-80,
      color: 'white',
      textAlign: 'center',
      marginHorizontal:30
  
    },
    secondsubtitle:{
      fontSize: 16,
      color: 'white',
      marginHorizontal:50,
      textAlign: 'center',
    },
    secondtitle: {
      fontSize: 22,
      color: 'white',
      textAlign: 'center',
  
    },
    circleTitlea:{
      marginHorizontal:50,
      fontSize:18,
      textAlign:'center',
      color: '#369e40',
    },
    circleTexta:{
      textAlign:'center',
      marginBottom:50,
      marginHorizontal:70,
      color:'white',
  
    },
    circleTitleb:{
      marginHorizontal:50,
      fontSize:18,
      textAlign:'center',
      color: '#369e40',
    },
    circleTextb:{
      textAlign:'center',
      marginBottom:50,
      marginHorizontal:70,
      color:'white',
    },
    description1: {
      color: 'white',
      textAlign: 'left',
      fontSize: 16,
      marginHorizontal: 30,
      marginVertical:50
  
    },
    description2: {
      color: 'white',
      textAlign: 'right',
      fontSize: 16,
      marginHorizontal: 30,
      marginVertical:50
  
    },
   
  });
  