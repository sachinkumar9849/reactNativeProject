import { View, Text, StatusBar, ScrollView, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { images } from '@/constants'
import SkillTitle from '@/components/comman/SkillTitle'
import CustomButton from '@/components/comman/CustomButton'
import Textarea from 'react-native-textarea'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation } from '@apollo/client'
import { gql } from '@apollo/client'


const ADD_BIO = gql`
  mutation AddBio($bio: String!) {
    addBio(input: { bio: $bio }) {
      success
      message
    }
  }
`;

// Define TypeScript interfaces
interface AddBioInput {
  bio: string
}

interface AddBioResponse {
  addBio: {
    success: boolean
    message: string
  }
}


const bioValidationSchema = Yup.object().shape({
  bio: Yup.string()
    .min(100, 'Bio must be at least 100 characters')
    .required('Bio is required')
})

const CandidateBio = () => {


  const [addBio, { loading }] = useMutation<AddBioResponse, { bio: string }>(ADD_BIO);


  const formik = useFormik({
    initialValues: {
      bio: '',
    },
    validationSchema: bioValidationSchema,
    onSubmit: async (values) => {
      try {
        const response = await addBio({
          variables: {
            bio: values.bio
          }
        });

        if (response.data?.addBio.success) {
          Alert.alert('Success', response.data.addBio.message)

          router.push("")
        } else {
          Alert.alert('Error', response.data?.addBio.message || 'Failed to add bio')
        }
      } catch (error) {
        Alert.alert('Error', error instanceof Error ? error.message : 'An unexpected error occurred')
      }
    },
  })

  const charactersRemaining = 1000 - formik.values.bio.length
  const hasMinimumChars = formik.values.bio.length >= 100

  return (
    <SafeAreaView className='flex-1'>
      <ScrollView className='bg-white px-7 pt-10'>
        <View>
          <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
          <View className="flex flex-row items-center">
            <TouchableOpacity onPress={() => router.push("/languageAdd")}>
              <Image source={images.arrowBlack} width={33} height={33} />
            </TouchableOpacity>
            <Text className='text-[#262626] font-bold ml-5 text-[18px]'>Setup your profile</Text>
          </View>

          <View className='flex justify-center w-full items-center mt-10'>
            <Image source={images.Bio} />
          </View>

          <View className='mt-7'>
            <SkillTitle titleSkill="Tell Your Story!" />
            <Text className='text-[#0A0A0B] text-[12] font-normal mt-4'>
              Add a bio with at least 100 characters to share your personal journey, professional background, and unique experiences with employers.
            </Text>
          </View>

          <Textarea
            containerStyle={styles.textareaContainer}
            style={styles.textarea}
            maxLength={1000}
            placeholder="Bio"
            placeholderTextColor={'black'}
            value={formik.values.bio}
            onChangeText={formik.handleChange('bio')}
            onBlur={formik.handleBlur('bio')}
          />

          <View className="flex flex-row justify-between mt-2">
            <Text className="text-red-500">
              {formik.touched.bio && formik.errors.bio}
            </Text>
            <Text className={`text-sm ${hasMinimumChars ? 'text-green-600' : 'text-gray-500'}`}>
              {formik.values.bio.length}/1000 characters
            </Text>
          </View>
        </View>
      </ScrollView>

      <View className='py-3 px-3 flex flex-row justify-between w-full bg-white' style={styles.nextButtonContainer}>
        <TouchableOpacity
          className=' p-0 px-[20px] py-[10px] rounded-md'
          onPress={() => router.push("/show-certifications")}

        >
          <Text className='text-[#1D4F95] font-semibold text-[16]'>
            Skip
          </Text>
        </TouchableOpacity>s
        <TouchableOpacity
          style={[
            styles.nextButton,
            (!hasMinimumChars || loading) && styles.disabledButton
          ]}
          onPress={() => formik.handleSubmit()}
          disabled={!hasMinimumChars || loading}
        >
          <Text style={styles.nextButtonText}>
            {loading ? 'Submitting...' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

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
  },
  nextButton: {
    backgroundColor: '#1D4F95',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,

    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#9DB4D3',
  },
  nextButtonText: {
    color: '#fff',
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

export default CandidateBio