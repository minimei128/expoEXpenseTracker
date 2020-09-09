import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, FlatList } from 'react-native';
import {useNavigation} from '@react-navigation/native'

//Task Management Planner Screen
export const HomeScreen = (props) => {

    const navigation = useNavigation()

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
        navigation.navigate("Task Detail", item)
    }

    return (
        <View>
            <Text>{props.text}</Text>
            <FlatList
            data = {props.data}
            renderItem = {renderList}
            keyExtractor = { item => item.id}
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
    item: {
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        flexDirection: 'row',
        justifyContent: 'space-between',

    }
})
