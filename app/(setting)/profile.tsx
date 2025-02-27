import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { images } from '@/constants';
import { useNavigation } from 'expo-router';

const loginImage = require('../../assets/images/login.png');

const Profile = () => {
  const navigation = useNavigation();
  return (
    <View>
      <ImageBackground
        source={loginImage}
        style={styles.backgroundImage}
      >
        <View className='px-5 flex flex-row justify-between'>
          <View className='flex flex-row items-center'>
            <Image source={images.user} />
            <Text className='ml-2 text-[#FAFAFA] text-[16px] mt-2 font-semibold'>Cameron Williamson</Text>
          </View>
          <View >
            <Image source={images.notice} />

          </View>
        </View>
      </ImageBackground>
      <View className='bg-[#F1F1FB] mt-6'>
        <TouchableOpacity onPress={()=>navigation.navigate("candidate-profile")}>
        <View className='p-4 flex flex-row justify-between bg-white border-b border-[#E6E6E6]'>
          <View className='flex flex-row'>
            <Image source={images.profile} />
            <Text className='ml-3 text-[#0A0A0B] text-[14px] font-semibold'>Profile</Text>
          </View>
          <Image source={images.arrowIcon} />
        </View>
        </TouchableOpacity>
        <View className='p-4 flex flex-row justify-between bg-white border-b border-[#E6E6E6]'>
          <View className='flex flex-row'>
            <Image source={images.subscriptionSetting} />
            <Text className='ml-3 text-[#0A0A0B] text-[14px] font-semibold'>Manage Subscription</Text>
          </View>
          <Image source={images.arrowIcon} resizeMode='contain' />
        </View>
        <View className='p-4 flex flex-row justify-between bg-white border-b border-[#E6E6E6]'>
          <View className='flex flex-row'>
            <Image source={images.certificationsSetting} />
            <Text className='ml-3 text-[#0A0A0B] text-[14px] font-semibold'>My Certifications</Text>
          </View>
          <Image source={images.arrowIcon} resizeMode='contain' />
        </View>
        <View className='p-4 flex flex-row justify-between bg-white border-b border-[#E6E6E6]'>
          <View className='flex flex-row'>
            <Image source={images.password} />
            <Text className='ml-3 text-[#0A0A0B] text-[14px] font-semibold'>Password</Text>
          </View>
          <Image source={images.arrowIcon} resizeMode='contain' />
        </View>
        <View className='p-4 flex flex-row justify-between bg-white border-b border-[#E6E6E6]'>
          <View className='flex flex-row'>
            <Image source={images.password} />
            <Text className='ml-3 text-[#0A0A0B] text-[14px] font-semibold'>Support</Text>
          </View>
          <Image source={images.arrowIcon} resizeMode='contain' />
        </View>
        <View className='p-4 flex flex-row justify-between bg-white border-b border-[#E6E6E6]'>
          <View className='flex flex-row'>
            <Image source={images.bills} />
            <Text className='ml-3 text-[#0A0A0B] text-[14px] font-semibold'>Bills and Payments</Text>
          </View>
          <Image source={images.arrowIcon} resizeMode='contain' />
        </View>


      </View>
      <View className='mt-10 p-4 flex flex-row justify-between bg-white border-b border-[#E6E6E6]'>
        <View className='flex flex-row'>
          <Image source={images.logout} resizeMode='contain' />
          <Text className='ml-3 text-[#E4626F] text-[14px] font-semibold'>Log Out</Text>
        </View>

      </View>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: 200,
    overflow: 'hidden',
    display: "flex",

    justifyContent: "center"
  },
})