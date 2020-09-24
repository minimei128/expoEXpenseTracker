import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

// firebase config
import {firebaseConfig} from './config/firebase'
// firebase library
import * as firebase from 'firebase'
// initialise app
if ( !firebase.apps.length ){
  firebase.initializeApp( firebaseConfig )
}

import {HomeScreen} from './components/HomeScreen'
import {TaskDetailScreen} from './components/TaskDetailScreen'
import {AuthScreen} from './components/AuthScreen'
import {TouchableOpacity } from 'react-native-gesture-handler';

export default function App() {

  //state to see whether user is login or not
  const [auth,setAuth] = useState(false) 
  const [dataRef,setDataRef] = useState(null)
  const [updating, setUpdating] = useState(false)

  useEffect(()=> {
    readData()
  })

//list variable 
  let listData = []

  const register = (intent, email,password) => {
    if(intent == 'register'){
      firebase.auth().createUserWithEmailAndPassword( email, password)
    .catch (error => console.log(error))
    }
    else if(intent == 'login'){
      firebase.auth().signInWithEmailAndPassword( email, password)
      .catch (error => console.log(error))
    }
  }

  const addData = (item) => {
    if( !dataRef ) {
      return;
    }
    setUpdating(false)
    const dataObj = { 
      amount: item.amount,
      note: item.note,
      category: item.category
    }
    firebase.database().ref(`${dataRef}/items/${item.id}`).set(dataObj, () => {
      // update state for rendering of list
      setUpdating(true)
    })
  }

  const readData = () => {
    if(!dataRef) {
      return
    }
    firebase.database().ref(`${dataRef}/items`).once('value')
    .then((snapshot) => {
      let data = snapshot.val()
      if(data) {
        let keys = Object.keys(data)
        listData = []
        keys.forEach((key) => {
          let item = data[key]
          item.id = key
          listData.push(item)
        })
        setUpdating(true)
      }
    })
    
  }

  const updateData = (item) => {
    setUpdating(false)
    const data = {amount: item.amount, note: item.note, category: item.category }
    firebase.database().ref(`${dataRef}/items/${item.id}`).update( data )
    .then(() => {
      // data is updated
      setUpdating(true)
    })
  }

  const deleteData = (id) => {
    setUpdating(false)
    firebase.database().ref(`${dataRef}/items/${id}`).remove()
    .then( () => {
      setUpdating(true)
    })
  }

  // listen for data changes
  const db = firebase.database().ref(`${dataRef}/items`)
  db.on('value', (snapshot) => {
    const dataObj = snapshot.val()
    if(dataObj) {
      let keys = Object.keys(dataObj)
      listData = []
      keys.forEach( (key) => {
        let item = dataObj[key]
        item.id = key
        listData.push(item)
      })
    }
  })

  firebase.auth().onAuthStateChanged( (user) => {
    if( user ) {
      setAuth(true)
      setDataRef(`users/${user.uid}`)
    }
    else {
      setAuth(false)
      setDataRef(null)
      
    }
  } )


  return (

    <NavigationContainer>
      {/* Each item in the stack is a screen */}
      <Stack.Navigator>
        <Stack.Screen name="Register">
          {(props) => <AuthScreen {...props} signup={register} loggedIn={auth}/>}
        </Stack.Screen>

      <Stack.Screen 
          name="Home"
          options={({navigation,route}) => ({
            headerTitle: "EXpense Tracker",
            headerRight: () => (
              <TouchableOpacity style={styles.signout} onPress={ () => {
                firebase.auth().signOut().then( () => {
                  setAuth(false)
                  navigation.reset({ index: 0, routes: [{name: "Register"}] })
                })
              }}>
                <Text style={styles.signOutText}>Sign out</Text>
              </TouchableOpacity>
            )
          })}>
          { (props) => <HomeScreen {...props} 
            data={listData}
            add={addData} 
            extra={updating}
            /> }
        </Stack.Screen>
        <Stack.Screen name ="Task_Detail">
        { (props) => <TaskDetailScreen {...props} 
            update={updateData}
            delete={deleteData} /> }
        </Stack.Screen>   
      </Stack.Navigator>
    </NavigationContainer>
  );
}

//initialize
const Stack = createStackNavigator()

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signout: {
    backgroundColor: '#f4511e',
    padding: 5,
    marginRight: 10,
    borderRadius: 5,
  },
  signOutText: {
    color: 'white'
  },

});

