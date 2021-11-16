import React from 'react';
import {View, Text, Image, StyleSheet, StatusBar} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Colors from '../utils/colors.js'

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
    circleTexta: "KONTRAKTOWANIE i umawianie się z innymi tak, aby wywiązać się ze zobowiązań zawodowych  i domowych",
    circleTextb: "RADZENIE SOBIE W SYTUACJACH TRUDNYCH i konfliktowych, tak aby zadbać o dobre relacje",
    circleTextc: "RADZENIE SOBIE Z EMOCJAMI i napięciem",
    circleTextd: "BUDOWANIE POCZUCIA WŁASNEJ SKUTECZNOŚCI i efektywności osobistej",
    bg: Colors.background,
  },
];


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

  }
});

export default class App extends React.Component {
  _renderItem = ({item}) => {
    return (
      <View
        style={[
          styles.slide,
          {
            backgroundColor: item.bg,
          },
        ]}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.secondtitle}>{item.secondtitle}</Text>
        <Text style ={styles.subtitle}> {item.subtitle} </Text>
        <Text style ={styles.secondsubtitle}> {item.secondsubtitle} </Text>
        <Text style ={styles.circleTexta}> {item.circleTexta} </Text>
        <Text style ={styles.circleTextd}> {item.circleTextb} </Text>
        <Text style ={styles.circleTextc}> {item.circleTextc} </Text>
        <Image source={item.image} style={styles.image}  />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  _keyExtractor = (item) => item.title;

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar translucent backgroundColor="transparent" />
        <AppIntroSlider
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          data={data}
          doneLabel="Gotowe"
          nextLabel='Dalej'
        />
      </View>
    );
  }
}