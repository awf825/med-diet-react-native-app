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
import ProgressBar from 'react-native-animated-progress';
// https://www.npmjs.com/package/react-native-circular-progress
// import { AnimatedCircularProgress, CircularProgress } from 'react-native-circular-progress';
import AnimatedCircularProgress from 'react-native-circular-progress-indicator';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import AuthAxios from '../services/AuthAxios';
import { ScoreWidget } from '../components/Widgets/ScoreWidget';
import { DualIndicatorWidget } from '../components/Widgets/DualIndicatorWidget';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import iconMap from '../services/iconMap';

const DashboardScreen = ({ navigation }) => {
  const { userToken } = useContext(AuthContext)
  const [submissions, setSubmissions] = useState([]);
  const [answersByCategory, setAnswersByCategory] = useState([]);
  const [FFQBaselineStats, setFFQBaselineStats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [notEnoughData, setNotEnoughData] = useState(false);

  useEffect(() => {
    navigation.addListener('focus', () => {
      setIsLoading(true)
      AuthAxios(userToken).get("/api/submissions/getDashboard")
        .then(resp => {
          console.log('resp.data: ', resp.data)
          setSubmissions(resp.data.answersByCategory)
          setAnswersByCategory(resp.data.answersByCategory)
          setFFQBaselineStats(resp.data.ffqResponse)
          setIsLoading(false);
        })
        .catch(err => console.log(err))
    });

    return () => {
      setIsLoading(false);
    }
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
        <>
          <View style={styles.widgetContainer}>
            <Text>FFQ</Text>
            <View style={styles.textBubble}>
                <FlatList
                    data={FFQBaselineStats}
                    renderItem={({item}) => <View>
                        <View>
                          {/* <FontAwesomeIcon icon={iconMap[item.field_code]} /> */}
                          <Text>{item.question_text}</Text>
                          <Text>{item.success ? 'SUCCESS!' : 'FAIL'}</Text>
                        </View>
                      </View>
                    }
                />
            </View>
            <Text>----Link to Custom Generator</Text>
          </View>
          <View style={styles.widgetContainer}>
            {
              notEnoughData ?
              <Text>Not enoough data</Text> :
              <>
                <Text>SURVEY AND PROGRESS</Text>
                <View style={styles.textBubble}>
                  {/* <View>
                    <Text>Submissions: </Text>
                    <Text>Last submission: </Text>
                    <Text>Streak: </Text>
                    <Text>Survey Now</Text>
                  </View> */}
                  <View styles={styles.progressContainer}>
                    <FlatList
                      data={answersByCategory}
                      renderItem={({item}) => <View style={styles.progressItem}>
                          <View>
                            <Text>{item.category_display_name}</Text>
                          </View>
                          <View>
                            <ProgressBar
                                progress={30}
                                height={5}
                                backgroundColor="#4a0072"
                                animated={true}
                              />
                          </View>
                        </View>
                      }
                    />
                  </View>
                  {/* <View styles={styles.progressContainer}>
                      {
                        answersByCategory && answersByCategory.map(item => {
                          return (
                            <View style={styles.progressDetailContainer}>
                              <View style={styles.progressDetail}>
                                <View>
                                  <Text>{item.category_display_name}</Text>
                                </View>
                                <View>
                                  <Text>{item.score} / {item.answer_number}</Text>
                                </View>
                              </View>
                              {/* <AnimatedCircularProgress
                                fill={(item.score / (item.answer_number)) * 100}
                                tintColor="#00e0ff"
                                onAnimationComplete={() => console.log('onAnimationComplete')}
                                backgroundColor="#3d5875"
                              /> 
                            </View>
                          )
                        })
                      }
                  </View> */}
                </View>
                <Text>----Link to D-25</Text>
                <Text>----Link to Submissions</Text>
              </>
            }
          </View>
          <View style={styles.widgetContainer}>
            <Text>Tips</Text>
            <View style={styles.textBubble}>

            </View>
          </View>
        </>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    height: 1000,
    // backgroundColor: '#000',
    marginTop: StatusBar.currentHeight || 0,
  },
  widgetContainer: {
    padding: 8,
    margin: "auto",
    height: 400,
  },
  textBubble: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: "red",
    padding: 15,
    margin: 5
  },
  progressContainer: {
    marginTop: 8
    // overflow: "auto",

  },
  // progressItem: {
  //   // padding: 4,
  //   // margin: 4,
  //   backgroundColor: '#EEEEEE',
  // }
});

export default DashboardScreen;

/* AD MOB */
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

/* Reusable */
{/* <ScrollView style={styles.container}>
{
  answersByCategory.length > 0 &&
  <>
    <ScoreWidget answersByCategory={answersByCategory} isLoading={isLoading} />
    <DualIndicatorWidget answersByCategory={answersByCategory} isLoading={isLoading} />
  </>
}
</ScrollView> */}