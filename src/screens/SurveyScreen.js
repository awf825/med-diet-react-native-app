import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import InputField from '../components/InputField';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar
} from 'react-native';
import { BASE_URL } from '../config';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First SURVEY Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second SURVEY Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third SURVEY Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third SURVEY Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third SURVEY Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third SURVEY Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third SURVEY Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third SURVEY Item',
  },
];


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
        <View style={styles.item}>
            <Text>{item.question_text}</Text>
            {
                item.field_type === "INT" ?
                <InputField
                    // label={'Password'}
                    keyboardType='numeric'
                    // inputType="numeric"
                    // icon={
                    // <Ionicons
                    //     name="ios-lock-closed-outline"
                    //     size={20}
                    //     color="#666"
                    //     style={{marginRight: 5}}
                    // />
                    // }
                    // fieldButtonLabel={"Forgot?"}
                    // fieldButtonFunction={() => {}}
                    // value={password}
                    // onChangeText={text => setPassword(text)}
                /> :
                null
            }
        </View>
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