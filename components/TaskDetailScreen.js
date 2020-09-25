import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {DateFormat} from './DateFormat';
import { TouchableOpacity } from 'react-native-gesture-handler';

//Task Detail Screen
export const TaskDetailScreen = (props) => {
    const [amount, setAmount] = useState(props.route.params.amount)
    const [editing, setEditing] = useState(false)

    const navigation = useNavigation()

    return (
        <View style={styles.container}>
           {/* Display: Date when item is submitted */}
           <DateFormat date={props.route.params.id} styling={styles.date} />
          {/* Text Amount Set */}
          <Text style={[styles.amount, { display: editing ? 'none' : 'flex'}]}> $ {amount}</Text>
           {/* Edit Amount */}
          <TextInput style={[styles.amount, {display: editing ? 'flex' : 'none'}]} 
                     placeholder= {amount}
                     onChangeText={(amount) => {setAmount(amount)}}/>
            <View style={styles.btnWrapper}>
           {/* Button to save edit amount */}
          <TouchableOpacity style={styles.saveBtn} title={ editing? "save" : "edit" } 
                     onPress={ () => { 
                       if( editing ) {
                          setEditing(false)
                          let item = {
                            amount: amount,
                            note: props.route.params.note,
                            category: props.route.params.category,
                            id: props.route.params.id }
                          props.update( item )}
                          else {
                          setEditing(true)}
                        } }>
                          <Image style={styles.iconBtn} source={require('../assets/edit-solid.png')} />
                          <Text style={styles.buttonText}>Edit</Text></TouchableOpacity>
             {/* Delete item button */}
          <TouchableOpacity style={styles.deleteBtn} onPress={ () => { props.delete(props.route.params.id)
          {/* Go back when item is deleted */}
          navigation.goBack() }}>
            <Image style={styles.iconBtn} source={require('../assets/trash-solid.png')} />
            <Text style={styles.buttonText}>Delete</Text></TouchableOpacity>
            </View>
            
          <View style={styles.body}>
             {/* Display: Category when item is submitted */}
          <Text style={styles.bodyCategory}>Category: {props.route.params.category}</Text>
            {/* Display: Note when item is submitted */}
          <Text style={styles.bodyNote}>Notes: {props.route.params.note}</Text>
          </View>
        </View>
      )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingHorizontal: 10,

},
body:{
  marginTop: 10,
  backgroundColor: 'white',
  borderWidth: 1,
  borderColor: '#cccccc',
},
    amount: {
      textAlign: 'center',
      fontSize: 50,
      fontWeight: '700',
      borderWidth: 1,
      borderColor: '#cccccc',
      marginBottom: 10,
      backgroundColor: 'white',

    },
    date: {
      textAlign: 'center',
      marginVertical: 10,
      fontWeight: '700',
      textDecorationLine:'underline',
    },
    saveBtn:{
      display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
      backgroundColor: '#f4511e',
        padding: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 2,},
        shadowOpacity: 0.23,
        shadowRadius: 2.62, 
        elevation: 4,
    },
    iconBtn:{
      width: 20,
      height: 20,
  },
  buttonText: {
    color: '#eeeeee',
    textAlign: 'center'
},

deleteBtn:{
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,},
    shadowOpacity: 0.23,
    shadowRadius: 2.62, 
    elevation: 4,
    
},

btnWrapper:{
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-evenly'
},

bodyCategory: {
  
  fontWeight: '700',
  backgroundColor: '#EE6352',
  padding: 10,
  color: 'white',
  justifyContent: 'flex-start'
},

bodyNote: {
  
  fontWeight: '700',
  backgroundColor: '#3FA7D6',
  padding: 10,
  color: 'white',
},

  })