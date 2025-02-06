import { View, Text, SafeAreaView, ScrollView, StatusBar, Image, TextInput } from 'react-native'
import React from 'react'
import { images } from '@/constants'
import SkillTitle from '@/components/comman/SkillTitle'
import InputField from '@/components/comman/InputField'


import DropdownComponent from '@/components/comman/CustomDropdown'


const AddExperience = () => {
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
          <InputField placeholder="Title" />
          <Text className='text-[12px] text-[#00000099] mt-[-9px] ml-3 mb-4'>Example: Warehouse Worker</Text>

          <InputField placeholder='Company'/>
          <InputField placeholder='Location'/>
          <DropdownComponent/>
        </View>
      </ScrollView>

    </SafeAreaView>
  )
}

export default AddExperience