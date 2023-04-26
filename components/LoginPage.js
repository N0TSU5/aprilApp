import React from 'react';
import { useState, useEffect } from 'react';
import BackgroundImage from '../assets/loginBG4.png';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  ImageBackground,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  KeyboardAvoidingView,
  Text,
  Platform,
  View,
  Keyboard,
} from 'react-native';
// imported dependencies

const LoginPage = () => {

  const navigation = useNavigation();
  const [email, setEmail] = useState();
  const [code, setCode] = useState();

  // on first render : 
  useEffect(() => {
    try {
      manageToken = async () => {
        const token = await AsyncStorage.getItem('@order_id');
        if (token !== null) {
          if (token != 'null') {
            // navigates directly to the home page if the user has logged in before
            navigation.navigate('MHome', { 'sKey': token });
          }
        }
      }
      manageToken()
    } catch(error){
      console.log(error)
    }
  }, [])

  // checks if the email address is valid before sending it to the API endpoint
  const robustCheck = () => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (email == null) {
      alert("Please enter your Email Address");
    }

    else if (!(emailRegex.test(email))) {
      alert("Please enter a valid Email Address");
    }

    else if (code == null) {
      alert("Please enter your given Authentication Code.\nIt has been sent to your Email Address");
    }

    else {
      verify();
    }

  }

  // sending the email and code to the user
  const verify = () => {
    fetch('http://137.205.157.163:4375/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: code,
      }),
    })
      .then((response) => response.text())
      .then((data) => {
        const token = JSON.parse(data).access_token
        if (token !== undefined) {
          localStore(token);
        } else {
          alert("Email or code is incorrect!\nPlease try again")
        }
      })
      .catch((error) => {
        console.error("verify error", error);
      });
  }

  // stores the local value of the order id to allow for future automatic login
  const localStore = async (value) => {
    try {
      await AsyncStorage.setItem('@order_id', value);
      navigation.navigate('MHome', { 'sKey': value });
    } catch (e) {
      console.log(e);
    }
  }

  return (

    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

      <View style={containterStyles.container}>
        <ImageBackground source={BackgroundImage} style={containterStyles.background}>

          <Text style={containterStyles.welcome}>Welcome</Text>

          <KeyboardAvoidingView
            behavior={Platform.OS === 'android' ? "padding" : 'position'}>

            <StatusBar style="auto" />

            <View style={inputStyles.inputView}>
              <TextInput
                style={inputStyles.textInput}
                placeholder="Email Address"
                placeholderTextColor="#003f5c"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={(email) => setEmail(email)}
                defaultValue={email}
              />
            </View>

            <View style={inputStyles.inputView}>
              <TextInput
                style={inputStyles.textInput}
                placeholder="Authentication Code"
                placeholderTextColor="#003f5c"
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={(code) => setCode(code)}
                defaultValue={code}
              />
            </View>

            <TouchableOpacity onPress={robustCheck} style={buttonStyles.loginBtn}>
              <Text style={buttonStyles.loginText}>Submit</Text>
            </TouchableOpacity>

          </KeyboardAvoidingView>

        </ImageBackground>
      </View>

    </TouchableWithoutFeedback>
  )
}

const inputStyles = StyleSheet.create({
  inputView: {
    backgroundColor: "#ffffff",
    borderRadius: 30,
    width: 300,
    height: 45,
    marginBottom: 10,
    alignItems: "center",
    alignSelf: 'center',
  },
  textInput: {
    height: 20,
    flex: 2,
    padding: 10,
    marginLeft: 10,
  },
})

const buttonStyles = StyleSheet.create({
  loginBtn: {
    width: "60%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#4a1c32",
    alignSelf: 'center',
    marginBottom: '10%',
  },
  loginText: {
    color: '#ff8533',
    fontSize: 23,
    fontWeight: 'bold',
  },
})

const containterStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    borderWidth: 10,
    borderTopWidth: 0,
    borderColor: '#4d0019',
  },
  welcome: {
    flex: 1,
    color: '#ff8533',
    fontSize: 56,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '25%',
    marginBottom: '7%',
  },
})

export default LoginPage;