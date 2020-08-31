import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
import {DetailScreen, TaskDetailScreen} from './components/TaskDetailScreen'

export default function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name ="Task Management" component={HomeScreen}/>
        <Stack.Screen name ="Task Detail" component={TaskDetailScreen}/>
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
});
