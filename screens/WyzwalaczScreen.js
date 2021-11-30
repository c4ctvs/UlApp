import React, { useEffect, useState, useRef } from 'react'
import { View, SafeAreaView, StyleSheet, Button, Alert, Text, Dimensions, TextInput } from 'react-native'
import AddButton from '../components/AddButton'
import Colors from '../utils/colors'
import Draggable from 'react-native-draggable'
import DialogInput from 'react-native-dialog-input'
import MyDraggable from '../components/myDraggable'

let i=0;

export default function WyzwalaczScreen({ route, navigation}) {

let [elements, setElements] = useState([])
const [visibility, setVisibility] = useState(false)
const [deleteVisibility, setDeleteVisibility] = useState(false)

const addElement = (wyzwalaczName) =>{
    showDialog(true)
    setElements([...elements, {clientName: wyzwalaczName, key:i}])
    i+=1
}

const showDialog = (value) => {
  setVisibility(value)
}

const deleteWyzwalacz = (element) => {
  let temp = [...elements]
  let index = temp.indexOf(element)
  if(index !== -1){
    temp.splice(index, 1)
    setElements(temp)
  }

}

const screen = route.params;
const { width, height } = Dimensions.get('window');
return (
    <View style={styles.container}>
    <View style={{ width, height}}>
   
        <Text style={styles.greenTitle1}>Osobiste</Text>
       <Text style={{ borderBottomColor: '#3d7849',
                                   borderBottomWidth: 6,
                                   justifyContent:'center',
                                    marginTop:'100%'
                                   
                                   }}></Text> 
       <Text style={styles.greenTitle2}>Te drugie</Text>
       
 
    <AddButton onPress={() => showDialog()} />
    <DialogInput isDialogVisible={visibility}
            title={"Nowy wyzwalacz"}
            hintInput ={"Nazwa"}
            submitInput={ (inputText) => {addElement(inputText),showDialog(false)} }
            closeDialog={ () => {showDialog(false)}}>
    </DialogInput>
    { 
       elements.map(element =>{
            return <MyDraggable text={element.clientName} onPress={()=>deleteWyzwalacz(element)}/>
        })
    }
    </View>
    </View>
);
    
}


const styles = StyleSheet.create({
    container: {
 
        backgroundColor: Colors.background
        
      },
      hint: {
        fontSize: 16,
        color: 'white',
        textAlign: 'left',
       
        fontFamily:'sans-serif-light',
        marginTop:20,
        padding:30,
        width:'75%',
        backgroundColor: '#3d7849',

         
      },
      draggable:{
        borderColor:"white",
        borderRadius:10,
        padding:7,
        backgroundColor:'white'
      },
      text:{
        fontSize:16,
        color:'black',
      },
      greenTitle1: {
        position:'absolute',
        top: '5%',
        fontSize: 30,
        marginBottom:40,
        color: '#369e40',
        textAlign: 'center',
        fontFamily:'sans-serif-medium'
    
      },
      greenTitle2: {
        position:'absolute',
        top: '52%',
        fontSize: 30,
        marginBottom:40,
        color: '#369e40',
        textAlign: 'center',
        fontFamily:'sans-serif-medium'
    
      },
  });
  