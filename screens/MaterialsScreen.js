import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import SafeView from '../components/SafeView';
import Colors from '../utils/colors';
import { getDays, getAvaiability } from '../components/Firebase/firebase';
import Spinner from '../components/Spinner';
export default function MaterialsScreen({navigation}) {

  const [days, setDays] = useState([])
  const [buttonData, getButtonData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

   
useEffect(() => {
  const get = async () => {
      let data = await getAvaiability(0)
      getButtonData(data)
      setIsLoading(false)
   
  }
  get()
}, [])

let i=0

useEffect(() => {
  const getDaystoDisplay = async () => {
      let newDay = await getDays(JSON.stringify(0))
      console.log("Day: " + newDay)
      setDays(newDay)
  }
  getDaystoDisplay()
}, [])

const handleOnPress = (topic, id) => {

  navigation.navigate("TaskDetails", {topic:topic, id:id})
}
 
if (isLoading) {
  return <Spinner />;
} 
  return (
    <SafeView style={styles.container}>
        <Text style={styles.header}>Twoje wykonane zadania:</Text>
        {   

          days.map((data) => {
            console.log(data)
          if(buttonData[i].done == true){
          i=i+1
        
              return(    
             <View>
                 {data.cat ?<Text style={styles.title}>{data.cat}</Text> : <></>}
              <TouchableOpacity disabled={false}style={styles.appButtonContainer} onPress={()=>handleOnPress(data.topicId, data.name)}>   
              
              <Text style={styles.subtitleDone}> Dzień {data.name}</Text>
              </TouchableOpacity>   
              </View> 
              )
          }
          else{
            i=i+1
          }
        
          }

          )

          }
          <Text style={styles.header}>Materiały do odblokowania:</Text>     
       
    </SafeView>
    
    );
}

const styles = StyleSheet.create({
  subtitleDone: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    marginHorizontal:30,
    padding:5,
    fontFamily:'sans-serif-light',


  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButton: {

    width: '30%',
  },
  menuButton:{
    margin:30,
    padding:20
  },
  buttons:{
    fontSize:12,
  },
  header:{
    justifyContent: 'center',
    alignItems: 'center',
    fontSize:20,
    color:Colors.lightGrey,
    marginVertical:10
},
title:{

  fontSize:18,
  textAlign:'center',
  color: '#369e40',
},

});
