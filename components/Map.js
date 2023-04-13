import React, {useState, useEffect} from 'react';
import MapView, {Marker, Callout, PROVIDER_GOOGLE} from "react-native-maps";
import { Text, View, StyleSheet } from 'react-native';

const Map = () => {

  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const cities = [
      { name: 'Tokyo', description: 'The bustling capital of Japan', location: { latitude: 35.6895, longitude: 139.6917 } },
      { name: 'Katsura', description: 'A historic district in Kyoto', location: { latitude: 34.9823, longitude: 135.7015 } },
      { name: 'Shirahama', description: 'A scenic coastal town in Wakayama Prefecture', location: { latitude: 33.6959, longitude: 135.3053 } },
      { name: 'Kyoto', description: 'A former imperial capital known for its temples and shrines', location: { latitude: 35.0116, longitude: 135.7681 } },
      { name: 'Osaka', description: 'A lively city famous for its food and nightlife', location: { latitude: 34.6937, longitude: 135.5023 } },
      { name: 'Fukuoka', description: 'The largest city on the island of Kyushu', location: { latitude: 33.5904, longitude: 130.4017 } },
    ];

    const mapMarkers = cities.map(city => (
      <Marker
        key={city.name}
        coordinate={city.location}
        title={city.name}
        description={city.description}
      />
    ));

    setMarkers(mapMarkers);
  }, []);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={{
        latitude: 35.6895,
        longitude: 139.6917,
        latitudeDelta: 10,
        longitudeDelta: 10,
      }}>
        {markers}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default Map;