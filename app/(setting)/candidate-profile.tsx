import { View, Text, Image, Button } from 'react-native'
import React from 'react'
import { images } from '@/constants'
import { useAuth } from '../hooks/useAuth'

import { router, useNavigation } from 'expo-router';

const CandidateProfile = () => {
  const {userData , isLoading,logout} = useAuth();
  const navigation = useNavigation();
 
  

  const handleLogout = async () => {
    try {
        await logout();
        router.replace("/");
    } catch (error) {
        // Handle logout error
    }
};


  if(isLoading){
    return(
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }
  return (
    <View>
      <View className='px-4 flex justify-between flex-row py-8 border-b border-[#E6E6E6]'>
        <Image source={images.angle} />
        <Text className='text-[#0A0A0B] text-[18px] font-semibold'>Profile</Text>
        <Text></Text>
      </View>
      <View className='p-4 flex flex-row'>
        <View className='mr-3'>
          <Image source={images.settingUser} />
        </View>
        <View>
        <Text className='text-[14px] mb-4'>{userData?.email || 'N/A'}</Text>
          <Text className='text-[12px] text-[#5A5555]'>Email</Text>
          <Text className='text-[14px] mb-4'>{userData?.phone || 'N/A'}</Text>
          <Text className='text-[12px] text-[#5A5555]'>Address</Text>
          <Text className='text-[14px] mb-4'>{userData?.user_id || 'N/A'}</Text>
          <Button onPress={handleLogout} title="Logout" />
        </View>
      </View>
    </View>
  )
}

export default CandidateProfile
