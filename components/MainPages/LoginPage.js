import React from 'react';
import { useState, useEffect } from 'react';
import userData from '../../database/loginData';
import BackgroundImage from '../../assets/loginBG4.png';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PurpleLogo from '../../assets/purpleLogo.png';
import { 
  Image, 
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
  Linking,
  Keyboard,
} from 'react-native';

const LoginPage = () => {
  
  const navigation = useNavigation();
  const [email, setEmail] = useState();
  const [code, setCode] = useState();

  useEffect(() => {
    manageToken = async () => {
      const token = await AsyncStorage.getItem('@order_id'); 
        if(token !== null) {
            if(token != 'reset'){
              navigation.navigate('Home', {'sKey' : token});
            }
        }
    } 
    manageToken()
  }, []) 

  const robustCheck = () => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if(email == null){
      alert("Please enter your Email Address");
    }

    else if(!(emailRegex.test(email))){
      alert("Please enter a valid Email Address");
    }

    else if(code == null){
      alert("Please enter your given Authentication Code.\nIt has been sent to your Email Address");
    }

    else{
      verify();
    }

  }

  const localStore = async (value) => {
    try {
      await AsyncStorage.setItem('@order_id', value);
      navigation.navigate('Home', {'sKey' : value});
    } catch (e) {
      console.log(e);
    }
  }

  // FETCH + VERIFY CODE TO BE REPLACED BY PGSQL QUERY
  const verify = () => {
    const checkData = userData.users;
    for(let i=0; i<checkData.length; i++){  
      if(email == checkData[i].email && code == checkData[i].code){
        let datapoint = JSON.stringify(checkData[i].id)
        localStore("1026468");    
        return;
      }
    }
    alert("The Email and Authentication code do not match!\nPlease Try again!");
    setCode();
  }

  return (

  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
       <ImageBackground source={BackgroundImage} style={styles.image}>

        <Text style={styles.welcome}>Welcome</Text>

        <KeyboardAvoidingView 
          behavior={Platform.OS === 'android' ? "padding" : 'position'}>
       
        <StatusBar style="auto"/>
        
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput} 
            placeholder="Email Address"
            placeholderTextColor="#003f5c"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(email) => setEmail(email)}
            defaultValue={email}
          />
        </View> 

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput} 
            placeholder="Authentication Code"
            placeholderTextColor="#003f5c"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={(code) => setCode(code)}
            defaultValue={code}
          />
        </View> 

        <TouchableOpacity onPress={robustCheck} style={styles.loginBtn}>
          <Text style={styles.loginText}>Submit</Text>
        </TouchableOpacity> 

        </KeyboardAvoidingView>

      </ImageBackground> 
    </View>
  </TouchableWithoutFeedback> 

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    borderWidth: 10,
    borderTopWidth: 0, 
    borderColor: '#4d0019',
  },
  logo: {
    flex: 1,
    borderRadius: 80,
    resizeMode: 'contain',
    height: 150,
    width: 230,
    marginRight: '2%',
    alignSelf: 'flex-end',
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
  inputView: {
    backgroundColor: "#ffffff",
    borderRadius: 30,
    width: 300,
    height: 45,
    marginBottom: 10,
    alignItems: "center",
    alignSelf: 'center',  
  },
  TextInput: {
    height: 20,
    flex: 2,
    padding: 10,
    marginLeft: 10,
  },
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
  text: {
    color: '#0CBBA6',
    textAlign: 'center',
    fontSize: 20,
    textDecorationLine: 'underline',
    marginBottom: '28%',
    borderColor: 'black',
  }
})

export default LoginPage;