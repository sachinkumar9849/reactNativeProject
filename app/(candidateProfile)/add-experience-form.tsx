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
import { useAuth } from '../hooks/useAuth'
import DateSelector from '@/components/comman/DateSelector'

// Define types
interface AddExperienceInput {
  candidate_id: string
  title: string
  company: string
  location: string
  country: string | number
  currently_working: boolean
  start_date: {
    month: string;
    year: string;
  };
  end_date: {
    month: string;
    year: string;
  };
  description: string
}

// Validation schema
const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  company: Yup.string().required('Company is required'),
  location: Yup.string().required('Location is required'),
  country: Yup.string().required('Country is required'),
  start_date: Yup.object().shape({
    month: Yup.string().required('Start month is required'),
    year: Yup.string().required('Start year is required')
  }),
  end_date: Yup.object().when('currently_working', {
    is: false,
    then: Yup.object().shape({
      month: Yup.string().required('End month is required'),
      year: Yup.string().required('End year is required')
    })
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
  const { isAuthenticated } = useAuth();

  console.log("GraphQL query :=>", ADD_EXPERIENCE.loc?.source.body)

  const formik = useFormik({
    initialValues: {
      candidate_id: "98", // Hardcoded for example
      title: '',
      company: '',
      location: '',
      country: '',
      currently_working: false,
      start_date: {
        month: '',
        year: ''
      },
      end_date: {
        month: '',
        year: ''
      },
      description: '',
    },

    validationSchema: Yup.object().shape({
      title: Yup.string().required('Title is required'),
      company: Yup.string().required('Company is required'),
      location: Yup.string().required('Location is required'),
      country: Yup.string().required('Country is required'),
      start_date: Yup.object().shape({
        month: Yup.string().required('Start month is required'),
        year: Yup.string().required('Start year is required')
      }),
      end_date: Yup.object().when('currently_working', {
        is: false,
        then: Yup.object().shape({
          month: Yup.string().required('End month is required'),
          year: Yup.string().required('End year is required')
        })
      }),
      description: Yup.string().required('Description is required'),
    }),
    onSubmit: async (values) => {
      console.log("Form Submission started =======")
      console.log("Form Values:", JSON.stringify(values, null, 2))

      if (!values.start_date.month || !values.start_date.year) {
        console.error('Start date is required');
        return;
      }

      if (!values.currently_working && (!values.end_date.month || !values.end_date.year)) {
        console.error('End date is required when not currently working');
        return;
      }

      const formattedValues = {
        ...values,
        start_date: `${values.start_date.month}-${values.start_date.year}`,
        end_date: values.currently_working ? null : `${values.end_date.month}-${values.end_date.year}`
      };
      try {
        console.log("sending mutation with varibales:", {
          input: values
        })
        const response = await addExperience({
          variables: {
            input: formattedValues,
          },
        })

        console.log("Mutation Response:", JSON.stringify(response, null, 2))

        if (response.data?.addExperience.success) {
          // Handle success - maybe show a toast or navigate away
          console.log('Experience added successfully!', response.data.addExperience.message)
        } else {
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

  useEffect(() => {
    console.log("Form State Updated:", {
      values: formik.values,
      errors: formik.errors,
      touched: formik.touched,
      isValid: formik.isValid,
      isSubmitting: formik.isSubmitting
    })
  }, [formik.values, formik.errors, formik.touched])

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

  const handleSubmit = () => {
    console.log("Submit button pressed");
    console.log('Current form state:', {
      values: formik.values,
      errors: formik.errors,
      isValid: formik.isValid
    })
    if (!formik.isValid) {
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
              initialValue={formik.values.currently_working}
              onValueChange={(value) => formik.setFieldValue('currently_working', value)}
            />
            <Text className='text-[12px] ml-2'>I am currently working in this role</Text>
          </View>

          <Text className='text-[12px] mb-3'>Start Date and Month</Text>
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