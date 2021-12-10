import React, { useEffect, useState, useRef } from 'react';
import { View, SafeAreaView, StyleSheet, Button, Alert, Text, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { textDecorationColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { getDescription, updateAv  } from '../components/Firebase/firebase';
import ColorsB from '../utils/colors.js'
import NextBackButton from '../components/NextBackButton'
import Spinner from '../components/Spinner';
import EStyleSheet from 'react-native-extended-stylesheet';

export default function DescriptionScreen({ route, navigation}) {
  EStyleSheet.build({ // always call EStyleSheet.build() even if you don't use global variables!

  });
const screen = route.params;

let update = async () => {
  await updateAv(route.params.id)
}

update()
const [isLoading, setIsLoading] = useState(true);
const [doc, setDocs] = useState([])
const { width, height } = Dimensions.get('window');
const scrollRef = useRef();
useEffect(() => {
    const getDocs = async () => {
        let newDoc = await getDescription(JSON.stringify(screen.id))
        setIsLoading(false)
        setDocs(newDoc)
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
          ref = {scrollRef}
          >
        {
            doc.map((data) => {
            return(
                <View style={{ width, height, justifyContent: 'center',flex: 1 }} >
                    {data.title? <Text style={styles.title}>{data.title}</Text> : <></> }
                    {data.subtitle ? <Text style={styles.subtitle}> {data.subtitle} </Text> : <></>}
                    {data.subtitle2 ?<Text style={styles.subtitle}> {data.subtitle2} </Text> :<></>}
                    
                    {data.greenField ?<Text style={styles.greenField}> {data.greenText} </Text> :<></>}
                   
                   {data.subtitle3 ? <Text style={styles.subtitle}> {data.subtitle3} </Text> :<></>}
                   {data.summary ?<Text style={styles.summary}> {data.summary} </Text> : <></>}

                   {data.line ? <Text style={{ borderBottomColor: '#3d7849',
                                   borderBottomWidth: 6,
                              
                                   }}></Text> : <></>}
                      <View style={styles.buttonsContainer}>
                     
                       {data.button ? <NextBackButton title="Dalej" onPress={() => { navigation.navigate('ChooseDayScreen', {id: screen.id})}}/> : <></>}
                    </View>
                </View>
            )
            })
        }
        </ScrollView>
    </SafeAreaView>
    )
}

const styles = EStyleSheet.create({
  greenField:{
    color: '#3d7849',
    fontFamily:'sans-serif-medium',
    fontSize: '1.5rem',
    textAlign:'center',
    textTransform:'uppercase',
    backgroundColor: '#c2c2c2',
    padding: '5%'},

    buttonsContainer:{
      flexDirection:'row',
      justifyContent:'flex-end',
      margin:40
    },
    image: {
      width: 320,
      height: 100,
      marginVertical:140,
    },
    text: {
      color: 'white',
      textAlign: 'center',
      fontSize: '1rem',
      marginHorizontal: 12
  
    },
    title: {
      marginTop: '20%',
      fontSize: '1rem',
      color: 'white',
      textAlign: 'center',
      fontFamily:'sans-serif-light'
  
    },
    
    subtitle: {
      fontSize: '1rem',
      color: 'white',
      textAlign: 'center',
      marginHorizontal:'6%',
      fontFamily:'sans-serif-light',
      margin:'6%'
  
    },
    summary: {
        fontSize: '1rem',
        color: 'white',
        textAlign: 'right',
        marginHorizontal:'6%',
        fontFamily:'sans-serif-light',
        marginTop:'6%',
        textTransform: 'uppercase'
         
      }
  });
  