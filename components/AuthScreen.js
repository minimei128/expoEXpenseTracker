import React, {useState} from 'react'
import {StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native'
import {useNavigation} from '@react-navigation/native'

export const AuthScreen = (props) => {
    //create the login hook
    //pass 2 objects, login is a variable, a state and setLogin is a function to call to change the state
    //when it's true shows the login screen, false shows the register screen
    //set default state to false
    const [login,setLogin] = useState(false)

    if (!login){
        return (
            //REGISTER VIEW
            <View style={styles.container}>
            {/* user input email */}
                <TextInput
                style={styles.input} 
                placeholder="you@email.com"/>
            {/* user input password */}
                <TextInput
                style={styles.input}
                placeholder="min 8 characters"
                secureTextEntry={true}
                />
            {/* Register button */}
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
                <Text style={styles.altText}>Already have an account?</Text>
                <TouchableOpacity style={styles.altButton}>
                    <Text style={styles.altButtonText}>Login</Text>
                </TouchableOpacity>
            </View>
        )
    }
    else{
        return (
            //LOGIN VIEW
            <View style={styles.container}>
            {/* user input email */}
                <TextInput
                style={styles.input} 
                placeholder="you@email.com"/>
            {/* user input password */}
                <TextInput
                style={styles.input}
                placeholder="min 8 characters"
                secureTextEntry={true}
                />
            {/* Login button */}
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <Text style={styles.altText}>Don't have an account?</Text>
                <TouchableOpacity style={styles.altButton}>
                    <Text style={styles.altButtonText}>Register</Text>
                </TouchableOpacity>
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
    },
    input: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#777777',
        marginVertical: 20,
    },
    button: {
        padding: 10,
        backgroundColor:'#444444',
    },
    buttonText: {
        color: '#eeeeee',
        textAlign: 'center'
    },
    altText:{
        textAlign: 'center',
        marginTop: 20
    },
    altButton:{
        marginTop: 10,
        padding: 10,
        textAlign: 'center'
    },
    altButtonText:{
        color: 'blue',
        textAlign: 'center'
    }
})