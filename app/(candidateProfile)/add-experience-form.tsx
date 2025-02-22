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

interface DateInput {
  month: string;
  year: string;
}

interface ExperienceFormValues {
  candidate_id?: string;
  title: string;
  company: string;
  location: string;
  country: string | number;
  currently_working: boolean;
  start_date: DateInput;
  end_date: DateInput;
  description: string;
}

interface AddExperienceResponse {
  success: boolean;
  message: string;
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  company: Yup.string().required('Company is required'),
  location: Yup.string().required('Location is required'),
  country: Yup.string().required('Country is required'),
  start_date: Yup.object().shape({
    month: Yup.string().required('Start month is required'),
    year: Yup.string().required('Start year is required')
  }),
  end_date: Yup.object().shape({
    month: Yup.string().when('currently_working', {
      is: false,
      then: Yup.string().required('End month is required')
    }),
    year: Yup.string().when('currently_working', {
      is: false,
      then: Yup.string().required('End year is required')
    })
  }),
  description: Yup.string().required('Description is required'),
});

const ADD_EXPERIENCE = gql`
  mutation AddExperience($input: AddExperienceInput!) {
    addExperience(input: $input) {
      success
      message
    }
  }
`

const INITIAL_FORM_VALUES: ExperienceFormValues = {
  title: '',
  company: '',
  location: '',
  country: '',
  currently_working: false,
  start_date: { month: '', year: '' },
  end_date: { month: '', year: '' },
  description: '',
};

const AddExperience = () => {
  const [addExperience, { loading, error }] = useMutation<{ addExperience: AddExperienceResponse }>(ADD_EXPERIENCE)
  const { isAuthenticated } = useAuth();
  const [userId, seUserId] = useState<string | null>(null);
  useEffect(() => {
    const getUserData = async () => {
      try {
        const userDataString = await AsyncStorage.getItem('userData');
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          seUserId(userData.id || userData.userId || userData._id); // handle different possible ID keys
    console.log(userData._id)
        }
      } catch (error) {
        // Handle error appropriately
      }
    };

    getUserData();
  }, []);

  const formatDateForSubmission = (date: DateInput) => {
    return `${date.month}-${date.year}`;
  };

  const formik = useFormik<ExperienceFormValues>({
    initialValues: INITIAL_FORM_VALUES,
    validationSchema,
    onSubmit: async (values) => {
      if(!userId){
        return;
      }
      try {
        const formattedValues = {
          ...values,
          candidate_id: userId,
          start_date: formatDateForSubmission(values.start_date),
          end_date: values.currently_working ? null : formatDateForSubmission(values.end_date)
        };

        const response = await addExperience({
          variables: { input: formattedValues },
        });

        if (response.data?.addExperience.success) {
          // TODO: Add success notification
          // TODO: Navigate to next screen or reset form
        }
      } catch (err) {
        // TODO: Add error notification
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
        
        <Header />
        <ExperienceIntro />
        
        <View className='mt-8'>
          <FormErrorMessages error={error} formErrors={formik.errors} submitCount={formik.submitCount} />
          
          <FormFields formik={formik} />

          <SubmitButton 
            isValid={formik.isValid} 
            errors={formik.errors} 
            loading={loading} 
            onSubmit={handleSubmit} 
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Extracted Components
const Header = () => (
  <View className="flex flex-row items-center">
    <Image source={images.arrowBlack} width={33} height={33} />
    <Text className='text-[#262626] font-bold ml-5 text-[18px]'>Setup your profile</Text>
  </View>
);

const ExperienceIntro = () => (
  <View className='mt-7'>
    <SkillTitle titleSkill="Highlight Your Journey!" />
    <Text className='text-[#0A0A0B] text-[12] font-normal mt-4'>
      Add your work experience to showcase your career path and achievements to potential employers.
    </Text>
  </View>
);

const FormErrorMessages = ({ error, formErrors, submitCount }) => (
  <>
    {error && (
      <View className="mb-4 p-3 bg-red-100 rounded">
        <Text className="text-red-500">{error.message}</Text>
      </View>
    )}
    {Object.keys(formErrors).length > 0 && submitCount > 0 && (
      <View className="mb-4 p-3 bg-yellow-100 rounded">
        <Text className="text-yellow-700">Please fix the following errors:</Text>
        {Object.entries(formErrors).map(([field, error]) => (
          <Text key={field} className="text-yellow-700">- {error}</Text>
        ))}
      </View>
    )}
  </>
);

const FormFields = ({ formik }) => (
  <>
    <InputField
      placeholder="Title"
      value={formik.values.title}
      onChangeText={formik.handleChange('title')}
      onBlur={formik.handleBlur('title')}
      error={formik.touched.title && formik.errors.title}
    />

    <InputField
      placeholder='Company'
      value={formik.values.company}
      onChangeText={formik.handleChange('company')}
      onBlur={formik.handleBlur('company')}
      error={formik.touched.company && formik.errors.company}
    />

    <InputField
      placeholder='Location'
      value={formik.values.location}
      onChangeText={formik.handleChange('location')}
      onBlur={formik.handleBlur('location')}
      error={formik.touched.location && formik.errors.location}
    />

    <DropdownComponent
      value={formik.values.country}
      onChange={(value) => formik.setFieldValue('country', value)}
    />

    <WorkingStatusCheckbox formik={formik} />
    <DateSelectors formik={formik} />
    
    <View className='mt-2'>
      <InputField
        placeholder='Description'
        value={formik.values.description}
        onChangeText={formik.handleChange('description')}
        onBlur={formik.handleBlur('description')}
        error={formik.touched.description && formik.errors.description}
      />
    </View>
  </>
);

const WorkingStatusCheckbox = ({ formik }) => (
  <View className='flex flex-row items-center p-4'>
    <CustomCheckbox
      initialValue={formik.values.currently_working}
      onValueChange={(value) => formik.setFieldValue('currently_working', value)}
    />
    <Text className='text-[12px] ml-2'>I am currently working in this role</Text>
  </View>
);

const DateSelectors = ({ formik }) => (
  <View>
   
    <DateSelector
      label="Start Date"
      month={formik.values.start_date.month}
      year={formik.values.start_date.year}
      onMonthChange={(value) => formik.setFieldValue('start_date.month', value)}
      onYearChange={(value) => formik.setFieldValue('start_date.year', value)}
      error={
        formik.touched.start_date?.month && formik.touched.start_date?.year
          ? formik.errors.start_date?.month || formik.errors.start_date?.year
          : undefined
      }
    />

    {!formik.values.currently_working && (
      <DateSelector
        label="End Date"
        month={formik.values.end_date.month}
        year={formik.values.end_date.year}
        onMonthChange={(value) => formik.setFieldValue('end_date.month', value)}
        onYearChange={(value) => formik.setFieldValue('end_date.year', value)}
        error={
          formik.touched.end_date?.month && formik.touched.end_date?.year
            ? formik.errors.end_date?.month || formik.errors.end_date?.year
            : undefined
        }
      />
    )}
  </View>
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