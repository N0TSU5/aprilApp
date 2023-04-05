import React from 'react';
import HomeStackHandler from './HomeStackHandler';
import Login from './LoginPage';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

const MainStackHandler = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName={'Login'}>   
        <Stack.Screen options={{headerShown: false}} name="MHome" component={HomeStackHandler}/>
        <Stack.Screen options={{headerShown: false}} name="Login" component={Login}/>   
      </Stack.Navigator> 
    </NavigationContainer>
  )
}

export default MainStackHandler;