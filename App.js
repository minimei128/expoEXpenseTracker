import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
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

  //list variable 
  let listData = []

  //state to see whether user is login or not
  const [auth,setAuth] = useState(false) 
  const [dataRef,setDataRef] = useState(null)


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
    const dataObj = { 
      amount: item.amount,
      note: item.note,
      category: item.category
    }
    firebase.database().ref(`${dataRef}/items/${item.id}`).set(dataObj)
  }

  const readData = () => {
    if(!dataRef) {
      return
    }
    let data = []
    firebase.database().ref(`${dataRef}/items`).on('value', (snapshot) => {
      const dataObj = snapshot.val()
      const keys = Object.keys( dataObj )
      keys.forEach( (key) => {
        let item = dataObj[key]
        item.id = key
        listData.push( item )
      })
      // listData = data;
    })
  }

  firebase.auth().onAuthStateChanged( (user) => {
    if( user ) {
      setAuth(true)
      setDataRef(`users/${user.uid}`)
      readData()
      // console.log('user logged in')
    }
    else {
      setAuth(false)
      setDataRef(null)
      // console.log('user not logged in')
    }
  } )


  return (

    <NavigationContainer>
      {/* Each item in the stack is a screen */}
      <Stack.Navigator>
        <Stack.Screen

          name="Register">
          {(props) => <AuthScreen {...props} signup={register} loggedIn={auth}/>}
        </Stack.Screen>

        <Stack.Screen 
          name="Home"
          options={({navigation,route}) => ({
            headerTitle: "Task Management",
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
            /> }
        </Stack.Screen>
        <Stack.Screen name ="Task_Detail" component={TaskDetailScreen}/>
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
    backgroundColor: '#777777',
    padding: 5
  },
  signOutText: {
    color: '#cccccc'
  },

});

