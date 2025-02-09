import { View, Text, SafeAreaView, ScrollView, StatusBar, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation } from '@apollo/client'
import { gql } from '@apollo/client'
import { images } from '@/constants'
import SkillTitle from '@/components/comman/SkillTitle'
import InputField from '@/components/comman/InputField'
import DropdownComponent from '@/components/comman/CustomDropdown'
import CustomCheckbox from '@/components/comman/CustomCheckbox'
import Select from '@/components/comman/Select'

// Define types
interface AddExperienceInput {
  candidate_id: string
  title: string
  company: string
  location: string
  country: string | number
  currently_working: boolean
  start_date: string
  end_date: string
  description: string
}

// Validation schema
const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  company: Yup.string().required('Company is required'),
  location: Yup.string().required('Location is required'),
  country: Yup.string().required('Country is required'),
  start_date: Yup.string().required('Start date is required'),
  end_date: Yup.string().when('currently_working', {
    is: false,
    then: Yup.string().required('End date is required'),
  }),
  description: Yup.string().required('Description is required'),
})

const ADD_EXPERIENCE = gql`
  mutation AddExperience($input: AddExperienceInput!) {
    addExperience(input: $input) {
      success
      message
    }
  }
`

const AddExperience = () => {
  const [addExperience, { loading, error, data }] = useMutation(ADD_EXPERIENCE)

  console.log("GraphQL query :=>", ADD_EXPERIENCE.loc?.source.body)

  const formik = useFormik({
    initialValues: {
      candidate_id: '98', // Hardcoded for example
      title: '',
      company: '',
      location: '',
      country: '1',
      currently_working: true,
      start_date: '2020',
      end_date: '2024',
      description: '',
    },
   
    validationSchema,
    onSubmit: async (values) => {
     console.log("Form Submission started =======")
     console.log("Form Values:", JSON.stringify(values, null,2))
      try {
        console.log("sending mutation with varibales:",{
          input: values
        })
        const response = await addExperience({
          variables: {
            input: values,
          },
        })

        console.log("Mutation Response:",JSON.stringify(response, null,2))
        
        if (response.data?.addExperience.success) {
          // Handle success - maybe show a toast or navigate away
          console.log('Experience added successfully!',response.data.addExperience.message)
        }else{
          console.warn("Mutation returned success: false", response.data?.addExperience)
        }
      } catch (error) {
        console.error('Mutation Error:', {
          name: error.name,
          message: error.message,
          stack: error.stack,
          networkError: error.networkError,
          graphQLErrors: error.graphQLErrors,
        })
      }
    },
  })

  useEffect(()=>{
    console.log("Form State Updated:",{
      values: formik.values,
      errors: formik.errors,
      touched: formik.touched,
      isValid: formik.isValid,
      isSubmitting: formik.isSubmitting
    })
  },[formik.values,formik.errors, formik.touched ])

  const formatDate = (month: string, year: string) => {
    return `${month}-${year}`
  }
  if (loading) {
    return (
      <SafeAreaView className='flex-1 justify-center items-center'>
        <Text>Loading...</Text>
      </SafeAreaView>
    )
  }

  // Display any GraphQL errors
  if (error) {
    console.error('GraphQL Error:', error)
    return (
      <SafeAreaView className='flex-1 justify-center items-center'>
        <Text className="text-red-500">Error: {error.message}</Text>
      </SafeAreaView>
    )
  }

  const handleSubmit= ()=>{
    console.log("Submit button pressed");
    console.log('Current form state:', {
      values: formik.values,
      errors: formik.errors,
      isValid: formik.isValid
    })
    if(!formik.isValid){
      console.warn("Form validation failed:", formik.errors)
      return
    }
    formik.handleSubmit()
  }

  return (
    <SafeAreaView className='flex-1'>
      <ScrollView className='bg-white px-7 pt-10'>
        <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
        <View className="flex flex-row items-center">
          <Image source={images.arrowBlack} width={33} height={33} />
          <Text className='text-[#262626] font-bold ml-5 text-[18px]'>Setup your profile</Text>
        </View>
        
        <View className='mt-7'>
          <SkillTitle titleSkill="Highlight Your Journey!" />
          <Text className='text-[#0A0A0B] text-[12] font-normal mt-4'>
            Add your work experience to showcase your career path and achievements to potential employers.
          </Text>
        </View>

        <View className='mt-8'>
        {error && (
            <View className="mb-4 p-3 bg-red-100 rounded">
              <Text className="text-red-500">{error.message}</Text>
            </View>
          )}
             {Object.keys(formik.errors).length > 0 && formik.submitCount > 0 && (
            <View className="mb-4 p-3 bg-yellow-100 rounded">
              <Text className="text-yellow-700">Please fix the following errors:</Text>
              {Object.entries(formik.errors).map(([field, error]) => (
                <Text key={field} className="text-yellow-700">- {error}</Text>
              ))}
            </View>
          )}


          <InputField
            placeholder="Title"
            value={formik.values.title}
            onChangeText={formik.handleChange('title')}
            onBlur={formik.handleBlur('title')}
          />
          {formik.touched.title && formik.errors.title && (
            <Text className='text-red-500 text-xs'>{formik.errors.title}</Text>
          )}

          <InputField
            placeholder='Company'
            value={formik.values.company}
            onChangeText={formik.handleChange('company')}
            onBlur={formik.handleBlur('company')}
          />
          {formik.touched.company && formik.errors.company && (
            <Text className='text-red-500 text-xs'>{formik.errors.company}</Text>
          )}

          <InputField
            placeholder='Location'
            value={formik.values.location}
            onChangeText={formik.handleChange('location')}
            onBlur={formik.handleBlur('location')}
          />
          
          <DropdownComponent
            value={formik.values.country}
            onChange={(value) => formik.setFieldValue('country', value)}
          />

          <View className='flex flex-row items-center p-4'>
            <CustomCheckbox
              checked={formik.values.currently_working}
              onPress={() => formik.setFieldValue('currently_working', !formik.values.currently_working)}
            />
            <Text className='text-[12px] ml-2'>I am currently working in this role</Text>
          </View>

          <Text className='text-[12px] mb-3'>Start Date and Month</Text>
          <View className="flex-row space-x-4">
            <View style={{ width: "50%" }}>
              <Select
                onSelect={(month) => {
                  const startDate = formatDate(month, formik.values.start_date.split('-')[1] || '')
                  formik.setFieldValue('start_date', startDate)
                }}
              />
            </View>
            <View style={{ width: "50%" }}>
              <Select
                onSelect={(year) => {
                  const startDate = formatDate(formik.values.start_date.split('-')[0] || '', year)
                  formik.setFieldValue('start_date', startDate)
                }}
              />
            </View>
          </View>

          {!formik.values.currently_working && (
            <>
              <Text className='text-[12px] my-3'>End Date and Month</Text>
              <View className="flex-row space-x-4">
                <View style={{ width: "50%" }}>
                  <Select
                    onSelect={(month) => {
                      const endDate = formatDate(month, formik.values.end_date.split('-')[1] || '')
                      formik.setFieldValue('end_date', endDate)
                    }}
                  />
                </View>
                <View style={{ width: "50%" }}>
                  <Select
                    onSelect={(year) => {
                      const endDate = formatDate(formik.values.end_date.split('-')[0] || '', year)
                      formik.setFieldValue('end_date', endDate)
                    }}
                  />
                </View>
              </View>
            </>
          )}

          <View className='mt-2'>
            <InputField 
              placeholder='Description'
              value={formik.values.description}
              onChangeText={formik.handleChange('description')}
              onBlur={formik.handleBlur('description')}
            />
          </View>

          <View className='mb-20'>
            <TouchableOpacity
              style={[
                styles.nextButton,
                (!formik.isValid || loading) && styles.disabledButton
              ]}
              onPress={handleSubmit}
              disabled={!formik.isValid || loading}
            >
              <Text style={styles.nextButtonText}>
                {loading ? 'Adding...' : 'Add'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default AddExperience

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5
  },
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
})