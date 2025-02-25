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


interface ExperienceFormValues {
  candidate_id?: string;
  school: string;
  degree: string;
  description: string;
  field_of_study: string;
  date_attended: string;
  graduated_date: string;
 
}

interface AddEducationResponse {
  success: boolean;
  message: string;
}

const validationSchema = Yup.object().shape({
  school: Yup.string().required('School is required'),
  degree: Yup.string().required('Degree is required'),
  field_of_study: Yup.string().required('Field of Study is required'),
  date_attended: Yup.string().required("Attended year is required"),
});

const ADD_EDUCATION = gql`
  mutation AddEducation($input: AddEducationInput!) {
    addEducation(input: $input) {
      success
      message
    }
  }
`

const INITIAL_FORM_VALUES: ExperienceFormValues = {
  school: '',
  degree: '',
  description: '',
  field_of_study: "",
  date_attended: "",
  graduated_date: "",
};

const AddExperience = () => {
  const [addEducation, { loading, error }] = useMutation<
    { addEducation: AddEducationResponse },
    { input: Omit<ExperienceFormValues, 'candidate_id'> & { candidate_id?: string } }
  >(ADD_EDUCATION)
  
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

  const formik = useFormik<ExperienceFormValues>({
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

        const { data } = await addEducation({
          variables: { input },
        });

        if (data?.addEducation.success) {
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: data.addEducation.message || 'Education added successfully!',
          });
          
          // Reset form or navigate back
          formik.resetForm();
          navigation.goBack();
        } else {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: data?.addEducation.message || 'Failed to add education',
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
    <SkillTitle titleSkill="Showcase Your Education!" />
    <Text className='text-[#0A0A0B] text-[12] font-normal mt-4'>
      Add your academic qualifications to highlight your learning journey and achievements for potential employers.
    </Text>
  </View>
);

const FormFields = ({ formik }) => (
  <>
    <InputField
      placeholder="School"
      value={formik.values.school}
      onChangeText={formik.handleChange('school')}
      onBlur={formik.handleBlur('school')}
      error={formik.touched.school && formik.errors.school}
    />
    <InputField
      placeholder='Degree'
      value={formik.values.degree}
      onChangeText={formik.handleChange('degree')}
      onBlur={formik.handleBlur('degree')}
      error={formik.touched.degree && formik.errors.degree}
    />
    <InputField
      placeholder='Field of Study'
      value={formik.values.field_of_study}
      onChangeText={formik.handleChange('field_of_study')}
      onBlur={formik.handleBlur('field_of_study')}
      error={formik.touched.field_of_study && formik.errors.field_of_study}
    />
   
    <InputField
      placeholder='Year Attended'
      value={formik.values.date_attended}
      onChangeText={formik.handleChange('date_attended')}
      onBlur={formik.handleBlur('date_attended')}
      error={formik.touched.date_attended && formik.errors.date_attended}
    />
    <InputField
      placeholder='Graduation Year'
      value={formik.values.graduated_date}
      onChangeText={formik.handleChange('graduated_date')}
      onBlur={formik.handleBlur('graduated_date')}
      error={formik.touched.graduated_date && formik.errors.graduated_date}
    />
    <View className='mt-2'>
      <InputField
        placeholder='Description'
        value={formik.values.description}
        onChangeText={formik.handleChange('description')}
        onBlur={formik.handleBlur('description')}
        error={formik.touched.description && formik.errors.description}
        multiline={true}
        numberOfLines={4}
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