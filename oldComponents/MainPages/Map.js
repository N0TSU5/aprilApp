import React from 'react';
import MapView, {Marker, Callout, PROVIDER_GOOGLE} from "react-native-maps";
import { Text, View, StyleSheet } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

const markers = [
    {
        longitude: 28.614587072241266,
        latitude: 77.10008692645982,
      
      title: "The Grand New Delhi",
      description: "The hotel you are staying at",
      key : 0
    },
    {
        longitude: 28.594587072241266,
        latitude: 77.20008692645982,
      
      title: "Day 3",
      description: "The Lotus Temple",
      key : '1'
    },
    {
      longitude: 28.624587072241266,
      latitude: 77.19008692645982,
    
      title: "Day 5",
      description: "Lodhi Garden",
      key : '2'
    },
  ]


const Map = () => {

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 28.604587072241266,
          longitude: 77.15008692645982,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        }}>
        {markers.map(marker => (
          <Marker
            key={marker.key}
            pinColor="purple"
            coordinate={{
              latitude: marker.longitude,
              longitude: marker.latitude
            }}          
            title="This is a title"
            description="This is a description" >
              <Ionicons name='eye' size={30} color={"darkblue"}/>
            <Callout style={{width: 90}}>
              <View>
                <Text style={{ fontWeight: 'bold'}}>{marker.title}{'\n'}</Text>
                <Text>{marker.description}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1, 
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Map;