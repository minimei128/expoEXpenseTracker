import React, {useState, useEffect} from 'react'
import {StyleSheet, Text, View, TextInput, TouchableOpacity, Image} from 'react-native'
import {useNavigation} from '@react-navigation/native'


export const AuthScreen = (props) => {
    //hook for login
    const [login,setLogin] = useState(false)
    //hooks for validation
    const [validEmail, setValidEmail] = useState(false)
    const [validPassword, setValidPassword] = useState(false)
    //hooks for user credentials
    const [email,setEmail] = useState(null)
    const [password,setPassword] = useState(null)


    const navigation = useNavigation()

    useEffect(() => {
        if( props.loggedIn ) {
          navigation.reset({
            index: 0,
            routes: [{ name: "Home"}]
          })
        }
      })

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
                <View style={styles.logoWrapper}>
                {/* Icons made by <a href="https://www.flaticon.com/authors/iconixar" title="iconixar">iconixar</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a> */}
                <Image style={styles.icon} source={require('../assets/logo.png')} />
                </View>
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
                onPress={() => {props.signup('register', email,password)}}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
            {/* Already have an account? */}
                <Text style={styles.altText}>Already have an account?</Text>
            {/* Button: Sign In after registered as user  */}
                <TouchableOpacity 
                style={styles.altButton}
                onPress={()=> {
                        setLogin(true)
                        navigation.setOptions({title: 'Sign In'
                    })
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
                <View style={styles.logoWrapper}>
                {/* Icons made by <a href="https://www.flaticon.com/authors/iconixar" title="iconixar">iconixar</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a> */}
                    <Image style={styles.icon} source={require('../assets/logo.png')} />
                </View>
            {/* user input email */}
                <TextInput
                style={styles.input} 
                placeholder="Email"
                onChangeText = {(email) => {setEmail(email)}}/>
            {/* user input password */}
                <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText = {(password) => {setPassword(password)}}
                />
            {/* Login button */}
                <TouchableOpacity 
                style={styles.button}
                onPress={ () => {props.signup('login', email, password)}}>
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
            {/* Don't have an account? */}
                <Text style={styles.altText}>Don't have an account?</Text>
            {/* Button: To register when user don't have account */}
                <TouchableOpacity 
                style={styles.altButton}
                onPress={()=> {
                    setLogin(false)
                    navigation.setOptions({
                    title: 'Register'
                        })
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
    logoWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 30
    },
    icon:{
        width: 100,
        height: 100,
        marginRight: 10
        
    },
    input: {
        
        borderWidth: 1,
        borderColor: '#D3D3D3',
        borderRadius: 7,
        height: 40,
        paddingLeft: 6,
        margin: 10,
        backgroundColor: 'white'
    },
    button: {
        padding: 13,
        backgroundColor:'#f4511e',
        borderRadius: 7,
        margin: 10
    
    },
    buttonText: {
        color: '#eeeeee',
        textAlign: 'center'
    },
    buttonDisabled: {

        backgroundColor: '#f4511e',
        padding: 13,
        borderRadius: 7,
        margin: 10
    },
    altText:{
        textAlign: 'center',
        marginTop: 20,
    },
    altButton:{
        marginTop: 10,
        padding: 10,
        textAlign: 'center'
    },
    altButtonText:{
        color: '#f4511e',
        textAlign: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        paddingBottom: 10
    }
})