import React, { useState, useEffect } from 'react';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";
import { Text, View, StyleSheet } from 'react-native';
import PouchDB from 'pouchdb-react-native';

const Map = () => {

  const [accomList, setList] = useState([])

  useEffect(() => {
    const db = new PouchDB('userDB');
    db.allDocs({ limit: 1, include_docs: true })
      .then((result) => {
        const firstDoc = result.rows[0].doc;
        const accomsObj = firstDoc.data.accommodation
        setList(Object.keys(accomsObj).map(key => accomsObj[key]))
      })
      .catch((err) => {
        console.error("accoms error", err);
      });
  }, []);

  const hotels = []
  for (let i = 0; i < accomList.length; i++) {
    const currentItem = accomList[i]
    const address = currentItem.address
    const name = currentItem.name
    const phone = currentItem.phone
    hotels.push({ name: name, address: address, phone: phone })
  }

  const [markers, setMarkers] = useState([])
  for (let hotel in hotels) {
    const address = hotel.address

  }

  console.log(hotels)

  return (
    <MapView
        provider={PROVIDER_GOOGLE}
    />

  )
}

export default Map