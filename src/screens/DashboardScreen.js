import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar
} from 'react-native';
import CustomButton from '../components/CustomButton/CustomButton';
// https://www.npmjs.com/package/react-native-circular-progress
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import AuthAxios from '../services/AuthAxios';

const DashboardScreen = ({ navigation }) => {
  const { userToken } = useContext(AuthContext)
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    navigation.addListener('focus', () => {
      AuthAxios(userToken).get("/api/submissions/")
      .then(resp => { setSubmissions(resp.data) })
      .catch(err => console.log(err))
    });
  }, [navigation]);

  const _renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>Submission ID: {item.submission_id}</Text>
      <Text>Score: {item.score} / 151</Text>
      <AnimatedCircularProgress
        size={120}
        width={15}
        fill={Number(item.score) / 151 * 100}
        tintColor="#00e0ff"
        onAnimationComplete={() => console.log('onAnimationComplete')}
        backgroundColor="#3d5875" 
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={submissions}
        renderItem={_renderItem}
        keyExtractor={item => item.submission_id}
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
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default DashboardScreen;