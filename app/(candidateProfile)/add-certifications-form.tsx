import { View, Text, SafeAreaView, ScrollView, StatusBar, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation } from '@apollo/client'
import { gql } from '@apollo/client'
import { images } from '@/constants'
import SkillTitle from '@/components/comman/SkillTitle'
import InputField from '@/components/comman/InputField'
import DropdownComponent from '@/components/comman/CustomDropdown'
import CustomCheckbox from '@/components/comman/CustomCheckbox'
import { useAuth } from '../hooks/useAuth'
import DateSelector from '@/components/comman/DateSelector'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from "react-native-toast-message";
import { useNavigation } from 'expo-router'
import { ADD_CERTIFICATE } from '../apollo/queries'
import { navigate } from 'expo-router/build/global-state/routing'


interface CertificationsFormValues {
  name: string;
  organization: string;
  issued_date: string | number;
  expiry_date: string | number;
  credential_id: string | number;
  credential_url: string;

}

interface AddEducationResponse {
  success: boolean;
  message: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  organization: Yup.string().required('Organization is required'),
  issued_date: Yup.string().required('Issue date is required'),
  expiry_date: Yup.string().required("Expiry date is required"),
});


const INITIAL_FORM_VALUES: CertificationsFormValues = {
  name: '',
  organization: '',
  issued_date: '',
  expiry_date: "",
  credential_id: "",
  credential_url: "",
};

const AddExperience = () => {
  const [addCertificate, { loading, error }] = useMutation<
    { addCertificate: AddEducationResponse },
    { input: Omit<CertificationsFormValues, 'candidate_id'> & { candidate_id?: string } }
  >(ADD_CERTIFICATE)

  const { isAuthenticated } = useAuth();
  const [userId, setUserId] = useState<string | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userDataString = await AsyncStorage.getItem('userData');
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          setUserId(userData.id || userData.userId || userData._id); // handle different possible ID keys
          console.log('User ID:', userData._id);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    getUserData();
  }, []);

  const formik = useFormik<CertificationsFormValues>({
    initialValues: INITIAL_FORM_VALUES,
    validationSchema,
    onSubmit: async (values) => {
      if (!userId) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'User ID not found. Please login again.',
        });
        return;
      }

      try {
        const input = {
          ...values,
          candidate_id: userId,
        };

        const { data } = await addCertificate({
          variables: { input },
        });

        if (data?.addCertificate.success) {
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: data.addCertificate.message || 'Education added successfully!',
          });

          // Reset form or navigate back
          formik.resetForm();

          navigation.navigate("certifications-add");
        } else {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: data?.addCertificate.message || 'Failed to add education',
          });
        }
      } catch (err) {
        console.error('Error submitting education:', err);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Something went wrong. Please try again.',
        });
      }
    },
  });

  const handleSubmit = () => {
    formik.validateForm().then(errors => {
      Object.keys(formik.values).forEach(key => {
        formik.setFieldTouched(key, true);
      });

      if (Object.keys(errors).length === 0) {
        formik.handleSubmit();
      }
    });
  };

  if (loading) {
    return (
      <SafeAreaView className='flex-1 justify-center items-center'>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className='flex-1'>
      <ScrollView className='bg-white px-7 pt-10'>
        <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

        <Header navigation={navigation} />
        <ExperienceIntro />

        <View className='mt-8'>
          <FormFields formik={formik} />

          <SubmitButton
            isValid={formik.isValid}
            errors={formik.errors}
            loading={loading}
            onSubmit={handleSubmit}
          />
        </View>
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
};

const Header = ({ navigation }) => (
  <View className="flex flex-row items-center">
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image source={images.arrowBlack} width={33} height={33} />
    </TouchableOpacity>
    <Text className='text-[#262626] font-bold ml-5 text-[18px]'>Setup your profile</Text>
  </View>
);

const ExperienceIntro = () => (
  <View className='mt-7'>
    <SkillTitle titleSkill="Showcase Your Certifications!s" />
    <Text className='text-[#0A0A0B] text-[12] font-normal mt-4'>
      Add your professional certifications to demonstrate your expertise and commitment, helping potential employers recognize your skills and qualifications.
    </Text>
  </View>
);

const FormFields = ({ formik }) => (
  <>
    <InputField
      placeholder="Name"
      value={formik.values.school}
      onChangeText={formik.handleChange('name')}
      onBlur={formik.handleBlur('name')}
      error={formik.touched.name && formik.errors.name}
    />
    <Text className='text-[12px] text-[#00000099] mt-[-10px] mb-3 ml-3'>Example: ABC Certified Digital Marketing Certificate</Text>
    <InputField
      placeholder='Issuing Organization'
      value={formik.values.organization}
      onChangeText={formik.handleChange('organization')}
      onBlur={formik.handleBlur('organization')}
      error={formik.touched.organization && formik.errors.organization}
    />
    <InputField
      placeholder='Issue date'
      value={formik.values.issued_date}
      onChangeText={formik.handleChange('issued_date')}
      onBlur={formik.handleBlur('issued_date')}
      error={formik.touched.issued_date && formik.errors.issued_date}
    />

    <InputField
      placeholder='Expiration date'
      value={formik.values.expiry_date}
      onChangeText={formik.handleChange('expiry_date')}
      onBlur={formik.handleBlur('expiry_date')}
      error={formik.touched.expiry_date && formik.errors.expiry_date}
    />
    <InputField
      placeholder='Credential Id'
      value={formik.values.credential_id}
      onChangeText={formik.handleChange('credential_id')}
      onBlur={formik.handleBlur('credential_id')}
      error={formik.touched.credential_id && formik.errors.credential_id}
    />
    <View className='mt-2'>
      <InputField
        placeholder='Credential URL'
        value={formik.values.credential_url}
        onChangeText={formik.handleChange('credential_url')}
        onBlur={formik.handleBlur('credential_url')}
        error={formik.touched.credential_url && formik.errors.credential_url}

      />
    </View>
  </>
);

const SubmitButton = ({ isValid, errors, loading, onSubmit }) => (
  <View className='mb-20'>
    <TouchableOpacity
      style={[
        styles.nextButton,
        (!isValid || Object.keys(errors).length > 0 || loading) && styles.disabledButton
      ]}
      onPress={onSubmit}
      disabled={!isValid || Object.keys(errors).length > 0 || loading}
    >
      <Text style={styles.nextButtonText}>
        {loading ? 'Adding...' : 'Add'}
      </Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  nextButton: {
    backgroundColor: '#1D4F95',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  disabledButton: {
    opacity: 0.7
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
});

export default AddExperience;