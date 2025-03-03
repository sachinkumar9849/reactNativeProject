import { View, Text, StatusBar, ScrollView, Image, StyleSheet, TouchableOpacity, Alert, TextInput, Platform } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { images } from '@/constants';
import SkillTitle from '@/components/comman/SkillTitle';
import CustomButton from '@/components/comman/CustomButton';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { gql, useMutation } from '@apollo/client';

// Define the GraphQL mutation
const UPDATE_CANDIDATE_PROFILE = gql`
  mutation UpdateCandidateProfile(
    $dob: String!
    $country: ID!
    $street: String!
    $city: String!
    $state: String!
    $postalCode: String!
    $photo: Upload
  ) {
    updateCandidateProfile(
      input: {
        dob: $dob
        country: $country
        street: $street
        city: $city
        state: $state
        postal_code: $postalCode
        photo: $photo
      }
    ) {
      success
      message
    }
  }
`;

// Define validation schema
const validationSchema = Yup.object().shape({
  dob: Yup.string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format')
    .required('Date of birth is required'),
  country: Yup.string().required('Country is required'),
  street: Yup.string().required('Street address is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State/Province is required'),
  postalCode: Yup.string().required('ZIP/Postal code is required'),
});

// Define interface for form values
interface ProfileFormValues {
  dob: string;
  country: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  photo?: string | null;
}

const CandidateBio = () => {
  const [photo, setPhoto] = useState<string | null>(null);

  // Initialize mutation hook
  const [updateProfile, { loading }] = useMutation(UPDATE_CANDIDATE_PROFILE, {
    onCompleted: (data) => {
      if (data.updateCandidateProfile.success) {
        Alert.alert('Success', data.updateCandidateProfile.message);
     
      }
    },
    onError: (error) => {
      Alert.alert('Error', error.message || 'Failed to update profile');
    },
  });

  // Initialize formik
  const formik = useFormik<ProfileFormValues>({
    initialValues: {
      dob: '',
      country: '',
      street: '',
      city: '',
      state: '',
      postalCode: '',
      photo: null,
    },
    validationSchema,
    onSubmit: (values) => {
      updateProfile({
        variables: {
          dob: values.dob,
          country: values.country,
          street: values.street,
          city: values.city,
          state: values.state,
          postalCode: values.postalCode,
          photo: values.photo,
        },
      });
    },
  });

  const handleAddPhoto = async () => {
    // Implementation depends on how you want to handle photos
    // This is just a placeholder
    Alert.alert('Add Photo', 'Photo upload functionality would go here');
    
    // Example implementation (pseudocode):
    // const photoUri = await somePhotoPickerFunction();
    // setPhoto(photoUri);
    // formik.setFieldValue('photo', photoUri);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView className='bg-white px-7 pt-10'>
        <View>
          <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
          <View className="flex flex-row items-center">
            <TouchableOpacity onPress={() => router.push("/languageAdd")}>
              <Image source={images.arrowBlack} width={33} height={33} />
            </TouchableOpacity>
            <Text className='text-[#262626] font-bold ml-5 text-[18px]'>Setup your profile</Text>
          </View>
          <View className='mt-7'>
            <SkillTitle titleSkill="Share Your Photos and Infos!" />
            <Text className='text-[#0A0A0B] text-[12] font-normal mt-4'>
              Add your photos and personal details to create a complete profile that stands out to potential employers.
            </Text>
          </View>
        </View>
        <View className='mx-auto text-center mb-4'>
          <Image className='mx-auto text-center my-4' source={photo ? { uri: photo } : images.user} />
          <CustomButton title="Add Photo" onPress={handleAddPhoto} />
        </View>
        
        {/* Date of Birth Field - Simple text input with format instructions */}
        <View>
          <TextInput
            className='rounded-md'
            style={styles.textInput}
            placeholder={'Date of birth (YYYY-MM-DD)'}
            value={formik.values.dob}
            onChangeText={formik.handleChange('dob')}
            onBlur={formik.handleBlur('dob')}
          />
          {formik.touched.dob && formik.errors.dob && (
            <Text style={styles.errorText}>{formik.errors.dob}</Text>
          )}
        </View>

        {/* Country Field */}
        <View>
          <TextInput
            className='rounded-md mt-3'
            style={styles.textInput}
            placeholder={'Country'}
            value={formik.values.country}
            onChangeText={formik.handleChange('country')}
            onBlur={formik.handleBlur('country')}
          />
          {formik.touched.country && formik.errors.country && (
            <Text style={styles.errorText}>{formik.errors.country}</Text>
          )}
        </View>

        {/* Street Address Field */}
        <View>
          <TextInput
            className='rounded-md mt-3'
            style={styles.textInput}
            placeholder={'Street Address'}
            value={formik.values.street}
            onChangeText={formik.handleChange('street')}
            onBlur={formik.handleBlur('street')}
          />
          {formik.touched.street && formik.errors.street && (
            <Text style={styles.errorText}>{formik.errors.street}</Text>
          )}
        </View>

        {/* City Field */}
        <View>
          <TextInput
            className='rounded-md mt-3'
            style={styles.textInput}
            placeholder={'City'}
            value={formik.values.city}
            onChangeText={formik.handleChange('city')}
            onBlur={formik.handleBlur('city')}
          />
          {formik.touched.city && formik.errors.city && (
            <Text style={styles.errorText}>{formik.errors.city}</Text>
          )}
        </View>

        {/* State/Province Field */}
        <View>
          <TextInput
            className='rounded-md mt-3'
            style={styles.textInput}
            placeholder={'State/Province'}
            value={formik.values.state}
            onChangeText={formik.handleChange('state')}
            onBlur={formik.handleBlur('state')}
          />
          {formik.touched.state && formik.errors.state && (
            <Text style={styles.errorText}>{formik.errors.state}</Text>
          )}
        </View>

        {/* Postal Code Field */}
        <View>
          <TextInput
            className='rounded-md mt-3'
            style={styles.textInput}
            placeholder={'ZIP/Postal Code'}
            value={formik.values.postalCode}
            onChangeText={formik.handleChange('postalCode')}
            onBlur={formik.handleBlur('postalCode')}
          />
          {formik.touched.postalCode && formik.errors.postalCode && (
            <Text style={styles.errorText}>{formik.errors.postalCode}</Text>
          )}
        </View>
        
        <View style={{ height: 100 }} />
      </ScrollView>
      
      <View className='py-3 px-3 flex flex-row justify-between w-full bg-white' style={styles.nextButtonContainer}>
        <TouchableOpacity
          style={[
            styles.nextButton,
            !formik.isValid && styles.disabledButton,
            { width: '100%' }
          ]}
          onPress={() => formik.handleSubmit()}
          disabled={!formik.isValid || loading}
        >
          <Text style={styles.nextButtonText}>
            {loading ? 'Submitting...' : 'Complete'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  textInput: {
    padding: 12,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'white',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  selectedSkill: {
    padding: 16,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'gray',
  },
  nextButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderTopColor: "#1D4F95",
    borderTopWidth: 1,
    width: "100%",
    display: "flex",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  nextButton: {
    backgroundColor: '#1D4F95',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#9DB4D3',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textareaContainer: {
    height: 180,
    padding: 5,
    borderWidth: 1,
    borderColor: "#0000003B",
    borderRadius: 5,
    marginTop: 22,
  },
  textarea: {
    textAlignVertical: 'top',
    height: 170,
    fontSize: 14,
    color: '#333',
  },
});

export default CandidateBio;