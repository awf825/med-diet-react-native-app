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
// import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
// import AuthAxios from '../services/AuthAxios';

export const ScoreWidget = ({ answersByCategory, isLoading }) => {
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
                <View style={styles.scoresContainer}>
                    {
                      answersByCategory.map(category => {
                        return <View style={styles.progressIndicator}>
                          <CircularProgress
                            activeStrokeColor={category.display_hex_code}
                            inActiveStrokeColor={"#fff"}
                            value={category.score}
                            radius={45}
                            duration={1000}
                            progressValueColor={'#ecf0f1'}
                            maxValue={category.answer_number*9}
                            title={`out of ${category.answer_number*9}`}
                            // titleColor={'white'}
                            titleStyle={{fontWeight: 'bold'}}
                          />
                        </View>
                      })
                    }
                </View>
                <View style={styles.legendContainer}>
                  {
                      answersByCategory.map(category => {
                          return <>
                            <View style={{
                              width: 10,
                              height: 10,
                              backgroundColor: category.display_hex_code,
                            }}></View>
                            <View>
                              <Text style={styles.label}>{category.category_display_name}</Text>
                            </View>
                          </>
                      })
                  }
                </View>
              </>
          
        }
      </View>
    )
}

const styles = StyleSheet.create({
    colorLabel: {
      width: "auto",
      height: "auto",
      backgroundColor: "red"
    },
    container: {
      flex: 1,
      flexDirection: 'row',
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