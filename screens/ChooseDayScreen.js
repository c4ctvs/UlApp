import React, { useEffect, useState, useRef } from 'react';
import { View, SafeAreaView, StyleSheet, TouchableOpacity, Button, Alert, Text, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { textDecorationColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { getDays, getTitle, getAvaiability, updateAv } from '../components/Firebase/firebase';

import ColorsB from '../utils/colors.js'


export default function DescriptionScreen({ route, navigation}) {
    console.log("id"+route.params.id)
    let update = async () => {
        await updateAv(route.params.id)
    }
    
update()

const screen = route.params;
const [days, setDays] = useState([])
const [buttonData, getButtonData] = useState([])




useEffect(() => {
    const get = async () => {
        let data = await getAvaiability(screen.id)
        getButtonData(data)
    }
    get()
}, [])



useEffect(() => {
    const getDaystoDisplay = async () => {
        let newDay = await getDays(JSON.stringify(0))
        setDays(newDay)
    }
    getDaystoDisplay()
}, [])



let i=0

return(

    <SafeAreaView style={{justifyContent: 'center',alignItems: 'center',flex: 1,  backgroundColor: ColorsB.background}}>
            <Text style={styles.title}> TYDZIEŃ {screen.id +1} </Text>

       
        {   

            days.map((data) => {
        
            
            if(buttonData[i].avaiable == true && buttonData[i].done == false){
                console.log(i)
                i=i+1
            return(      
                     <TouchableOpacity  onPress ={ () => { navigation.navigate("StartActivity", {topic: screen.id, id: (data.name -   1) }), {id: data.name}}}style={styles.appButtonContainer}>   
                    <Text style={styles.subtitle}> Dzień {data.name}</Text>
                    </TouchableOpacity>

            )
             }
             else if(buttonData[i].done == true){
                i=i+1
                return(    
                <TouchableOpacity  disabled={true} onPress ={ () => { navigation.navigate("StartActivity", {topic: screen.id, id: (data.name -   1) }), {id: data.name}}}style={styles.appButtonContainer}>   
                <Text style={styles.subtitleDone}> Dzień {data.name}</Text>
                </TouchableOpacity>
                    
                )
             }
             else{
                i=i+1
                return(    
                <TouchableOpacity  disabled={true} onPress ={ () => { navigation.navigate("StartActivity", {topic: screen.id, id: (data.name -   1) }), {id: data.name}}}style={styles.appButtonContainer}>   
                <Text style={styles.subtitleDisabled}> Dzień {data.name}</Text>
                </TouchableOpacity>
                    
                )  
             }
            
            }
         
            )
        
        }

    </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    title: {
        position:'absolute',
        top: 40,
        right: 20,
        fontSize: 20,
        marginBottom:40,
        color: '#369e40',
        textAlign: 'left',
        fontFamily:'sans-serif-medium'
    
      },
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
     subtitleDone: {
        fontSize: 26,
        color: 'green',
        textAlign: 'center',
        marginHorizontal:30,
        fontFamily:'sans-serif-light',
        margin:10
    
      },

    subtitleDisabled: {
        fontSize: 26,
        color: '#c4c4c4',
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
  