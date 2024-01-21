import React, { useEffect, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FFQForm from '../components/Forms/FFQForm';
import { AuthContext } from '../context/AuthContext';
import AuthAxios from '../services/AuthAxios';

const FFQFormScreen = ({ navigation }) => {
    const { userToken } = useContext(AuthContext)
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        AuthAxios(userToken).get("/api/questions/ffq")
        .then(resp => {
            setQuestions(resp.data)
        })
        .catch(err => console.log(err))
        setIsLoading(false);

        return () => {
            setIsLoading(false);
        }
    }, [])

    const _handleSubmit = (values) => {
        AuthAxios(userToken).post(
            "/api/submissions/submit",
            {
                dob: values.dob,
                gender: values.gender,
                origin: values.origin,
                answers: questions.map((q) => {
                    return {
                        ...q,
                        answer_score: Number(values[q.field_code])
                    }
                })
            }
        )
        .then(async resp => {
            console.log('resp.data: ', resp.data)
            if (resp.data.success) {
                const userInfo = await AsyncStorage.getItem('userInfo');
                const userParsed = JSON.parse(userInfo);
                const newUserInfo = {
                    ...userParsed,
                    ffq_complete: 1
                }
                await AsyncStorage.setItem('userInfo', JSON.stringify(newUserInfo));
                navigation.navigate('Drawer')
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <>
            {
                questions.length
                ?
                <FFQForm questions={questions} _handleSubmit={_handleSubmit} />
                :
                null
            }
        </>
    );
};

export default FFQFormScreen;