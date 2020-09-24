import React, {useState} from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, Image } from 'react-native'

export const Select = (props) => {
  const [selected,setSelected] = useState('Categories')
  const [visible, setVisible] = useState(false)

  const Items = props.items.map((item,index) => {
    
    return (
      <TouchableOpacity 
        style={selectStyles.selectItem} 
        key={index} 
        onPress={()=> { 
          setSelected(item.value)
          props.onSelect( item.value )
          setVisible(false) 
        }} 
      >
        <Text style={selectStyles.itemText}>{item.label}</Text>
      </TouchableOpacity>
    )
  })

  return (
    <View style={selectStyles.selectView}>
      <TouchableOpacity onPress={() => setVisible(true) } >
        <Text>{selected}</Text>
        <Image 
          style={selectStyles.selectImage} 
          source={require('../assets/sort-down-solid.png') } 
        />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        visible = {visible}
        transparent = {true}
      >
        <View style={selectStyles.modalView}>
          <ScrollView>
            {Items}
          </ScrollView>
        </View>
      </Modal>
    </View>
  )
}

const selectStyles = StyleSheet.create({
  selectView: {
    padding: 10,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white'
  },
  selectImage: {
    width: 25,
    height: 25,
    position: 'absolute',
    right: 3,
    top: -7,
  },
  selectItem: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomColor: '#fff2e6',
    borderBottomWidth: 1,
  },
  itemText:{
    color: 'white',
  },
  modalView: {
    marginTop: 180,
    marginLeft: 10,
    backgroundColor: '#f4511e',
    width: 340,
    borderStyle: 'solid',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
  },
})