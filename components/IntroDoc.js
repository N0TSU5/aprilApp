import React, { useEffect, useState } from 'react';
import "../ignoreWarnings";
import PouchDB from 'pouchdb-react-native';
import RenderHTML from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';
import {
    StyleSheet,
    ScrollView
} from "react-native";

const IntroDoc = () => {
    
    const { width } = useWindowDimensions();
    const [letter, setLetter] = useState('')

    useEffect(() => {
        const db = new PouchDB('userDB');
        db.allDocs({ limit: 1, include_docs: true })
            .then((result) => {
                const firstDoc = result.rows[0].doc;
                setLetter((firstDoc.data.letter));
            })
            .catch((err) => {
                console.error("tphome error", err);
            });
    }, []);

    return (
        <ScrollView>
            <RenderHTML source={{ html: letter }} tagsStyles={markupStyles} contentWidth={width} />
        </ScrollView>
    )
}

const markupStyles = StyleSheet.create({
    p: {
        fontSize: 20,
        color: '#333',
        lineHeight: 25,
        marginVertical: 10,
        marginLeft: 5
    },
    h1: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#333',
        marginVertical: 20,
    },
});

export default IntroDoc