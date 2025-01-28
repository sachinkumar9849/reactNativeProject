import React from 'react';
import { images } from "@/constants";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
  Image,
} from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useNavigation } from 'expo-router';

const SignIn = () => {
  const navigation = useNavigation();
  // Form validation schema
  const validationSchema = Yup.object().shape({

  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      is_agreement: false,
    },
    validationSchema,
    onSubmit: async (values, { resetForm, setErrors }) => {
      try {
        const response = await axios.post(
          'https://jobklik-develop.mantraideas.com.np/api/v1/auth/sign-in',
          values
        );
        Alert.alert('Success', response.data.message);
        resetForm();
        router.push('/home');
      } catch (error) {
        if (error.response?.status === 422 && error.response.data?.errors) {

          setErrors({
            email: error.response.data.errors.email?.[0],
            phone: error.response.data.errors.phone?.[0],
          });
        } else {
          Alert.alert(
            'Error',
            error.response?.data?.message || 'Registration failed. Please try again.'
          );
        }
      }
    },

  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>

        <View className='relative'>
          <Image
            source={images.Login}
            resizeMode="cover"
            className="w-full h-200"
          />

          <View className='absolute bottom-12 left-5'>
            <TouchableOpacity onPress={() => navigation.navigate('sign-up')}>
              <Image
                source={images.Arrow}
                resizeMode="cover"
                className="mb-7"
              />
            </TouchableOpacity>

            <Text className='text-[32px] font-semibold text-[#EEEEEE] mb-3'>Sign in to your Account</Text>
            <View className='flex items-center flex-row'>
              <Text className='text-[14px] font-normal text-[#EEEEEE]'>Don’t have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("sign-in")}>
                <Text className="text-[#F3C074] text-[14px] font-semibold ml-1">Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View className='p-5'>

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={formik.values.email}
            onChangeText={formik.handleChange('email')}
            onBlur={formik.handleBlur('email')}
          />
          {formik.touched.email && formik.errors.email && (
            <Text style={styles.error}>{formik.errors.email}</Text>
          )}

          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={formik.values.password}
            onChangeText={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}
          />
          {formik.touched.password && formik.errors.password && (
            <Text style={styles.error}>{formik.errors.password}</Text>
          )}
          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => formik.setFieldValue('is_agreement', !formik.values.is_agreement)}
            >
              <View
                style={[
                  styles.checkboxInner,
                  formik.values.is_agreement && styles.checkboxChecked,
                ]}
              />
            </TouchableOpacity>
            <Text style={styles.checkboxLabel} className='text-[#6C7278]'>Remember me</Text>
          </View>
          {formik.touched.is_agreement && formik.errors.is_agreement && (
            <Text style={styles.error}>{formik.errors.is_agreement}</Text>
          )}



          <TouchableOpacity style={styles.button} className='mt-5' onPress={formik.handleSubmit}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
          <View className="mt-4 flex-row justify-center">
            <Text className="text-[#0A0A0B] text-[14px] font-normal">Don’t have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('sign-up')}>
              <Text className="text-[#1D4F95] text-[14px] font-semibold">Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,


  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#1D4F95',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxInner: {
    width: 14,
    height: 14,
  },
  checkboxChecked: {
    backgroundColor: '#007BFF',
  },
  checkboxLabel: {
    fontSize: 12,
  },
});

export default SignIn;
