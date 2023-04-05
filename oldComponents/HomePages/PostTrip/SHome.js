import React from 'react';
import BackgroundImage from '../../../assets/loginBG4.png';
import "../../../ignoreWarnings";
import NativeDevSettings from 'react-native/Libraries/NativeModules/specs/NativeDevSettings';
import greyLogo from '../../../assets/greyLogo.png';
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

const SHome = ({navigation}) => {

  const clearData = async () => {
    try {
      await AsyncStorage.setItem(
        '@storage_Key',
        'reset'
      );
    } catch (error) {
      alert('error loggin out!');
    }
  };

  const logNav = async()=>{clearData();NativeDevSettings.reload();}

  return (
    <View style={styles.container}>
      <ImageBackground source={BackgroundImage} style={styles.background}>
          <Text style={styles.seems}>It seems that your trip has ended,</Text>

          <TouchableOpacity onPress={() => navigation.navigate('Itenary')}>
            <Text style={styles.upto}>View the holiday's Itinenary{'\n'}</Text>
          </TouchableOpacity>
          
          <View>
            <TouchableOpacity onPress={() => Linking.openURL('https://www.transindus.co.uk/enquiry/')}>
              <Text style={styles.upto}>Book another memorable trip with us{'\n'}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => navigation.navigate('Survey')}>
              <Text style={styles.kind}>We kindly ask that you help improve future holiday experiences by{'\n'}
              <Text style={styles.quick}>filling in our quick survey</Text></Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={logNav}>
            <Text style={styles.text}>Login Screen</Text>
          </TouchableOpacity> 

      </ImageBackground>      
      <View style={styles.titleContainer}><Image style={styles.title} source={greyLogo} /></View>
    </View>
  )
}

const styles = StyleSheet.create({
  list: {
    fontSize: 30,
  },
  seems: {
    flex: 1,
    color: '#ffffff',
    paddingTop: '15%',
    paddingLeft: '5%',
    fontSize: 40,
    textShadowColor: '#000000',
    textShadowRadius: 10,
    paddingBottom: '16%'
  },
  quick: {
    textDecorationLine: 'underline'
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  upto: {
    textDecorationLine: 'underline',
    color: '#ff9933',
    fontSize: 28,
    textAlign: 'left',
    textShadowColor: '#000000',
    textShadowRadius: 10,
    paddingLeft: '5%'
  },
  button: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingVertical: 12,
    paddingHorizontal: 43,
    marginHorizontal: '22%',
    marginBottom: '5%',
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'red',
  },
  kind: {
    fontSize: 20,
    textAlign: 'center',
    paddingBottom: '20%',
    color: '#66ffcc'
  },
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    borderWidth: 10,
    borderTopWidth: 0, 
    borderBottomWidth: 0,
    borderColor: '#4d0019',
  },
  title: {
    borderRadius: 20,
    height: 55,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  titleContainer: {
    backgroundColor: '#222425',
  }
})

export default SHome