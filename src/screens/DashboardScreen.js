import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  ScrollView,
  ActivityIndicator
} from 'react-native';
// https://www.npmjs.com/package/react-native-circular-progress
// import { AnimatedCircularProgress, CircularProgress } from 'react-native-circular-progress';
import CircularProgress from 'react-native-circular-progress-indicator';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import AuthAxios from '../services/AuthAxios';
import { ScoreWidget } from '../components/Widgets/ScoreWidget';
import { DualIndicatorWidget } from '../components/Widgets/DualIndicatorWidget';

const DashboardScreen = ({ navigation }) => {
  const { userToken } = useContext(AuthContext)
  const [submissions, setSubmissions] = useState([]);
  const [answersByCategory, setAnswersByCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    navigation.addListener('focus', () => {
      setIsLoading(true)
      AuthAxios(userToken).get("/api/submissions/getAnswersByCategory")
        .then(resp => {
          console.log('resp.data: ', resp.data)
          setSubmissions(resp.data)
          setAnswersByCategory(resp.data)
          setIsLoading(false);
        })
        .catch(err => console.log(err))
    });
  }, [navigation]);

      {/* {
        index % 4 === 0 ?
          <>
            <BannerAd
              size={BannerAdSize.BANNER}
              unitId={TestIds.BANNER}
              onAdLoaded={() => {
                console.log('Advert loaded');
              }}
              onAdFailedToLoad={error => {
                console.error('Advert failed to load: ', error);
              }}
            />
            <Text>Category: {item.category_display_name}</Text>
            <Text>Score: {item.score} / {item.answer_number}</Text>
            <AnimatedCircularProgress
              size={120}
              width={15}
              fill={(item.score / (item.answer_number)) * 100}
              tintColor="#00e0ff"
              onAnimationComplete={() => console.log('onAnimationComplete')}
              backgroundColor="#3d5875"
            />
          </> :
          <>
            <Text>Category: {item.category_display_name}</Text>
            <Text>Score: {item.score} / {item.answer_number}</Text>
            <AnimatedCircularProgress
              size={120}
              width={15}
              fill={(item.score / (item.answer_number)) * 100}
              tintColor="#00e0ff"
              onAnimationComplete={() => console.log('onAnimationComplete')}
              backgroundColor="#3d5875"
            />
          </>
      } */}

  return (
    <ScrollView style={styles.container}>
      {
        answersByCategory.length > 0 &&
        <>
          <ScoreWidget answersByCategory={answersByCategory} isLoading={isLoading} />
          <DualIndicatorWidget answersByCategory={answersByCategory} isLoading={isLoading} />
        </>
      }
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  colorLabel: {
    width: "auto",
    height: "auto",
    backgroundColor: "red"
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#000',
    marginTop: StatusBar.currentHeight || 0,
  },
  scoresContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },
  legendContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  progressIndicator: {
    width: '50%'
  },
  label: {
    color: '#ecf0f1'
  },
});

export default DashboardScreen;