import React, { useEffect, useState, useRef } from 'react';
import { View, SafeAreaView, StyleSheet, Button, Alert, Text, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { textDecorationColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { getDescription } from '../components/Firebase/firebase';
import ColorsB from '../utils/colors.js'
import NextBackButton from '../components/NextBackButton'

export default function DescriptionScreen({ route, navigation}) {

const screen = route.params;

const [doc, setDocs] = useState([])
const { width, height } = Dimensions.get('window');
const scrollRef = useRef();
useEffect(() => {
    const getDocs = async () => {
        let newDoc = await getDescription(JSON.stringify(screen.id))
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
          ref = {scrollRef}
          >
        {
            doc.map((data) => {
            return(
                <View style={{ width, height }} >
                    {data.title != "" ? <Text style={styles.title}>{data.title}</Text> : <></> }
                    <Text style={styles.subtitle}> {data.subtitle} </Text>
                    <Text style={styles.subtitle}> {data.subtitle2} </Text>
                    
                    <Text style={{opacity: data.greenField,
                                  color: '#3d7849',
                                  fontFamily:'sans-serif-medium',
                                  fontSize: 22,
                                  textAlign:'center',
                                  backgroundColor: '#c2c2c2',
                                  padding: 15}}> {data.greenText} </Text>
                   
                    <Text style={styles.subtitle}> {data.subtitle3} </Text>
                    <Text style={styles.summary}> {data.summary} </Text>

                    <Text style={{ borderBottomColor: '#3d7849',
                                   borderBottomWidth: 6,
                                   opacity:data.line,
                                   
                                   
                                   }}></Text>
                     <View style={styles.buttonsContainer}>
                         <NextBackButton title="Powrót" />
                         <NextBackButton title="Dalej" onPress={() => { navigation.navigate('ChooseDayScreen'), {id: screen.id}}}/>
                    </View>
                </View>
            )
            })
        }
        </ScrollView>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    buttonsContainer:{
      flexDirection:'row',
      justifyContent:'space-between',
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
    
    subtitle: {
      fontSize: 16,
      color: 'white',
      textAlign: 'center',
      marginHorizontal:30,
      fontFamily:'sans-serif-light',
      margin:30
  
    },
    summary: {
        fontSize: 16,
        color: 'white',
        textAlign: 'right',
        marginHorizontal:30,
        fontFamily:'sans-serif-light',
        marginTop:20,
        textTransform: 'uppercase'
         
      }
  });
  