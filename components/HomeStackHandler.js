import React from 'react';
import { useEffect, useState } from 'react';
import DPHome from './HomeDrawer';
import PouchDB from 'pouchdb-react-native';
import { v4 as uuidv4 } from 'uuid';

const HomeStackHandler = ({ navigation, route }) => {

    const [data, setData] = useState(null);
    const token = route.params.sKey

    const fetchData = async () => {
            fetch(`http://137.205.157.163:4375/api/${token}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then(response => {
                console.log("response is ",JSON.stringify(response))
                const json = response
                setData(json)
            })
            .catch(error => {
                console.error("home stack error", error)
            });

       /* try {
            const response = await fetch(`http://137.205.157.163:4375/bookings/${token}`)
            const json = await response.json()
        } catch (error) {
            console.log("home stack error", error)
        }*/
    }

    const saveData = async () => {
        try {
            const db = new PouchDB('userDB')
            const doc = {
                _id: uuidv4(),
                data: data,
            }
            await db.put(doc)
        } catch (error) {
            console.log("save error:", error)
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

    return (
        <DPHome />
    )
}

export default HomeStackHandler
