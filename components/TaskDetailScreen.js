import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {DateFormat} from './DateFormat';

//Task Detail Screen
export const TaskDetailScreen = (props) => {
    const [amount, setAmount] = useState(props.route.params.amount)
    const [editing, setEditing] = useState(false)

    const navigation = useNavigation()

    return (
        <View>
          <Text 
          style={[styles.amount, { display: editing ? 'none' : 'flex'}]}>
            $ {amount}
            </Text>
          <TextInput 
          style={[styles.amount, {display: editing ? 'flex' : 'none'}]} 
          placeholder={amount}
          onChangeText={(amount) => {setAmount(amount)}}/>
          
          <Button 
        title={ editing? "save" : "edit" } 
        onPress={ () => { 
          if( editing ) {
            setEditing(false)
            let item = {
              amount: amount,
              note: props.route.params.note,
              category: props.route.params.category,
              id: props.route.params.id
            }
            props.update( item )
          }
          else {
            setEditing(true) 
          }
        } } 
      />

          <DateFormat 
          date={props.route.params.id} 
          styling={styles.date} />
          <Text style={styles.date}>{props.route.params.category}</Text>
          <Text style={styles.date}>{props.route.params.note}</Text>
          <Button 
        title="Delete" 
        onPress={ () => { 
          props.delete(props.route.params.id) 
          navigation.goBack()
        }}
      />
        </View>
      )
}

const styles = StyleSheet.create({
    amount: {
      textAlign: 'center',
      fontSize: 32,
      marginVertical: 15,
    },
    date: {
      textAlign: 'center',
      marginVertical: 10,
      fontWeight: '700',
    },
  })