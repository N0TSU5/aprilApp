import React, { useEffect, useState } from 'react';
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';
import RenderHTML from 'react-native-render-html';
import PouchDB from 'pouchdb-react-native';
import "../ignoreWarnings";
import LoadingScreen from './LoadingScreen';
import { useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet,
    Modal
} from "react-native";
import { ScrollView } from 'react-native-gesture-handler';

const Survey = () => {

    const [data, setData] = useState();
    const [answers, setAns] = useState(new Set())
    const [resId, setResID] = useState()
    const [questions, setQuestions] = useState()
    const [fetchDataPromise, setFetchDataPromise] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {

        const token = await AsyncStorage.getItem('@order_id');

        fetch(`http://137.205.157.163:4375/api/bookings`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then(response => {
                return response.json();
            })
            .then(json => {
                return json[0].tems_order_id
            })
            .then(order_id => {
                fetch(`http://137.205.157.163:4375/api/feedback/${order_id}`, {
                    method: "GET",
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                })
                    .then(response => {
                        return response.json()
                    })
                    .then(data => {
                        setResID(data.tems_feedbackresponse_id)
                        return data.questions
                    })
                    .then(unformattedQuestions => {
                        const formattedQuestions = unformattedQuestions.map(question => {
                            return {
                                question: question.question,
                                feedbackresponseline_id: question.feedbackresponseline_id,
                                response_type: question.response_type,
                                response: question.response
                            }
                        })
                        setQuestions(formattedQuestions)
                        setIsLoading(false);
                    })
            })
    }

    useEffect(() => {
        const promise = fetchData();
        setFetchDataPromise(promise);
        return () => {
            promise.abort();
        };
    }, []);

    const handleAnswer = (response, feedbackresponseline_id) => {
        setAns(prevAnswers => ({
            ...prevAnswers,
            [feedbackresponseline_id]: response
        }));
        console.log(answers)
    };

    return (
        <ScrollView style={styles.container}>
            {isLoading ? (
                <LoadingScreen />
            ) : (
                questions.map((item, index) => (
                    <>
                        {item.response_type == 'S' &&
                            <View style={styles.questionContainer}>
                                <Text style={styles.question}>{item.question}</Text>
                                <TouchableOpacity onPress={() => handleAnswer('4', item.feedbackresponseline_id)}>
                                    <View style={styles.optionContainer}>
                                        <Text style={styles.optionText}>Excellent</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleAnswer('3', item.feedbackresponseline_id)}>
                                    <View style={styles.optionContainer}>
                                        <Text style={styles.optionText}>Very Good</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleAnswer('2', item.feedbackresponseline_id)}>
                                    <View style={styles.optionContainer}>
                                        <Text style={styles.optionText}>Good</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleAnswer('1', item.feedbackresponseline_id)}>
                                    <View style={styles.optionContainer}>
                                        <Text style={styles.optionText}>Satisfactory</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleAnswer('0', item.feedbackresponseline_id)}>
                                    <View style={styles.optionContainer}>
                                        <Text style={styles.optionText}>Poor</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }
                    </>
                ))
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    questionContainer: {
        marginBottom: 20,
    },
    question: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    optionText: {
        fontSize: 16,
        marginLeft: 10,
    },
    button: {
        backgroundColor: '#0066CC',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: '#444',
        fontSize: 18,
        textAlign: 'center',
    },
});

export default Survey