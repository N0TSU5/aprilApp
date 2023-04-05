import React from 'react';
import BackgroundImage from '../../../assets/rajasthan.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Itenary from '../../InfoPages/Itenary';
import PurpleLogo from '../../../assets/greyLogo.png';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Survey from './Survey';
import { 
  View, 
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet
} from "react-native";
import SHome from './SHome';

const Stack = createStackNavigator();

const PostTripHome = () => {
  return(
  <NavigationContainer independent={true}>
  <Stack.Navigator initialRouteName="Back">

    <Stack.Screen options={{headerShown: false}} component={SHome} name="Back" />
    
    <Stack.Screen options={{
     headerTitle: () => <ItenaryTitle titletext={'Your Itinenary'}/>,
      headerStyle: {
        backgroundColor: '#660033',
        height: 70,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }}}
        name="Itenary" component={Itenary} />

    <Stack.Screen options={{
     headerTitle: () => <ItenaryTitle titletext={'Trip Feedback'}/>,
      headerStyle: {
        backgroundColor: '#660033',
        height: 70,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }}}
        name="Survey" component={Survey} />  

  </Stack.Navigator>
  </NavigationContainer>
  )
}

const ItenaryTitle = ({titletext}) => {
  return(
    <View>
      <Text style={styles.your}>{titletext}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  your: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'right',
  },
})

export default PostTripHome