import React, { useEffect, useState, useRef } from 'react';
import { View, SafeAreaView, StyleSheet, TouchableOpacity, Button, Alert, Text, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { textDecorationColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { getDays, getTitle } from '../components/Firebase/firebase';

import ColorsB from '../utils/colors.js'

export default function DescriptionScreen({ route, navigation}) {

const screen = route.params;

const [days, setDays] = useState([])
const [title, setTitle] = useState([])

useEffect(() => {
    const getDaystoDisplay = async () => {
        let newDay = await getDays(JSON.stringify(0))
        setDays(newDay)
    }
    getDaystoDisplay()
}, [])

useEffect(() => {
    const getTitletoDisplay = async () => {
        let nt = await getTitle(JSON.stringify(0))
        setTitle(nt)
    }
    getTitletoDisplay()
}, [])


return(
    <SafeAreaView style={{justifyContent: 'center',alignItems: 'center',flex: 1,  backgroundColor: ColorsB.background}}>
        {  
            title.map((data) => {
                return(
                    <View>
                        <Text style={styles.subtitle2}> {data.subtitle} </Text>
                        <Text style={styles.subtitle2}> {data.title} </Text>
                    </View>
                )
            }),
         
            days.map((data) => {
            let i=1
            return(      
                     <TouchableOpacity  onPress ={ () => { navigation.navigate("StartActivity", {id: (data.name -   1) }), {id: data.name}}}style={styles.appButtonContainer}>   
                    <Text style={styles.subtitle}> Dzień {data.name}</Text>
                    </TouchableOpacity>

            )
            i = i+1
            })
        }

    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    appButtonContainer: {
   
        paddingVertical: 10,
        paddingHorizontal: 12
      },
    buttons:{
        backgroundColor: ColorsB.white,
    },

    subtitle: {
      fontSize: 26,
      color: 'white',
      textAlign: 'center',
      marginHorizontal:30,
      fontFamily:'sans-serif-light',
      margin:10
  
    },

    
    subtitle2: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        marginHorizontal:30,
        fontFamily:'sans-serif-light',
        margin:10
    
      },

  });
  