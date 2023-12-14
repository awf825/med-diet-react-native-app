import React, { useContext, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import InputField from '../components/InputField/InputField';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { Formik } from 'formik';
import * as Yup from 'yup';

// import DatePicker from 'react-native-date-picker';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import RegistrationSVG from '../assets/images/auth/registration.svg';
// import GoogleSVG from '../assets/images/auth/google.svg';
// import FacebookSVG from '../assets/images/auth/facebook.svg';
// import TwitterSVG from '../assets/images/auth/twitter.svg';

import CustomButton from '../components/CustomButton/CustomButton';
import { AuthContext } from '../context/AuthContext';

const RegisterScreen = ({ navigation }) => {
  const { register, snackbar } = useContext(AuthContext)

  const _handleSubmit = (values) => register(values);

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 25 }}>
        <View style={{ alignItems: 'center' }}>
          {/* <RegistrationSVG
            height={300}
            width={300}
            style={{transform: [{rotate: '-5deg'}]}}
          /> */}
        </View>

        <Text
          style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 30,
          }}>
          Register
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 30,
          }}>
          <TouchableOpacity
            onPress={() => { }}
            style={{
              borderColor: '#ddd',
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>
            {/* <GoogleSVG height={24} width={24} /> */}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { }}
            style={{
              borderColor: '#ddd',
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>
            {/* <FacebookSVG height={24} width={24} /> */}
          </TouchableOpacity>
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

        <Text style={{ textAlign: 'center', color: '#666', marginBottom: 30 }}>
          Or, register with email ...
        </Text>

        <Formik
          testID="LOGIN-FORM"
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email('Invalid email')
              .required('Required'),
            password: Yup.string()
              .matches(
                /(?=.*?[A-Za-z])(?=.*?[0-9]|.*?[$@$!%*#?&.])[A-Za-z0-9$@$!%*#?&]{8,}/,
                "Your password must be at least 8 characters and must contain at least one digit and/or special character."
              )
              .required("Password is required"),
              passwordConf: Yup.string()
              .required("Password Confirmation is required.")
              .when("password", {
                is: (val) => (val && val.length > 0 ? true : false),
                then: () => Yup.string().oneOf(
                  [Yup.ref("password")],
                  "Password and Password Confirmation must match."
                ),
              })
          })}
          initialValues={{
            email: "",
            password: "",
            passwordConf: ""
          }}
          onSubmit={values => _handleSubmit(values)}
        >
          {
            ({ errors, touched, setFieldValue, handleSubmit }) => (
              <>
                <InputField
                  label={'Email'}
                  name={'email'}
                  autoCapitalize={'none'}
                  keyboardType="default" xw
                  onChangeText={text => setFieldValue('email', text)}
                />
                <Text>{touched.email ? errors.email : ""}</Text>
                <InputField
                  label={'Password'}
                  name={'password'}
                  inputType="password"
                  onChangeText={text => setFieldValue('password', text)}
                />
                <Text>{touched.password ? errors.password : ""}</Text>
                <InputField
                  label={'Password Confirmation'}
                  name={'passwordConf'}
                  inputType="password"
                  onChangeText={text => setFieldValue('passwordConf', text)}
                />
                <Text>{touched.passwordConf ? errors.passwordConf : ""}</Text>
                <CustomButton testID="REGISTER" label={"Register"} onPress={handleSubmit} />
              </>
            )
          }
        </Formik>


        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>Already registered?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ color: '#AD40AF', fontWeight: '700' }}> Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {snackbar}
    </SafeAreaView>
  );
};

export default RegisterScreen;