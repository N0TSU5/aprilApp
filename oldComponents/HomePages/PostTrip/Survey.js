import React from 'react';
import SurveySlide from './SurveySlide'
import { 
  Text,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import SurveyText from './SurveyText';

const Survey = ({navigation}) => {

  const sumbitSurvey = () => {
    alert('Thank you for submitting this survey!')
    navigation.navigate('Back')
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior={{'padding' : 'height'}} style={{flex:1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
        
        <SurveyText title='Is there anything that you found uncomfortable during your hotel stay?' />
        <SurveySlide title='How smoothly did your flight transitions go?' max={5} id={0} />
        <SurveySlide title='What do you rate your taxi service?' max={5} id={0} />
        <SurveyText title='Is there anything that you found uncomfortable during your hotel stay?' />
        
        <TouchableOpacity onPress={sumbitSurvey} style={styles.loginBtn}>
          <Text style={styles.loginText}>Submit</Text>
        </TouchableOpacity> 

        </View>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  inner: {
    flex: 1,
    justifyContent: "space-around",
    paddingBottom: '55%'
  },
  loginBtn: {
    width: "60%",
    borderRadius: 25,
    height: 50, 
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#009900",
    alignSelf: 'center',  
    marginBottom: '10%',
  },
  loginText: {
    color: '#ff8533',
    fontSize: 23,
    fontWeight: 'bold',  
  },
})

export default Survey
