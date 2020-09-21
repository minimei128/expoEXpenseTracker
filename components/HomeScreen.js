import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native'
import { TextInput } from 'react-native-gesture-handler'
import {Select} from './Select'
//Task Management Planner Screen
export const HomeScreen = (props) => {
    
        const selectItems = [
          {label: "Food", value: "food"},
          {label: "Transport", value: "transport"},
          {label: "Groceries", value: "groceries"},
          {label: "Bills", value: "bills"},
        ]

        useEffect(()=> {
            console.log(props.data)
        })

    const [category,setCategory] = useState(null)
    const [amount,setAmount] = useState(0)
    const [note,setNote] = useState(null)

    const [validAmount,setValidAmount] = useState(false)

    const navigation = useNavigation()

    const validateAmount = (amount) => {
        if( parseFloat(amount) ) {
          setValidAmount(true)
          setAmount(amount)
        }
        else {
          setValidAmount(false)
        }
      }

      const addItem = () => {
        const itemId = new Date().getTime()
        const itemAmount = amount
        const itemCategory = category
        const itemNote = note
        props.add({
          id: itemId,
          amount: itemAmount,
          category: itemCategory,
          note: itemNote
        })
      }
    
    //function: render out each task items on the list to the screen
    const renderList = ({item}) => (
    //pass the amount and category as a prop
        <ListItem 
        id={item.id} 
        amount={item.amount} 
        category={item.category}
        clickHandler = {showDetail}
        item = {item}/>
    )
    //function: each item navigate to show more detail
    const showDetail = ( item ) => {
        navigation.navigate("Task_Detail", item)
    }

    return (
        <View style={homeStyle.container}>
            <View>
                <TextInput
                style={homeStyle.input} 
                placeholder="amount"
                onChangeText={ (amount) => validateAmount(amount) } 
                keyboardType='decimal-pad'/>
                <Select items ={selectItems} onSelect={setCategory}/>
                <TextInput 
                style={homeStyle.input} 
                placeholder="notes" 
                onChangeText={ (note) => setNote(note)}/>
                 <TouchableOpacity 
                 style={ validAmount && category ? homeStyle.button : homeStyle.buttonDisabled }
                 disabled={ validAmount && category ? false : true }
                 onPress={ () => { addItem() } }>
                    <Text style={homeStyle.buttonText}>Add</Text>
                 </TouchableOpacity>
            </View>

            <FlatList
            data = {props.data}
            renderItem = {renderList}
            keyExtractor = { item => item.id}
            extraData = {props.extra}
            />
            
            
        </View>
    )
}

const ListItem = (props) => {
    return (
    // when user press each render each item to direct to more detail screen
    <TouchableOpacity onPress={ () => props.clickHandler(props.item)}>
        {/* show in each item the data for category and amount */}
        <View style={homeStyle.item}>
            <Text>{props.category}</Text>
            <Text>{props.amount}</Text>
        </View>
    </TouchableOpacity>
    )
}

const homeStyle = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal: 10,
    },
    item: {
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    input: {
        padding: 10,
        borderColor: '#cccccc',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        marginVertical: 15,
    },
    button: {
        backgroundColor: '#f4511e',
        padding: 10,
        borderRadius: 10,
      },
      buttonDisabled: {
        backgroundColor: '#ffd9b3',
        padding: 10,
        borderRadius: 10,
      },
      buttonText: {
        textAlign: 'center',
        color: 'white',
      },

})
