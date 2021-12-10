import React, { useEffect, useState, useRef } from 'react';
import { View, SafeAreaView, StyleSheet, TouchableOpacity, Button, Alert, Text, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { textDecorationColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { getDays, getTitle, getAvaiability} from '../components/Firebase/firebase';
import EStyleSheet from 'react-native-extended-stylesheet';
import ColorsB from '../utils/colors.js'


export default function DescriptionScreen({ route, navigation}) {

    EStyleSheet.build({ // always call EStyleSheet.build() even if you don't use global variables!

    });
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

const styles = EStyleSheet.create({
    title: {
        position:'absolute',
        top:'5%',
        right: '5%',
        fontSize: '1.2rem',
        marginBottom:'10%',
        color: '#369e40',
        textAlign: 'left',
        fontFamily:'sans-serif-medium'
    
      },
    appButtonContainer: {
   
        paddingVertical: '3%',
        paddingHorizontal:'3%'
      },
    buttons:{
        backgroundColor: ColorsB.white,
    },

    subtitle: {
      fontSize: '1.7rem',
      color: 'white',
      textAlign: 'center',
      marginHorizontal:'5%',
      fontFamily:'sans-serif-light',
      margin:'2%'
  
    }, 
     subtitleDone: {
        fontSize: '1.7rem',
        color: 'green',
        textAlign: 'center',
        marginHorizontal:'5%',
        fontFamily:'sans-serif-light',
        margin:'2%'
    
      },

    subtitleDisabled: {
        fontSize: '1.7rem',
        color: '#c4c4c4',
        textAlign: 'center',
        marginHorizontal:'5%',
        fontFamily:'sans-serif-light',
        margin:'2%'
    
      },
    subtitle2: {
        fontSize: '1.7rem',
        color: 'white',
        textAlign: 'center',
        marginHorizontal:'5%',
        fontFamily:'sans-serif-light',
        margin:'2%'
    
      },

  });
  