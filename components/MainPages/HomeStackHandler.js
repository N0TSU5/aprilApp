import React, { Component } from 'react';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment, { min } from 'moment';
import tripData from '../../database/tripData.json';
import { Text } from 'react-native';
import OnFlightHome from '../HomePages/OnFlight/OnFlightHome';
import PreTripHome from '../HomePages/PreTrip/PreTripHome';
import PostTripHome from '../HomePages/PostTrip/PostTripHome';
import InTripHome from '../HomePages/InTrip/InTripHome';
import TPHome from '../HomePages/PreTrip/TPHome';

<<<<<<< HEAD
import Realm from 'realm'
=======
import PouchDB from 'pouchdb-react-native';
import { v4 as uuidv4 } from 'uuid';

const db = new PouchDB('mainDB');
>>>>>>> a07af3ef0d0d51f198f0b62da455c40a9b6aae5f

const HomeStackHandler = ({ navigation, route }) => {

    const [relative, setRel] = useState();
    const [diff, setDiff] = useState();
    const [minDiff, setMinDiff] = useState();
    const [hrDiff, setHrDiff] = useState();
    const [sHrDiff, setSHDiff] = useState();
    const [name, setName] = useState();

    const [data, setData] = useState(null);
    const token = parseInt(route.params.sKey)
    const dbName = 'userDB'

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


   /* useEffect(() => {

        const tripFind = tripData.trips;
        const token = route.params.sKey

        for (let i = 0; i < tripFind.length; i++) {
            if (token == tripFind[i].id) {

                const fDate = tripFind[i].sDate;
                const eDate = tripFind[i].eDate;
                setName(tripFind[i].name);

                const date1 = moment();
                const date2 = moment(fDate);
                const dateE = moment(eDate);

                setSHDiff(dateE.diff(date1, 'hours'));
                setHrDiff(date2.diff(date1, 'hours'));
                setDiff(date2.diff(date1, 'days'));
                setMinDiff((date2.diff(date1, 'minutes')) - (60 * hrDiff));

                if (Math.floor(diff) == 0 && moment().isBefore(fDate)) {
                    setRel("onF"); setPoint("pre");
                }

                else if (Math.floor(diff) > 0 && moment().isBefore(fDate)) {
                    setRel('pre');
                }

                else if (moment().isAfter(eDate)) {
                    if (Math.abs(diff) > 0) {
                        setRel("pst");
                    }
                }

                else if (moment().isAfter(fDate) && moment().isBefore(eDate)) {
                    setRel("in");
                }
            }
        }
    }, [diff]);*/

    if (relative == 'onF') {
        return (<OnFlightHome name={name} rel={'pre'} hours={hrDiff} mins={minDiff} />)

    } else if (relative == 'pre') {
        return (<TPHome rela={relative} days={diff} uname={db.data.salesrepemail} title={db.data.tourname} />);

    } else if (relative == 'pst') {
        return (<PostTripHome />)

    } else if (relative == 'in') {
        return (<InTripHome name={name} day={1 - diff} />)

    } else {
        return (<TPHome/>)
    }

}


export default HomeStackHandler
