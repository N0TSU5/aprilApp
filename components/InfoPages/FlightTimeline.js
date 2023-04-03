import React, {Component} from 'react';
import Timeline from 'react-native-timeline-flatlist'
import BackgroundImage from '../../assets/loginBG4.png';
import {
    Text,
    ImageBackground,
    ScrollView,
    StyleSheet,
    View
} from 'react-native';

export class FlightTimeline extends Component {
  constructor(props){
    super(props)
    this.data = [
      {time: '07:00', title: 'Leave for Heathrow Airport', description: 'This journey should take around 40 minutes'},
      {time: '07:45', title: 'Check in your luggage', description: ''},
      {time: '08:00', title: 'Security Check', description: ''},
      {time: '08:30', title: 'Relax', description: ''},
      {time: '09:00', title: 'Gate 9 Opens', description: 'Head over to Gate 9, board the plane with Priority booking'},
      {time: '09:40', title: 'Take Off', description: 'Duration: 8 hours\nHave a nice flight'},
      {time: '18:00', title: 'Flight Over', description: 'Head over to...'},
      {time: '18:30', title: '......', description: '......'},
    ]
  }
  render() {
    return (
      <ImageBackground style={styles.background} source={BackgroundImage}>
      <Timeline 
        data={this.data}
        circleSize={20}
        circleColor='rgb(45,156,219)'
        lineColor='rgb(45,156,219)'
        titleStyle={{color:'white'}}
        timeContainerStyle={{minWidth:52, marginTop: -5}}
        timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding:5, borderRadius:13}}
        descriptionStyle={{color:'white'}}
        options={{style:{paddingTop:5}}}
        isUsingFlatlist={true}
        ScrollView
      />
    </ImageBackground>
    );
  }
}

/*const FlightTimeline = () => {

  const info_list = 

  return (
    <ImageBackground style={styles.background} source={BackgroundImage}>
     <ScrollView>
      <Timeline 
        data={info_list}
        circleSize={20}
        circleColor='rgb(45,156,219)'
        lineColor='rgb(45,156,219)'
        titleStyle={{color:'white'}}
        timeContainerStyle={{minWidth:52, marginTop: -5}}
        timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding:5, borderRadius:13}}
        descriptionStyle={{color:'white'}}
        options={{style:{paddingTop:5}}}
        isUsingFlatlist={true}
      />
     </ScrollView>
    </ImageBackground>
  )
}*/

const styles = StyleSheet.create({
    background: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
      borderWidth: 10,
      borderTopWidth: 0, 
      borderColor: '#4d0019',
    },
  })

//export default FlightTimeline;