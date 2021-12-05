import React, { useEffect, useState, useRef } from 'react'
import { View, SafeAreaView, StyleSheet, Button, Alert, Text, Dimensions, TextInput, Modal } from 'react-native'
import AddButton from '../components/AddButton'
import Colors from '../utils/colors'
import MyDraggable from '../components/myDraggable'
import SelectDropdown from 'react-native-select-dropdown'
import AppButton from "../components/AppButton";
import { ScrollView } from 'react-native-gesture-handler'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

let i=0;

const win = Dimensions.get('window');
export default function WyzwalaczScreen({ route, navigation}) {

let [elements, setElements] = useState([])


const [modalVisible, setModalVisible] = useState(false)

const handleOnSend = () =>{
  let values=[]
  navigation.goBack()
}

const addElement = (wyzwalaczName, index) =>{
    setElements([...elements, {clientName: wyzwalaczName, key:i, colorid:index}])
    i+=1
    setModalVisible(false)
}


const deleteWyzwalacz = (element) => {
  let temp = [...elements]
  let index = temp.indexOf(element)
  if(index !== -1){
    temp.splice(index, 1)
    setElements(temp)
  }

}


const MyModal = ({visible}) => {
  const [text, setText] = useState('');
  let [index, setIndex] = useState(0)
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
       
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Nowy wyzwalacz</Text>
            <TextInput
              style={{height: 40, borderBottomColor:'green', borderBottomWidth:2, width:win.width*0.65}}
              onChangeText={text => setText(text)}
              defaultValue={text}
             />
            <SelectDropdown
                buttonStyle={{width:'73%', marginVertical:20}}
                data={['Rzeczy', 'Ludzie', 'Sytuacje', "Bodźce zmysłowe"]}
                defaultButtonText='Wybierz kategorię'
                onSelect={(selectedItem, index) => {
                  setIndex(index)
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                  return item
                }}
              />
           <View style={{justifyContent:'space-between',  flexDirection:'row', marginHorizontal:40}}>
          <AppButton title="COFNIJ" onPress={()=>setModalVisible(false)}/>
          <AppButton title="DODAJ"  onPress={()=>addElement(text, index)}/>
            </View>
          </View>

   
        </View>

      </Modal>
    </View>
  );
};
const screen = route.params;
const { width, height } = Dimensions.get('window');
return (
  <ScrollView  
  horizontal={true}
  scrollEventThrottle={16}
  pagingEnabled={true}
  showsVerticalScrollIndicator={true}>
    <View style={{ width, height, backgroundColor:Colors.background}}>
    <Text style={styles.greenTitle}> Wyzwalacze </Text>
    <Text style={{color:'white', fontFamily:'sans-serif-light',fontSize:16, marginHorizontal:12, textAlign:'center', marginTop:15, padding:10}}>Wyzwalacze to wszystko to, co wprawia ruch określone procesy psychologiczne – w tym przypadku napięcia.  </Text>
    <Text style={{color:'white', fontFamily:'sans-serif-light',fontSize:16, marginHorizontal:12, textAlign:'center', marginTop:15, padding:10}}> Nie są one same w sobie przyczyną, ale ostatecznym „bodźcem” do wydobycia określonej reakcji – np. stresu.  Emocjonalne wyzwalacze są jak „czerwone przyciski”, które po naciśnięciu aktywują pewne emocje i uczucia. Wyzwalaczem może stać się wszystko, czemu nadajesz znaczenie, co jest dla Ciebie ważne, a co powoduje silne napięcie kiedy tego doświadczasz. Mogą to być konkretni ludzie, Ci znaczący, których spotykasz na co dzień (np. Partner/ka, dziecko) bądź wasze kontakty są epizodyczne (np. Ekspedientka w sklepie, dostawca), sytuacje, których doświadczasz (np. Kłótnia, rozmowa z przełożonym). Wśród wyzwalaczy mogą znaleźć się również rzeczy (np.. Strzykawka) czy bodźce zmysłowe (np. Smak, melodia), które uwalniają proces przypominania.  </Text>
    <Text style={{color:'white', fontFamily:'sans-serif-light',fontSize:16, marginHorizontal:12, textAlign:'center', marginTop:15, padding:10}}> Na następnej stronie możesz dodać i zakategoryzować swoje własne wyzwalacze.</Text>
    </View>
    <View style={{ width, height, backgroundColor:Colors.background}}>
       <Text style={styles.greenTitle1}>Osobiste</Text>
       <Text style={{ borderBottomColor: '#3d7849',
                                   borderBottomWidth: 6,
                                   justifyContent:'center',
                                    marginTop:'100%'
                                   
                                   }}></Text> 
       <Text style={styles.greenTitle2}>Zawodowe</Text>
       
 
    <AddButton onPress={() => setModalVisible(true)} />
    <View style={{width:'25%', alignSelf:'flex-end', margin:20, top:'33.9%'}} onPress={()=> navigation.goBack()}><AppButton title="Wyślij" color={"white"} /></View>
   {modalVisible?<MyModal visible={modalVisible}/>:<></>} 
   { 
       elements.map(element =>{
            return <MyDraggable colorid={element.colorid} text={element.clientName} onPress={()=>deleteWyzwalacz(element)}/>
        })
    }
    </View>
  
    </ScrollView>
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
        top: '7%',
        left:'5%',
        fontSize: 20,
        marginBottom:40,
        color: '#369e40',
        textAlign: 'center',
        fontFamily:'sans-serif-medium'
    
      },
      greenTitle: {
        marginTop:'14%',
        fontSize: 30,

        color: '#369e40',
        textAlign: 'center',
        fontFamily:'sans-serif-medium'
    
      },
      greenTitle2: {
        position:'absolute',
        top: '53%',
        left:'5%',
        fontSize: 20,
        marginBottom:40,
        color: '#369e40',
        textAlign: 'center',
        fontFamily:'sans-serif-medium'
    
      },
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        width:'90%',
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      textStyle: {
        color: "black",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize:20
      }
  });
  