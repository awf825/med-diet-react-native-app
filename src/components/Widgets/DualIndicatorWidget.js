import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  ActivityIndicator
} from 'react-native';
// https://www.npmjs.com/package/react-native-circular-progress
// import { AnimatedCircularProgress, CircularProgress } from 'react-native-circular-progress';
import CircularProgress from 'react-native-circular-progress-indicator';
import { CircularProgressBase } from 'react-native-circular-progress-indicator';
// import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
// import AuthAxios from '../services/AuthAxios';

const _props = {
    activeStrokeWidth: 25,
    inActiveStrokeWidth: 25,
    inActiveStrokeOpacity: 0.2
};

export const DualIndicatorWidget = ({ answersByCategory, isLoading }) => {
    let baseOne = [];
    let baseTwo = [];
    // const sortedCategories = answersByCategory.sort((a,b) => (a.score > b.score) ? 1 : ((b.score < a.score) ? -1 : 0));
    // console.log(answersByCategory)
    answersByCategory.sort((a,b) => (a.score > b.score) ? 1 : ((b.score < a.score) ? -1 : 0)).forEach((s,i) => {
        if (i%2 === 0) {
            baseOne.push(s)
        } else {
            baseTwo.push(s)
        }
    });

    console.log('baseOne: ', baseOne)
    console.log('baseTwo: ', baseTwo)
    
    return (
        <View style={styles.container}>
        {
            isLoading
            ?
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
              <ActivityIndicator size={'large'} />
            </View>
            :
            <>
                <View style={styles.progressIndicator}>
                    <CircularProgressBase
                        {..._props}
                        value={baseOne[3]["score"] / baseOne[3]["answer_number"]*9}
                        radius={125}
                        activeStrokeColor={baseOne[3]["display_hex_code"]}
                        inActiveStrokeColor={baseOne[3]["display_hex_code"]}
                    >
                        <CircularProgressBase
                            {..._props}
                            value={baseOne[2]["score"] / baseOne[2]["answer_number"]*9}
                            radius={100}
                            activeStrokeColor={baseOne[2]["display_hex_code"]}
                            inActiveStrokeColor={baseOne[2]["display_hex_code"]}
                        >
                            <CircularProgressBase
                            {..._props}
                            value={baseOne[1]["score"] / baseOne[1]["answer_number"]*9}
                            radius={75}
                            activeStrokeColor={baseOne[1]["display_hex_code"]}
                            inActiveStrokeColor={baseOne[1]["display_hex_code"]}
                            >
                                <CircularProgressBase
                                    {..._props}
                                    value={baseOne[0]["score"] / baseOne[0]["answer_number"]*9}
                                    radius={50}
                                    activeStrokeColor={baseOne[0]["display_hex_code"]}
                                    inActiveStrokeColor={baseOne[0]["display_hex_code"]}
                                />  
                            </CircularProgressBase>                
                        </CircularProgressBase>
                    </CircularProgressBase>
                </View>
                <View style={styles.progressIndicator}>
                    <CircularProgressBase
                        {..._props}
                        value={baseTwo[3]["score"] / baseTwo[3]["answer_number"]*9}
                        radius={125}
                        activeStrokeColor={baseTwo[3]["display_hex_code"]}
                        inActiveStrokeColor={baseTwo[3]["display_hex_code"]}
                    >
                        <CircularProgressBase
                            {..._props}
                            value={baseTwo[2]["score"] / baseTwo[2]["answer_number"]*9}
                            radius={100}
                            activeStrokeColor={baseTwo[2]["display_hex_code"]}
                            inActiveStrokeColor={baseTwo[2]["display_hex_code"]}
                        >
                            <CircularProgressBase
                            {..._props}
                            value={baseTwo[1]["score"] / baseTwo[1]["answer_number"]*9}
                            radius={75}
                            activeStrokeColor={baseTwo[1]["display_hex_code"]}
                            inActiveStrokeColor={baseTwo[1]["display_hex_code"]}
                            >
                                <CircularProgressBase
                                    {..._props}
                                    value={baseTwo[0]["score"] / baseTwo[0]["answer_number"]*9}
                                    radius={50}
                                    activeStrokeColor={baseTwo[0]["display_hex_code"]}
                                    inActiveStrokeColor={baseTwo[0]["display_hex_code"]}
                                />  
                            </CircularProgressBase>                
                        </CircularProgressBase>
                    </CircularProgressBase>
                </View>
            </>
          
        }
      </View>
    )
}

const styles = StyleSheet.create({
    // progressContainer: {
    //     textAlign: 'center'
    //     // justifyContent: 'center'
    // },
    container: {
      flex: 1,
      flexDirection: 'column',
      alignContent: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      backgroundColor: '#000',
      padding: 40,
    },
    // scoresContainer: {
    //   flex: 1,
    //   flexDirection: 'row',
    //   flexWrap: 'wrap',
    //   alignItems: 'flex-start'
    // },
    // legendContainer: {
    //   flexDirection: 'column',
    //   flex: 1,
    // },
    progressIndicator: {
      width: '50%'
    },
    label: {
      color: '#ecf0f1'
    },
  });