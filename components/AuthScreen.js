import React, {useState, useEffect} from 'react'
import {StyleSheet, Text, View, TextInput, TouchableOpacity, Image} from 'react-native'
import {useNavigation} from '@react-navigation/native'


export const AuthScreen = (props) => {
    
    const [login,setLogin] = useState(false)
    const [validEmail, setValidEmail] = useState(false)
    const [validPassword, setValidPassword] = useState(false)

    //For user credentials
    const [email,setEmail] = useState(null)
    const [password,setPassword] = useState(null)

    const navigation = useNavigation()

    useEffect(() => {
        // when user is 'logged in', navigates to homepage and change navbar to 'home'
        if( props.loggedIn ) {
          navigation.reset({
            index: 0,
            routes: [{ name: "Home"}]
          })
        }
      })

    //function: email input validation
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

    //function: password input validation
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
           
            <View style={styles.container}>

            {/* REGISTER LOGO SECTION */}
                <View style={styles.logoWrapper}>
                    {/* Icons made by <a href="https://www.flaticon.com/authors/eucalyp" title="Eucalyp">Eucalyp</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a> */}
                    <Image style={styles.icon} source={require('../assets/logo.png')} />
                    <Text style={styles.logoText}>EXpense Tracker</Text>
                </View>

            {/* user input email */}
                <TextInput style={styles.input} placeholder="Email"
                    onChangeText={(email) => validateEmail(email)}/>
            {/* user input password */}
                <TextInput style={styles.input} placeholder="Password" secureTextEntry={true}
                    onChangeText={(password) => validatePassword(password)}/>

            {/* Register button */}
                <TouchableOpacity 
                style={!validEmail || !validPassword ? styles.buttonDisabled : styles.buttonDisabled}
                disabled={ !validEmail || !validPassword ? true : false}
                onPress={() => {props.signup('register', email,password)}}>
                <Text style={styles.buttonText}>Register</Text></TouchableOpacity>

            {/* Already have an account? */}
                <Text style={styles.altText}>Already have an account?</Text>
            {/* Button: To change to sign in page  */}
                <TouchableOpacity 
                style={styles.altButton}
                onPress={()=> { setLogin(true)
                        navigation.setOptions({title: 'Sign In'})}}>
                    <Text style={styles.altButtonText}>Sign In</Text></TouchableOpacity>
            </View>
        )
    }
    else{
        return (
            //LOGIN VIEW
            <View style={styles.container}>
                {/* LOGIN LOGO SECTION */}
                <View style={styles.logoWrapper}>
                {/* Icons made by <a href="https://www.flaticon.com/authors/iconixar" title="iconixar">iconixar</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a> */}
                    <Image style={styles.icon} source={require('../assets/logo.png')} />
                    <Text style={styles.logoText}>EXpense Tracker</Text>
                </View>
            {/* user input email */}
                <TextInput style={styles.input} placeholder="Email"
                    onChangeText = {(email) => {setEmail(email)}}/>
            {/* user input password */}
                <TextInput style={styles.input} placeholder="Password" secureTextEntry={true}
                    onChangeText = {(password) => {setPassword(password)}}/>
            {/* Login button */}
                <TouchableOpacity style={styles.button}
                    onPress={ () => {props.signup('login', email, password)}}>
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
            {/* Don't have an account? */}
                <Text style={styles.altText}>Don't have an account?</Text>
            {/* Button: To register when user don't have account */}
                <TouchableOpacity style={styles.altButton} onPress={()=> { setLogin(false)
                    navigation.setOptions({
                    title: 'Register'})}}>
                    <Text style={styles.altButtonText}>Register</Text>
                </TouchableOpacity>

                <Text style={styles.text}>Or</Text>

                {/* FB Login button */}
                <TouchableOpacity style={styles.fbButton}>
                    <Image style={styles.iconBtn} source={require('../assets/facebook-brands.png')} />
                    <Text style={styles.buttonText}>Sign In With Facebook</Text>
                </TouchableOpacity>

                {/* Google Login button */}
                <TouchableOpacity style={styles.googleButton}>
                    <Image style={styles.iconBtn} source={require('../assets/google-plus-brands.png')} />
                    <Text style={styles.buttonText}>Sign In With Google</Text>
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
        width: 60,
        height: 60,
        marginLeft: 8
        
    },
    input: {
        
        borderWidth: 1,
        borderColor: '#D3D3D3',
        borderRadius: 7,
        height: 40,
        paddingLeft: 6,
        margin: 10,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    button: {
        padding: 13,
        backgroundColor:'#f4511e',
        borderRadius: 7,
        margin: 10,
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 2,},
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    buttonText: {
        color: '#eeeeee',
        textAlign: 'center'
    },
    buttonDisabled: {
        backgroundColor: '#f4511e',
        padding: 13,
        borderRadius: 7,
        margin: 10,
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 2,},
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
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
    },
    text:{
        color: 'black',
        textAlign: 'center',
    },
    socialBtn:{
        marginVertical: 15,
        borderRadius: 7,
        margin: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,},
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    fbButton: {
        display: 'flex',
        flexDirection: 'row',
        padding: 13,
        backgroundColor:'#4267B2',
        borderRadius: 7,
        margin: 10,
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 2,},
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4, 
    },
    googleButton: {
        display: 'flex',
        flexDirection: 'row',
        padding: 13,
        backgroundColor:'#D44638',
        borderRadius: 7,
        margin: 10,
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 2,},
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    iconBtn:{
        width: 20,
        height: 20,
        marginRight: 60 
    },
    logoText:{
        fontSize: 15,
        textDecorationLine: 'underline', 
    }
})