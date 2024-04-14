import React, { useEffect, useState, useContext, memo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FFQForm from '../components/Forms/FFQ-56/FFQForm';
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
            console.log('setting questions again')
            setQuestions(resp.data)
        })
        .catch(err => console.log(err))
        setIsLoading(false);

        return () => {
            setIsLoading(false);
        }
    }, [])

    const _handleSubmit = (values) => {
        console.log('values: ', values)
        AuthAxios(userToken).post(
            "/api/submissions/submit",
            {
                form_id: 1,
                answers: questions.map((q) => {
                    return {
                        ...q,
                        answer_score: Number(values[q.field_code])
                    }
                })
            }
        )
        .then(async resp => {
            if (resp.data.success) {
                try {
                    await AuthAxios(userToken).post(
                        "/api/users/updateUserInfo",
                        {
                            dob: values.dob,
                            gender: values.gender,
                            origin: values.origin,
                        }
                    )
                    const userInfo = await AsyncStorage.getItem('userInfo');
                    const userParsed = JSON.parse(userInfo);
                    const newUserInfo = {
                        ...userParsed,
                        ffq_complete: 1
                    }
                    await AsyncStorage.setItem('userInfo', JSON.stringify(newUserInfo));
                } catch (err) {
                    console.log('Something went wrong')
                }
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

export default memo(FFQFormScreen);