import { View, Text, Image, Button, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { images } from '@/constants'
import { router } from 'expo-router'


const CandidateProfile = () => {

  return (
    <ScrollView>
      <View>
        <View className='px-4 flex justify-between flex-row py-8 border-b border-[#E6E6E6]'>
          <TouchableOpacity onPress={() => router.push("profile")}> <Image source={images.angle} /></TouchableOpacity>
          <Text className='text-[#0A0A0B] text-[18px] font-semibold'>Profile</Text>
          <Text className='text-white'>o</Text>
        </View>
        <View className='p-4 flex flex-row'>
          <View className='mr-3'>
            <Image source={images.settingUser} />
          </View>
          <View>
            <Text className='text-[14px] mb-4'>Cameron Williamson</Text>
            <Text className='text-[12px] text-[#5A5555]'>Email</Text>
            <Text className='text-[14px] mb-4'>cameronwilliamson@gmail.com</Text>
            <Text className='text-[12px] text-[#5A5555]'>Address</Text>
            <Text className='text-[14px] mb-4'>Croatia, Zagreb</Text>

          </View>
        </View>
        <View className='border-b border-t border-[#E6E6E6] flex flex-row items-center justify-between p-4'>
          <Text className='text-[18px]'>Warehouse Worker</Text>
          <TouchableOpacity>
            <Image source={images.edit} />
          </TouchableOpacity>
        </View>
        <View className='border-b border-t border-[#E6E6E6] flex flex-row items-center justify-between p-4'>
          <View className='w-[80%]'>
            <Text className='text-[12px]'>With over [X years] of experience in warehouse operations, I bring a strong work ethic and keen attention to detail to every task. Skilled in inventory management, order picking, and shipping/receiving, I consistently meet and exceed productivity targets. My strengths include operating forklifts and other warehouse machinery, organizing inventory efficiently, and ensuring the safe handling of goods.</Text>
          </View>
          <TouchableOpacity>
            <Image source={images.edit} />
          </TouchableOpacity>
        </View>
        <View className='border-b border-t border-[#E6E6E6] flex flex-row items-center justify-between p-4'>
          <View className='w-[80%]'>
            <Text className='text-[18px] mb-2'>Skills</Text>
            <View className='flex flex-wrap flex-row gap-2'>
              <Text className='text-[14px] bg-[#F6F7FF] rounded-md px-2 py-1'>Warehouse </Text>
              <Text className='text-[14px] bg-[#F6F7FF] rounded-md px-2 py-1'> worker</Text>
              <Text className='text-[14px] bg-[#F6F7FF] rounded-md px-2 py-1'>Warehouse worker</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Image source={images.edit} />
          </TouchableOpacity>
        </View>
        <View className='border-b border-t border-[#E6E6E6] flex flex-row items-center justify-between p-4'>
          <View className='w-[80%]'>
            <Text className='text-[18px] mb-3'>Work Experience</Text>
            <Text className='text-[14px]'>Plumber</Text>
            <Text className='text-[14px] py-1'>ABC Company | May 2023 - May 2024</Text>
            <Text className='text-[12px] text-[#433E3F]'>Croatia, Zagreb</Text>
            <Text className='text-[12px]'>As a plumber, I was responsible for installing, repairing, and maintaining various plumbing systems in residential and commercial settings. This included fitting and assembling pipes, troubleshooting leaks, blockages, and other plumbing issues, and ensuring compliance with safety and building regulations.</Text>
          </View>
          <TouchableOpacity>
            <Image source={images.edit} />
          </TouchableOpacity>
        </View>
        <View className='border-b border-t border-[#E6E6E6] flex flex-row items-center justify-between p-4'>
          <View className='w-[80%]'>
            <Text className='text-[18px] mb-3'>Certificates</Text>
            <Text className='text-[16px] text-[#0A0A0B]'>Warehouse Worker Certificate of Achievement</Text>
            <Text className='text-[14px] py-1'>ABC Issuing Organization </Text>
            <Text className='text-[12px] text-[#433E3F]'>Issued 2024</Text>
          
          </View>
          <TouchableOpacity>
            <Image source={images.edit} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

export default CandidateProfile
