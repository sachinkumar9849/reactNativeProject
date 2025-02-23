import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '@/constants'

const CandidateProfile = () => {
  return (
    <View>
      <View className='px-4 flex justify-between flex-row py-8 border-b border-[#E6E6E6]'>
        <Image source={images.angle}/>
        <Text className='text-[#0A0A0B] text-[18px] font-semibold'>Profile</Text>
        <Text></Text>
      </View>
      <View className='p-4 flex flex-row'>
        <View className='mr-3'>
          <Image source={images.settingUser}/>
        </View>
        <View>
          <Text className='text-[14px] mb-4'>Cameron Williamson</Text>
          <Text className='text-[12px] text-[#5A5555]'>Email</Text>
          <Text className='text-[14px] mb-4'>cameronwilliamson@gmail.com</Text>

          <Text className='text-[12px] text-[#5A5555]'>Address</Text>
          <Text className='text-[14px] mb-4'>Croatia, Zagreb</Text>
         
        </View>
      </View>
    </View>
  )
}

export default CandidateProfile