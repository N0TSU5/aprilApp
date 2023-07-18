import React from 'react';
import { useEffect, useState } from 'react';
import HomeDrawer from './HomeDrawer';
import PouchDB from 'pouchdb-react-native';
import { v4 as uuidv4 } from 'uuid';
import LoadingScreen from './LoadingScreen'

const HomeStackHandler = ({ navigation, route }) => {

    const [data, setData] = useState(null);
    const [fetched, setFetch] = useState(false)
    const token = route.params.sKey

    const fetchData = async () => {
        fetch(`http://137.205.157.163:4375/api/bookings`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        }) //tems_order_id
            .then(response => {
                return response.json();
            })
            .then(json => {
                return json[0].tems_order_id
            })
            .then(order_id => {
                fetch(`http://137.205.157.163:4375/api/booking/${order_id}`, {
                    method: "GET",
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                })
                    .then(response => {
                        return response.json()
                    })
                    .then(json => {
                        setData(json)
                    })
            })
            .catch(error => {
                console.log("home stack error", error)
            });
    }

    const saveData = async () => {
        try {
            const db = new PouchDB('userDB')
            await db.destroy().then(() => {
                const doc = {
                    _id: uuidv4(),
                    data: data,
                }
                const db2 = new PouchDB('userDB')
                db2.put(doc)
                console.log(doc)
            })            
        } catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (data) {
            saveData();
        }
        setFetch(true)
        console.log("home stack done",data)
    }, []);

    return fetched ? <HomeDrawer data={data} /> : <LoadingScreen />;
}

export default HomeStackHandler
