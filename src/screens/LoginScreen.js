import React, { useContext, useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Linking,
  Platform,
  StyleSheet
} from 'react-native';
import SafariView from "react-native-safari-view";
import { WebView } from "react-native-webview";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { AppleButton } from "@invertase/react-native-apple-authentication"

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

// import LoginSVG from '../assets/images/misc/login.svg';
// import FacebookSVG from '../assets/images/misc/facebook.svg';
// import TwitterSVG from '../assets/images/misc/twitter.svg';

import CustomButton from '../components/CustomButton/CustomButton';
import InputField from '../components/InputField/InputField';
import { AuthContext } from '../context/AuthContext';

const LoginScreen = ({ navigation }) => {
  const { 
    login, 
    googleLogin, 
    snackbar, 
    credentialStateForUser,
    updateCredentialStateForUser,
    onAppleButtonPress
  } = useContext(AuthContext)
  const [uri, setUri] = useState("");

  // Set up Linking
  useEffect(() => {
    const listener = Linking.addEventListener("url", (url) => handleOpenURL(url.url));
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleOpenURL({ url });
      }
    });
    return () => {
      listener.remove();
    };
  }, []);

  const handleOpenURL = (url) => {
    console.log('begin handleOpenUrl')
    // Extract stringified user string out of the URL
    const user = decodeURI(url).match(
      /userId=([^#]+)\/email=([^#]+)/
    );
    if (Platform.OS === "ios") {
      console.log('url: ', url)
      console.log('platform is ios. Calling dismiss...')
      googleLogin({
        userId: user[1],
        email: user[2]
      });
      SafariView.dismiss();
    } else {
      setUri("");
    }
  };

  //method that opens a given url
  //based on the platform will use either SafariView or Linking
  //SafariView is a better practice in IOS
  const openUrl = (url) => {
    // // Use SafariView on iOS
    if (Platform.OS === "ios") {
      SafariView.show({
        url,
        fromBottom: true,
      });
    } else {
      setUri(url);
    }
  };

  const _handleSubmit = (values) => login(values);

  return (
    <>
      {uri !== "" ? (
        <SafeAreaView style={{ flex: 1 }}>
          <WebView
            userAgent={
              Platform.OS === "android"
                ? "Chrome/18.0.1025.133 Mobile Safari/535.19"
                : "AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75"
            }
            source={{ uri }}
          />
        </SafeAreaView>
      ) : (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
          <View style={{ paddingHorizontal: 25 }}>
            <View style={{ alignItems: 'center' }}>
              {/* <LoginSVG
                      height={300}
                      width={300}
                      style={{transform: [{rotate: '-5deg'}]}}
                    /> */}
            </View>

            <Text>{credentialStateForUser}</Text>

            <Text
              style={{
                fontFamily: 'Roboto-Medium',
                fontSize: 28,
                fontWeight: '500',
                color: '#333',
                marginBottom: 30,
              }}>
              Login
            </Text>
            <Formik
              testID="LOGIN-FORM"
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .email('Invalid email')
                  .required('Required'),
                password: Yup.string()
                  .required('No password provided.')
                  .min(8, 'Password is too short - should be 8 chars minimum.')
              })}
              initialValues={{
                email: "",
                password: ""
              }}
              onSubmit={values => _handleSubmit(values)}
            >
              {
                ({ errors, touched, setFieldValue, handleSubmit }) => (
                  <>
                    <InputField
                      testID={"EMAIL"}
                      label={'Email'}
                      name={'email'}
                      autoCapitalize={'none'}
                      keyboardType="default"
                      onChangeText={text => setFieldValue('email', text)}
                    />
                    <Text>{touched.email ? errors.email : ""}</Text>
                    <InputField
                      testID={"PASSWORD"}
                      label={'Password'}
                      name={'password'}
                      inputType="password"
                      fieldButtonLabel={"Forgot?"}
                      fieldButtonFunction={() => { }}
                      onChangeText={text => setFieldValue('password', text)}
                    />
                    <Text>{touched.password ? errors.password : ""}</Text>

                    <CustomButton testID="LOGIN" label={"Login"} onPress={handleSubmit} />
                  </>
                )
              }
            </Formik>
          </View>

          <Text style={{ textAlign: 'center', color: '#666', marginBottom: 30 }}>
            Or, login with ...
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 30,
            }}>
            <TouchableOpacity
              onPress={() => openUrl(`http://localhost:8080/api/auth/google`)}
              style={{
                borderColor: '#ddd',
                borderWidth: 2,
                borderRadius: 10,
                paddingHorizontal: 30,
                paddingVertical: 10,
              }}>
              <Text>GOOGLE</Text>
            </TouchableOpacity>
            <AppleButton
              style={styles.appleButton}
              cornerRadius={5}
              buttonStyle={AppleButton.Style.WHITE}
              buttonType={AppleButton.Type.CONTINUE}
              onPress={() => onAppleButtonPress(updateCredentialStateForUser)}
            />
            <TouchableOpacity
              onPress={() => { }}
              style={{
                borderColor: '#ddd',
                borderWidth: 2,
                borderRadius: 10,
                paddingHorizontal: 30,
                paddingVertical: 10,
              }}>
              {/* <TwitterSVG height={24} width={24} /> */}
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: 30,
            }}>
            <Text>New to the app?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={{ color: '#AD40AF', fontWeight: '700' }}> Register</Text>
            </TouchableOpacity>
          </View>

          {snackbar}

        </SafeAreaView>
      )
      }
    </>
  )
};

const styles = StyleSheet.create({
  appleButton: {
    width: 200,
    height: 60,
    margin: 10,
  },
})

export default LoginScreen;