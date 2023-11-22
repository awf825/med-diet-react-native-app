import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import AppPicker from "../components/AppPicker/AppPicker"
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  StatusBar,
  Text,
  View
} from 'react-native';
import { BASE_URL } from '../config';

const SurveyScreen = ({ navigation }) => {
    const [questions, setQuestions] = useState([]);

    let options = [];
    for (let i = 0; i <= 30; i++) {
        options.push({
            label: String(i),
            value: i
        })
    }

    useEffect(() => {
        axios.get(`${BASE_URL}/api/questions/`)
        .then(resp => {
            setQuestions(resp.data)
        })
        .catch(err => console.log(err))
    }, [])

    const _renderItem = ({item, index}) => (
        // <FormBlock item={item} index={index} />
        <View style={styles.item}>
            {
                <AppPicker 
                    label={item.question_text}
                    options={options} 
                />
            }
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                testId={"LIST"}
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