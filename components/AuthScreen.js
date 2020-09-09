import React, {useState} from 'react'
import {StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native'
import {useNavigation} from '@react-navigation/native'

export const AuthScreen = (props) => {
    //create the login hook
    //pass 2 objects, login is a variable, a state and setLogin is a function to call to change the state
    //when it's true shows the login screen, false shows the register screen
    const [login,setLogin] = useState(false)
    //hooks for validation
    const [validEmail, setValidEmail] = useState(false)
    const [validPassword, setValidPassword] = useState(false)
    //hooks for user credentials
    const [email,setEmail] = useState(null)
    const [password,setPassword] = useState(null)


    const navigation = useNavigation()

    //function: email validation
    const validateEmail = (email) => {
        //check if the '@' isn't at the beginning and for the '.' in the email
        if(email.indexOf('@') > 0 && email.indexOf('.') > 0 ){
            setValidEmail(true)
            setEmail(email)
        }
        else{
            setValidEmail(false)
        }
    }

    //function: password validation
    const validatePassword = (password) => {
        //check if the password is minmun 8 characters long
        if( password.length >= 8){
            setValidPassword( true )
            setPassword(password)
        }
        else{
            setValidPassword( false)
        }
    }

    if (!login){
        return (
            //REGISTER VIEW
            <View style={styles.container}>
            {/* user input email */}
                <TextInput
                style={styles.input} 
                placeholder="Email"
                onChangeText={(email) => validateEmail(email)}
                />
            {/* user input password */}
                <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={(password) => validatePassword(password)}
                />
            {/* Register button */}
                <TouchableOpacity 
                style={!validEmail || !validPassword ? styles.buttonDisabled : styles.buttonDisabled}
                disabled={ !validEmail || !validPassword ? true : false}
                onPress={() => {props.signup(email,password)}}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
                <Text style={styles.altText}>Already have an account?</Text>
                <TouchableOpacity 
                style={styles.altButton}
                onPress={()=> {
                        setLogin(true)
                        navigation.setOptions({title: 'Sign In'})
                        }}>
                    <Text style={styles.altButtonText}>Sign In</Text>
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
                placeholder="Email"/>
            {/* user input password */}
                <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}
                />
            {/* Login button */}
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <Text style={styles.altText}>Don't have an account?</Text>
                <TouchableOpacity 
                style={styles.altButton}
                onPress={()=> {
                    setLogin(false)
                    navigation.setOptions({title: 'Register'})
                    }}>
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
    buttonDisabled: {
        padding: 10,
        backgroundColor: '#888888',
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