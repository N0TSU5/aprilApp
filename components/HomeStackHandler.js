import React from 'react';
import { useEffect, useState } from 'react';
import DPHome from './HomeDrawer';
import PouchDB from 'pouchdb-react-native';
import { v4 as uuidv4 } from 'uuid';

const HomeStackHandler = ({ navigation, route }) => {

    const [data, setData] = useState(null);
    const token = parseInt(route.params.sKey)

    const fetchData = async () => {
        try {
            const response = await fetch(`http://137.25.157.13:4375/bookings/${token}`)
            const json = await response.json()
            setData(json)
            console.log("aasdas")
        } catch (error) {}
    }

    const saveData = async () => {
        try {
            const db = new PouchDB('userDB')
            const doc = {
                _id: uuidv4(),
                data: data,
            }
            await db.put(doc)
            console.log("saved", doc.data.tourname)
        } catch (error) {
            console.error("save error:", error)
        }
    } 

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (data) {
            saveData();
        }
    }, [data]);

    return(
        <DPHome />
    )
}

export default HomeStackHandler
