import React, { useEffect, useState } from 'react';
import "../ignoreWarnings";
import PouchDB from 'pouchdb-react-native';
import RenderHTML from 'react-native-render-html';
import moment from 'moment'
import { useWindowDimensions } from 'react-native';
import {
    StyleSheet,
    View,
    ScrollView,
    Text
} from "react-native";

const Footnotes = () => {

    const { width } = useWindowDimensions();
    const [footnotes, setList] = useState([])

    useEffect(() => {
        const db = new PouchDB('userDB');
        db.allDocs({ limit: 1, include_docs: true })
            .then((result) => {
                const firstDoc = result.rows[0].doc;
                const footnotesObj = firstDoc.data.footnotes
                setList(Object.keys(footnotesObj).map(key => footnotesObj[key]))
            })
            .catch((err) => {
                console.error("tphome error", err);
            });
    }, []);



    return (
        <ScrollView>
          
        </ScrollView>
    )
}

export default Footnotes