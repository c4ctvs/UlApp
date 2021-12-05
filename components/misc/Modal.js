import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput, Dimensions } from "react-native";
import AppButton from "../AppButton";
import SelectDropdown from 'react-native-select-dropdown'


const win = Dimensions.get('window');

const MyModal = ({visible}) => {
 
  const [modalVisible, setModalVisible] = useState(visible);

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
        />
            <SelectDropdown
          buttonStyle={{width:'73%', marginVertical:20}}
          data={['Rzeczy', 'ludzie']}
          defaultButtonText='Wybierz kategorię'
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index)
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item
          }}
        />
           <View style={{justifyContent:'space-between',  flexDirection:'row', width:'75%'}}>
          <AppButton title="COFNIJ" onPress={()=>setModalVisible(false)}/>
          <AppButton title="DODAJ"  onPress={()=>setModalVisible(false)}/>
            </View>
          </View>

   
        </View>

      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
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

export default MyModal;