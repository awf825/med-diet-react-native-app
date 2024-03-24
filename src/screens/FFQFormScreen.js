import React, { useEffect, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FFQForm from '../components/Forms/FFQ-56/FFQForm';
import { AuthContext } from '../context/AuthContext';
import AuthAxios from '../services/AuthAxios';

const FFQFormScreen = ({ navigation }) => {
    const { userToken } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false);

    const _handleSubmit = (values, questions) => {
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
            <FFQForm _handleSubmit={_handleSubmit} />
        </>
    );
};

export default FFQFormScreen;