import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import FormBlock from '../components/FormBlock/FormBlock';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  StatusBar
} from 'react-native';
import { BASE_URL } from '../config';

const SurveyScreen = ({ navigation }) => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        axios.get(`${BASE_URL}/api/questions/`)
        .then(resp => {
            console.log(resp.data) 
            setQuestions(resp.data)
        })
        .catch(err => console.log(err))
    }, [])

    const _onPress = (item) => {
        console.log('_onPress: ', item)
    }

    const _renderItem = ({item}) => (
        <FormBlock item={item} />
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={questions}
                renderItem={_renderItem}
                keyExtractor={item => item.question_id}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    // backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default SurveyScreen;