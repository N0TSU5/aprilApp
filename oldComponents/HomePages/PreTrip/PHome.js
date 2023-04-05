import React from 'react';
import BackgroundImage from '../../../assets/rajasthan.png';
import Itenary from '../../InfoPages/Itenary';
import "../../../ignoreWarnings";
import NativeDevSettings from 'react-native/Libraries/NativeModules/specs/NativeDevSettings';
import PurpleLogo from '../../../assets/greyLogo.png';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { 
  View, 
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  ScrollView
} from "react-native";

const Stack = createStackNavigator();

const PHome = ({ rela, days, name }) => {
  return(
  <NavigationContainer independent={true}>
  <Stack.Navigator initialRouteName="Back">
    <Stack.Screen options={{headerShown: false}} name="Back">
      {props => <Home {...props} name={name} days={days} />}
    </Stack.Screen>
    <Stack.Screen options={{
     headerTitle: (props) => <ItenaryTitle {...props} />,
      headerStyle: {
        backgroundColor: '#660033',
        height: 70,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }}}
        name="Itenary">
      {props => <Itenary {...props} name={name} days={days} />}
    </Stack.Screen>
  </Stack.Navigator>
</NavigationContainer>
  )
}

const ItenaryTitle = () => {
  return(
    <View>
      <Text style={styles.your}>Your Itinerary</Text>
    </View>
  )
}

const Home = ({ navigation , days , name }) => {

  const clearData = async () => {
    try {
      await AsyncStorage.setItem(
        '@storage_Key',
        'reset'
      );
    } catch (error) {
      alert('error logging out!');
    }
  };

  const logNav = async()=>{clearData();NativeDevSettings.reload()}

  const dayNoun = (days == '1') ? 'day' : 'days';

  return(

    <View style={styles.container}>
      <View style={styles.container2}><Image source={PurpleLogo} style={styles.logo}/></View>
    
    <ImageBackground style={styles.image} source={BackgroundImage}>
  
        <Text style={styles.greeting}>Hello  {name},</Text>
        <Text style={styles.countdown}>Your Trip begins in {'\n'} {days} {dayNoun}</Text>
        
        <TouchableOpacity onPress={() => navigation.navigate('Itenary')}><Text style={styles.view}>
          View your Itinerary
        </Text></TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={logNav}>
          <Text style={styles.text}>Log Out</Text>
        </TouchableOpacity>

    </ImageBackground>
    </View>

  )
}

const styles = StyleSheet.create({
  container2: {
    backgroundColor: 'black',
  },
  logo: {
    borderRadius: 50,
    resizeMode: 'contain',
    height: 50,
    width: 200,
    alignSelf: 'center',
  },
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    borderWidth: 10,
    borderTopWidth: 0, 
    borderColor: '#4d0019',
  },
  greeting: {
    flex: 1,
    color: '#ffffff',
    paddingTop: '10%',
    paddingLeft: '5%',
    fontSize: 39,
    textShadowColor: '#000000',
    textShadowRadius: 10
  },
  your: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  countdown: {
    flex: 1,
    color: '#ffffff',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 39,
    textShadowColor: '#000000',
    textShadowRadius: 10
  },
  button: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginHorizontal: '32%',
    marginBottom: '5%',
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'red',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  view: {
    color: '#00e673',
    textAlign: 'center',
    textShadowColor: '#000000',
    textShadowRadius: 10,
    fontSize: 30,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    paddingBottom: '40%',
    borderColor: 'black',
  }
})

export default PHome;