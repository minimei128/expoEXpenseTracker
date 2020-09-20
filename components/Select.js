import React, {useState} from 'react'
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, Image} from 'react-native'

export const Select = (props) => {

    const [selected, setSelected] = useState('select category')

    return(
        <View style= {selectStyles.selectView}>
            <TouchableOpacity>
                <Text>{selected}</Text>
                <Image 
                style={selectStyles.selectImage} 
                source={require('../assets/sort-down-solid.png') }/>
            </TouchableOpacity>
        </View>
    )
}

const selectStyles = StyleSheet.create({
    selectView: {
      padding: 10,
      borderColor: '#cccccc',
      borderWidth: 1,
      borderRadius: 10,
    },
    selectImage: {
        width: 25,
        height: 25,
        position: 'absolute',
        right: 3,
        top: -9,
      },

})