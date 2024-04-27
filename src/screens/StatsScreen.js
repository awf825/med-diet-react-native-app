import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  ActivityIndicator,
  ScrollView
} from 'react-native';
// https://www.npmjs.com/package/react-native-circular-progress
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import AuthAxios from '../services/AuthAxios';

import { BarChart, LineChart, PieChart, PopulationPyramid } from "react-native-gifted-charts";
// import { ScrollView } from 'react-native-gesture-handler';

// const data=[ {value:50}, {value:80}, {value:90}, {value:70} ]
const data2=[ {value:20}, {value:-26}, {value:60}, {value:-10} ]
const data3=[ {value:20}, {value:55}, {value:-5}, {value:-18} ]

const StatsScreen = ({ navigation }) => {
    const { userToken } = useContext(AuthContext)
    const [data, setData] = useState([])

    useEffect(() => {
        navigation.addListener('focus', () => {
            // setIsLoading(true)
            AuthAxios(userToken).get("/api/submissions/getAnswersByCategory")
            .then(resp => {
                console.log(resp.data)
                setData(resp.data)
                setIsLoading(false);
            })
            .catch(err => console.log(err))
        });
    }, [navigation]);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View>
                    <LineChart 
                        height={300}
                        width={300}
                        // maxValue={60}
                        // overflowTop={300}
                        // yAxisExtraHeight={300}
                        stepValue={15}
                        yAxisOffset={-60}
                        isAnimated={true}
                        data={data}
                        color1='blue'
                        data2={data2}
                        color2='green'
                        data3={data3}
                        color3='red' 
                        onlyPositive={false}
                    />
                </View>
                <View>
                    <LineChart 
                        height={300}
                        width={300}
                        // maxValue={60}
                        // overflowTop={300}
                        // yAxisExtraHeight={300}
                        stepValue={15}
                        yAxisOffset={-60}
                        isAnimated={true}
                        data={data} 
                        onlyPositive={false}
                    />
                </View>
                <View>
                    <LineChart 
                        height={300}
                        width={300}
                        // maxValue={60}
                        // overflowTop={300}
                        // yAxisExtraHeight={300}
                        stepValue={15}
                        yAxisOffset={-60}
                        isAnimated={true}
                        data={data} 
                        onlyPositive={false}
                    />
                </View>
            </ScrollView>
            {/* <ScrollView>
                <View>
                </View>
                <LineChart 
                    data={data} 
                    onlyPositive={false}
                />
                <LineChart 
                    data={data} 
                    onlyPositive={false}
                />
            </ScrollView> */}
          {/* {
            isLoading
              ?
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                <ActivityIndicator size={'large'} />
              </View>
              :
              <View>
                <FlatList
                  data={submissions}
                  renderItem={_renderItem}
                  keyExtractor={item => item.submission_id}
                />
                </View>
            } */}
        </SafeAreaView>

    )
    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});

export default StatsScreen;