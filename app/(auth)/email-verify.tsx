import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  Modal,
  StatusBar,
  ScrollView
} from 'react-native';
import { images } from '@/constants';
import axios from 'axios';
import { useNavigation, useLocalSearchParams } from 'expo-router';

const VerificationCodeInput = ({ onCodeComplete }) => {
  const [code, setCode] = useState(['', '', '', '', '']);
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),

  ];

  const handleChangeText = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Auto focus next input if current input is filled
    if (text.length === 1 && index < 4) {
      inputRefs[index + 1].current.focus();
    }

    // Check if full code is entered
    if (newCode.every(digit => digit.length === 1)) {
      onCodeComplete(newCode.join(''));
    }
  };

  const handleKeyPress = (event, index) => {
    // Move focus back if backspace is pressed and current input is empty
    if (event.nativeEvent.key === 'Backspace' && code[index] === '' && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  return (
    <View style={styles.codeInputContainer}>
      {code.map((digit, index) => (
        <TextInput
          key={index}
          ref={inputRefs[index]}
          style={styles.codeInput}
          value={digit}
          onChangeText={(text) => handleChangeText(text, index)}
          onKeyPress={(event) => handleKeyPress(event, index)}
          keyboardType="numeric"
          maxLength={1}
          textAlign="center"
          placeholder="-"
        />
      ))}
    </View>
  );
};

const EmailVerify = () => {
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  const [verificationCode, setVerificationCode] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [phone, setPhone] = useState('');
  const [phoneVerificationCode, setPhoneVerificationCode] = useState('');

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
    if (params?.phoneVerificationCode) {
      setPhoneVerificationCode(params.phoneVerificationCode);
    }
    if (params?.phone) {
      setPhone(params.phone);
    }
  }, [params]);

  const handleCodeComplete = (code) => {
    setVerificationCode(code);
  };

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
        setModalVisible(true);
      }
    } catch (error) {
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Verification failed. Please try again.'
      );
    }
  };



  const handleModalClose = () => {
    setModalVisible(false);
    navigation.navigate('phone-verify', {
      userId: userId,
      phoneVerificationCode:phoneVerificationCode,
      phone:phone,
    });
  };

  const handleResendCode = () => {
    // Implement resend code logic here
    Alert.alert('Resend Code', 'Code resend functionality will be implemented');
  };

  return (
    <ScrollView>
      <StatusBar  backgroundColor="#112D55" />
    <View style={styles.container} className='bg-white p-5'>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={handleModalClose}
      >
        <View style={styles.modalContainer}>
          <View className='text-center' style={styles.modalContent}>
            <Text className='text-[16px] text-center font-semibold leading-5 text-[#151B25]'>
              Your email is verified! Now, verify your phone to continue and unlock all features
            </Text>
            <View className='my-8'>
              <Image source={images.verifiedEmail} resizeMode="cover" />
            </View>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleModalClose}
            >
              <Text style={styles.modalButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View className='mt-8'>
        <Image source={images.LoginVerify} resizeMode="cover" />
      </View>

      <Text className='text-[14px] text-[#757575] mb-1 mt-4'>
        Enter the 5 digit code we sent to
      </Text>
      <Text className='text-[18px] text-[#40454D] mb-5 font-semibold'>
        {email}
      </Text>
      <Text className='text-[18px] text-[#40454D] mb-5 font-semibold'>
        {verificationCode}
      </Text>
      <Text>{phoneVerificationCode}</Text>
      <Text>{phone}</Text>

      <VerificationCodeInput onCodeComplete={handleCodeComplete} />

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
        <TouchableOpacity onPress={handleResendCode}>
          <Text className="text-center text-[#1D4F95] font-semibold text-[12px] ml-2">
            Resend Code
          </Text>
        </TouchableOpacity>
      </View>
    </View> 
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  codeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  codeInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    fontSize: 20,
    fontWeight: 'bold',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 40,
    alignItems: 'center',
    width: '80%',
  },
  modalButton: {
    backgroundColor: '#1D4F95',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default EmailVerify;