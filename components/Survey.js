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

    const [answers, setAnswers] = useState({})
    const [resId, setResID] = useState()
    const [questions, setQuestions] = useState()
    const [fetchDataPromise, setFetchDataPromise] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [questionLength, setLength] = useState()
    const [orderID, setOrder] = useState()

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
                setOrder(order_id)
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
                        setLength(data.questions.length - 1)
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
        const controller = new AbortController();
        controller.abort();
    }, []);

    const handleAnswer = (response, feedbackresponseline_id) => {
        answers[feedbackresponseline_id] = response
    };

    const handleOnSubmit = async () => {
        try {
                   
            const token = await AsyncStorage.getItem('@order_id');
            const formattedEntries = Object.entries(answers)

            const formattedList = formattedEntries.map((item) => ({
                feedbackresponseline_id: item[0],
                response: item[1],
            }));

            const payload = {
                tems_feedbackresponse_id: orderID,
                questions: formattedList,
            };
            console.log(formattedEntries)

            const response = await fetch('http://137.205.157.163:4375/api/bookings', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });
            if (!response.ok) {
                throw new Error('Failed to submit feedback');
            }
        } catch (error) {
            console.log(error);
        }
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
                                        <Text style={[styles.optionText, answers[item.feedbackresponseline_id] === '4' && { color: 'blue', fontWeight: 'bold' }]}>Excellent</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleAnswer('3', item.feedbackresponseline_id)}>
                                    <View style={styles.optionContainer}>
                                        <Text style={[styles.optionText, answers[item.feedbackresponseline_id] === '3' && { color: 'blue', fontWeight: 'bold' }]}>Very Good</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleAnswer('2', item.feedbackresponseline_id)}>
                                    <View style={styles.optionContainer}>
                                        <Text style={[styles.optionText, answers[item.feedbackresponseline_id] === '2' && { color: 'blue', fontWeight: 'bold' }]}>Good</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleAnswer('1', item.feedbackresponseline_id)}>
                                    <View style={styles.optionContainer}>
                                        <Text style={[styles.optionText, answers[item.feedbackresponseline_id] === '1' && { color: 'blue', fontWeight: 'bold' }]}>Satisfactory</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleAnswer('0', item.feedbackresponseline_id)}>
                                    <View style={styles.optionContainer}>
                                        <Text style={[styles.optionText, answers[item.feedbackresponseline_id] === '0' && { color: 'blue', fontWeight: 'bold' }]}>Poor</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }
                        {item.response_type == 'I' &&
                            <View style={styles.questionContainer}>
                                <Text style={styles.question}>{item.question}</Text>
                                <TouchableOpacity onPress={() => handleAnswer('4', item.feedbackresponseline_id)}>
                                    <View style={styles.optionContainer}>
                                        <Text style={[styles.optionText, answers[item.feedbackresponseline_id] === '4' && { color: 'blue', fontWeight: 'bold' }]}>Essential</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleAnswer('3', item.feedbackresponseline_id)}>
                                    <View style={styles.optionContainer}>
                                        <Text style={[styles.optionText, answers[item.feedbackresponseline_id] === '3' && { color: 'blue', fontWeight: 'bold' }]}>Very Important</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleAnswer('2', item.feedbackresponseline_id)}>
                                    <View style={styles.optionContainer}>
                                        <Text style={[styles.optionText, answers[item.feedbackresponseline_id] === '2' && { color: 'blue', fontWeight: 'bold' }]}>Important</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleAnswer('1', item.feedbackresponseline_id)}>
                                    <View style={styles.optionContainer}>
                                        <Text style={[styles.optionText, answers[item.feedbackresponseline_id] === '1' && { color: 'blue', fontWeight: 'bold' }]}>Desirable</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleAnswer('0', item.feedbackresponseline_id)}>
                                    <View style={styles.optionContainer}>
                                        <Text style={[styles.optionText, answers[item.feedbackresponseline_id] === '0' && { color: 'blue', fontWeight: 'bold' }]}>Passable</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }
                        {item.response_type == 'Y' &&
                            <View style={styles.questionContainer}>
                                <Text style={styles.question}>{item.question}</Text>
                                <TouchableOpacity onPress={() => handleAnswer('Y', item.feedbackresponseline_id)}>
                                    <View style={styles.optionContainer}>
                                        <Text style={[styles.optionText, answers[item.feedbackresponseline_id] === 'Y' && { color: 'blue', fontWeight: 'bold' }]}>Yes</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleAnswer('N', item.feedbackresponseline_id)}>
                                    <View style={styles.optionContainer}>
                                        <Text style={[styles.optionText, answers[item.feedbackresponseline_id] === 'N' && { color: 'blue', fontWeight: 'bold' }]}>No</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }
                        {item.response_type == 'C' &&
                            <View style={styles.questionContainer}>
                                <Text style={styles.question}>{item.question}</Text>
                                <TouchableOpacity onPress={() => handleAnswer('Y', item.feedbackresponseline_id)}>
                                    <View style={styles.optionContainer}>
                                        <Text style={[styles.optionText, answers[item.feedbackresponseline_id] === 'Y' && { color: 'blue', fontWeight: 'bold' }]}>Yes</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleAnswer('N', item.feedbackresponseline_id)}>
                                    <View style={styles.optionContainer}>
                                        <Text style={[styles.optionText, answers[item.feedbackresponseline_id] === 'N' && { color: 'blue', fontWeight: 'bold' }]}>No</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleAnswer('C', item.feedbackresponseline_id)}>
                                    <View style={styles.optionContainer}>
                                        <Text style={[styles.optionText, answers[item.feedbackresponseline_id] === 'C' && { color: 'blue', fontWeight: 'bold' }]}>Please check</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }
                        {item.response_type == 'M' &&
                            <View style={styles.questionContainer}>
                                <Text style={styles.question}>{item.question}</Text>
                                <TouchableOpacity onPress={() => handleAnswer('Y', item.feedbackresponseline_id)}>
                                    <View style={styles.optionContainer}>
                                        <Text style={[styles.optionText, answers[item.feedbackresponseline_id] === 'Y' && { color: 'blue', fontWeight: 'bold' }]}>Yes</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleAnswer('M', item.feedbackresponseline_id)}>
                                    <View style={styles.optionContainer}>
                                        <Text style={[styles.optionText, answers[item.feedbackresponseline_id] === 'M' && { color: 'blue', fontWeight: 'bold' }]}>Maybe</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleAnswer('N', item.feedbackresponseline_id)}>
                                    <View style={styles.optionContainer}>
                                        <Text style={[styles.optionText, answers[item.feedbackresponseline_id] === 'N' && { color: 'blue', fontWeight: 'bold' }]}>No</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }
                    </>
                ))
            )}
            <TouchableOpacity onPress={handleOnSubmit} style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        marginTop: 40,
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
    submitButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        alignSelf: 'center',
        marginTop: 20,
    },
    submitButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default Survey