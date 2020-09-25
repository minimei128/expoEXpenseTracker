import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Button, FlatList, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native'
import { TextInput } from 'react-native-gesture-handler'
//select picker
import {Select} from './Select'

//Task Management Planner Screen
export const HomeScreen = (props) => {
    
        //categories list
        const selectItems = [
          {label: "Food", value: "Food"},
          {label: "Transport", value: "Transport"},
          {label: "Groceries", value: "Groceries"},
          {label: "Bills", value: "Bills"},
          {label: "Travel", value: "Travel"},
          {label: "Entertainment", value: "Entertainment"},
        ]

        useEffect(()=> {
            console.log(props.data)
        })

       const [category,setCategory] = useState(null)
       const [amount,setAmount] = useState(0)
       const [note,setNote] = useState(null)
       const [validAmount,setValidAmount] = useState(false)
       const navigation = useNavigation()

       //function: validate input for amount being integer
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
    
        <ListItem 
        id={item.id} 
        amount={item.amount} 
        category={item.category}
        clickHandler = {showDetail}
        item = {item}/>
    )
    //function: each item navigate to show more info
    const showDetail = ( item ) => {
        navigation.navigate("Info", item)
    }

    //function: getCategoriesColor

    return (
        <View style={homeStyle.container}>
            <View style={homeStyle.headerWrapper}>
             
             {/* Input Amount */}
                <TextInput style={homeStyle.inputAmount} placeholder="Amount"
                onChangeText={ (amount) => validateAmount(amount) } 
                keyboardType='decimal-pad'/>

              {/* Select picker for categories */}
                <Select items ={selectItems} onSelect={setCategory}/>

              {/* Input Notes */}
                <TextInput style={homeStyle.input} placeholder="Notes" 
                onChangeText={ (note) => setNote(note)}/>

              {/* Add button */}
                <TouchableOpacity 
                 style={ validAmount && category ? homeStyle.button : homeStyle.buttonDisabled }
                 disabled={ validAmount && category ? false : true }
                 onPress={ () => { addItem() } }>
                  <Text style={homeStyle.buttonText}>Add</Text>
                </TouchableOpacity>
            </View>
          <View> 

            {/* List of Items */}
            <FlatList
                data = {props.data}
                renderItem = {renderList}
                keyExtractor = { item => item.id}
                extraData = {props.extra}/>
            </View>
        </View>
    )
}

// function: display of items in list
const ListItem = (props) => {
    return (
    // when user press each render each item to direct to more info screen
    <TouchableOpacity onPress={ () => props.clickHandler(props.item)}>
        {/* show in each item the data for category and amount */}
        <View style={homeStyle.item}>
            <Text style={[
              ()

            ]}>{props.category}</Text>
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
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderLeftColor: '#cccccc',
        borderRightColor: '#cccccc',
        borderBottomColor: '#cccccc',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        marginTop: 5,
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 2,},
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
      },
    input: {
        padding: 10,
        borderColor: '#cccccc',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        marginVertical: 15,
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 2,    },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    inputAmount: {
      padding: 10,
      borderColor: '#cccccc',
      borderWidth: 1,
      borderRadius: 10,
      backgroundColor: '#ffffff',
      marginVertical: 15,
      shadowColor: "#000",
      shadowOffset: {
        width: 1,
        height: 2, },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    },
    button: {
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
        marginTop: 15,
    },
      buttonDisabled: {
        backgroundColor: '#ffd9b3',
        padding: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
        	width: 0,
	        height: 2,},
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        marginTop: 15,
    },
      buttonText: {
        textAlign: 'center',
        color: 'white',
    },
      icon:{
        width: 100,
        height: 100,
        marginRight: 10  
    },
    headerWrapper:{
      marginBottom: 15, 
    },
    header:{
      display: 'flex',
      flexDirection: 'row',
      padding: 20,
      justifyContent: 'space-evenly'
    },
    display:{
      borderColor: '#f4511e',
      borderWidth: 3,
      paddingBottom: 20,
      paddingTop: 20,
      paddingRight: 20,
      paddingLeft: 20,
      backgroundColor: 'white',
    },

    Food:{ color: 'blue'},
    Transport:{ color: 'green'},
    Groceries:{ color: 'orange'},
    Bills:{ color: 'red'},
    Travel:{ color: 'purple'},
    Entertainment:{ color: 'pink'},

})
