import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import { images } from '@/constants';
import axios from 'axios';
import { useNavigation, useLocalSearchParams } from 'expo-router';

const EmailVerify = () => {
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  const [verificationCode, setVerificationCode] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState(null);

  console.log("email",email);

  useEffect(() => {
    if (params?.email) {
      setEmail(params.email);
    }
    if (params?.userId) {
      setUserId(params.userId);
    }
    if (params?.verificationCode) {
      setVerificationCode(params.verificationCode);
    }
  }, [params]);

  const handleVerification = async () => {
    try {
      const response = await axios.post(
        'https://jobklik-develop.mantraideas.com.np/api/v1/candidate/verify-email',
        {
          user_id: userId,
          email_code: verificationCode
        }
      );

      if (response.data.success) {
        Alert.alert('Success', 'Email verified successfully.');
        navigation.navigate('sign-in');
      }
    } catch (error) {
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Verification failed. Please try again.'
      );
    }
  };

  return (
    <View style={styles.container} className='bg-white p-5'>
      <View className='mt-8'>
        <Image source={images.LoginVerify} resizeMode="cover" />
      </View>
      <Text className='text-[14px] text-[#757575] mb-1 mt-4'>
        Enter the 6 digit code we sent to 
      </Text>
      <Text className='text-[18px] text-[#40454D] mb-5 font-semibold'>
       {email}
      </Text>
      <Text className='text-[18px] text-[#40454D] mb-5 font-semibold'>
       {verificationCode}
      </Text>
      <View style={styles.codeInputContainer}>
        <TextInput
          style={styles.codeInput}
          placeholder="Enter verification code"
          value={verificationCode}
          onChangeText={setVerificationCode}
          keyboardType="numeric"
          maxLength={6}
          autoFocus
        />
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          !verificationCode && styles.buttonDisabled
        ]}
        className='mt-5'
        onPress={handleVerification}
        disabled={!verificationCode}
      >
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>

      <View className="mt-4 flex flex-row">
        <Text className="text-center text-[#757575] text-[12px]">
          Didn't receive the code?
        </Text>
        <TouchableOpacity className="">
          <Text className="text-center text-[#1D4F95] font-semibold text-[12px] ml-2">
            Resend Code
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  codeInputContainer: {
    marginVertical: 20,
  },
  codeInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    textAlign: 'center',
    letterSpacing: 2,
  },
  button: {
    backgroundColor: '#1D4F95',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default EmailVerify;