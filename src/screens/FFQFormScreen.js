import React, { useEffect, useState, useContext } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  StyleSheet
} from 'react-native';
import SurveyForm from '../components/Forms/SurveyForm';
import { AuthContext } from '../context/AuthContext';
import AuthAxios from '../services/AuthAxios';
import CustomButton from '../components/CustomButton/CustomButton';

const FFQFormScreen = ({ navigation }) => {
    const { userToken, logout } = useContext(AuthContext)
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        AuthAxios(userToken).get("/api/questions/")
        .then(resp => {
            resp.data.forEach(q => {
                console.log('question_field_type: ', q.question_field_type)
                q.question_field_type.question_answer_options.forEach(qq => {
                    console.log('qao: ', qq)
                })
            })
            setQuestions(resp.data)
            setIsLoading(false);
        })
        .catch(err => console.log(err))

        return () => {
            setIsLoading(false);
        }
    }, [])

    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center' }} >
            <FlatList
                data={questions}
                renderItem={({ item, index }) => (
                    <View testID={`form-item-${index}`} style={styles.item}>
                        <Text>{item.question_text}</Text>
                        <FlatList
                            columnWrapperStyle={{justifyContent: 'space-between'}}
                            data={item.question_field_type.question_answer_options}
                            numColumns={2}
                            renderItem={({ item, _index }) => (
                                <View style={{width: '45%'}}>
                                    <Text>{item.option_text}</Text>
                                </View>
                            )}
                            keyExtractor={item => item.option_id}
                        />
                    </View>
                )}
                keyExtractor={item => item.question_id}
            />
            <CustomButton label={"Logout"} onPress={logout} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});

export default FFQFormScreen;