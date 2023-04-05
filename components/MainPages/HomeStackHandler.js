import React, {Component} from 'react';
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

import Realm from 'realm'

const HomeStackHandler = ({ navigation, route }) => {
    
    const token = parseInt(route.params.sKey)
    const [relative, setRel] = useState();
    const [diff, setDiff] = useState();
    const [minDiff, setMinDiff] = useState();
    const [hrDiff, setHrDiff] = useState();
    const [sHrDiff, setSHDiff] = useState();
    const [sMinDiff, setSMDiff] = useState();
    const [name, setName] = useState();
    const [point, setPoint] = useState();
    const [time, setTime] = useState();
    const [fDate, setFDate] = useState();

    const fetchData = async () => {
        try{
            const response = await fetch(`http://137.205.157.163:4375/bookings/${token}`);
            const json = await response.json();
            console.log(json)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(()=>{ 
            
        const tripFind = tripData.trips; 
        const token = route.params.sKey  

        for(let i=0; i<tripFind.length; i++){  
            if(token == tripFind[i].id){

                const fDate = tripFind[i].sDate;
                const eDate = tripFind[i].eDate;
                const eTime = tripFind[i].eTime;
                setName(tripFind[i].name);

                const date1 = moment();
                const date2 = moment(fDate);
                const dateE = moment(eDate); 
                
                setSHDiff(dateE.diff(date1,'hours'));
                setSMDiff(dateE.diff(date1,'minutes') - (60 * sHrDiff));

                setHrDiff(date2.diff(date1, 'hours')); 
                setDiff(date2.diff(date1, 'days')); 
                setMinDiff((date2.diff(date1, 'minutes')) - (60 * hrDiff));
                setTime(eTime);

                if(Math.floor(diff) == 0 && moment().isBefore(fDate)) {
                    setRel("onF"); setPoint("pre"); 
                }

                else if(Math.floor(diff) > 0 && moment().isBefore(fDate)) {
                    setRel('pre');
                }
                
                else if(moment().isAfter(eDate)) { 
                    if(Math.abs(diff) > 0){ 
                        setRel("pst"); 
                    }                
                } 

                else if(moment().isAfter(fDate) && moment().isBefore(eDate)) { 
                    setRel("in"); 
                }     
            } 
        }
    }, [diff]);  

    if(relative=='onF'){
        return(<OnFlightHome name={name} rel={'pre'} hours={hrDiff} mins={minDiff}/>)

    } else if(relative=='pre'){
       return(<TPHome rela={relative} days={diff} uname={name} title={'Land of Tigers with Transindus'}/>);

    } else if(relative=='pst'){
        return(<PostTripHome />)

    } else if(relative=='in'){
        return(<InTripHome name={name} day={1-diff}/>)

    } else{
        return(<Text>{relative}</Text>)
    }
    
    }


export default HomeStackHandler
