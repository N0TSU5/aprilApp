import React, { useState, useEffect } from 'react';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Text, View, StyleSheet } from 'react-native';
import PouchDB from 'pouchdb-react-native';
import LoadingScreen from './LoadingScreen';

const Map = () => {
  const [markers, setMarkers] = useState([]);
  const [initialRegion, setInitialRegion] = useState(null);
  const [startLatitude, setStartLatitude] = useState(null);
  const [startLongitude, setStartLongitude] = useState(null);

  useEffect(() => {
    const db = new PouchDB('userDB');
    db.allDocs({ limit: 1, include_docs: true })
      .then((result) => {
        const firstDoc = result.rows[0].doc;
        const accomsObj = firstDoc.data.accommodation;
        const hotels = Object.keys(accomsObj).map(key => accomsObj[key]);

        const fetchCoordinates = async () => {
          const updatedMarkers = [];

          for (let i in hotels) {
            let hotel = hotels[i];
            const address = hotel.address;
            try {
              const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                  address
                )}&key=AIzaSyAczEFkNSb5gh-RHipcm9ubg_w3t_P1w1I`
              );
              const data = await response.json();
              if (data.results.length > 0) {
                const location = data.results[0].geometry.location;
                const latitude = location.lat;
                const longitude = location.lng;

                if (i === '0') {
                  setStartLatitude(latitude);
                  setStartLongitude(longitude);
                }

                const marker = (
                  <Marker
                    key={i}
                    coordinate={{ latitude: latitude, longitude: longitude }}
                    title={hotel.name}
                    description={hotel.address}
                  />
                );
                updatedMarkers.push(marker);
              }
            } catch (error) {
              console.error('Error occurred while geocoding:', error);
            }
          }

          setMarkers(updatedMarkers);
        };

        fetchCoordinates();
      })
      .catch((err) => {
        console.error('accoms error', err);
      });
  }, []);

  useEffect(() => {
    if (startLatitude !== null && startLongitude !== null) {
      setInitialRegion({
        latitude: startLatitude,
        longitude: startLongitude,
        latitudeDelta: 20,
        longitudeDelta: 20,
      });
    }
  }, [startLatitude, startLongitude]);

  return (
    <>
      {initialRegion !== null ? (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={initialRegion}
          showsUserLocation
          followsUserLocation
        >
          {markers}
        </MapView>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default Map;
