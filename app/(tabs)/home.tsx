import React from 'react';
import {
  Text, View, TextInput, ImageBackground,
  StyleSheet, Dimensions,
  Image,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
import { images } from '@/constants'
import { SafeAreaView } from 'react-native-safe-area-context';
import Title from '@/components/comman/Title';
import { router } from "expo-router";



const Home = () => {


  const handleResendCode = ()=>{
    router.push("/skills-select")
  }
  return (
    <SafeAreaView>
      <View className='flex-3'>
        <StatusBar backgroundColor="#0D4D93" />
        <ImageBackground source={images.banner} resizeMode="cover" className='flex-1 p-10'
          style={styles.img}>
          <View className='flex-1 flex flex-row justify-between w-full'>
            <Image source={images.user} className='w-100 h-100' />
            <Image source={images.notice} />
          </View>

        </ImageBackground>
        <View className='flex-2 mx-4 '>
          <View className='bg-white w-full mt-[20px] rounded-md p-5 '>
            <View className='flex flex-row justify-between'>
              <View>
                <Text className='text-[#1D4F95] text-[28px] font-bold'>121</Text>
                <Text className='text-[#1D4F95] text-[12px] font-semibold'>Points</Text>
              </View>
              <Image source={images.logoSmall} />
            </View>
            <View>

              <TouchableOpacity
              onPress={handleResendCode}
                style={[
                  styles.button,

                ]}
                className='mt-5 flex flex-row justify-center'

              >
                <Image source={images.completeProfile} />
                <Text style={styles.buttonText} className='text-theme1'> Complete Profile</Text>
              </TouchableOpacity>
              <View className='flex flex-row justify-between mt-3'>

                <View>
                  <Text className='text-[#231F20] text-[12px]'>Search Appearances</Text>
                  <View className='flex flex-row items-center'>
                    <Image source={images.search} style={styles.searchImg} />
                    <Text className='text-[#0A0A0B] text-[28px] font-semibold ml-2'>
                      1,041</Text>
                  </View>
                </View>
                <View>
                  <Text className='text-[#231F20] text-[12px]'>Profile Views</Text>
                  <View className='flex flex-row items-center'>
                    <Image source={images.users} style={styles.searchImg} />
                    <Text className='text-[#0A0A0B] text-[28px] font-semibold ml-2'>
                      231</Text>
                  </View>
                </View>
              </View>
            </View>

          </View>
          <View className='bg-theme1 bg-[#0D4D93] mt-5 p-5 rounded-md'>
            <Text className='text-[#FAFAFA] text-[18px] font-semibold mb-4'>Jobbicus Quiz</Text>
            <View className='flex flex-row justify-between'>
              <Text className='text-[#FAFAFA] text-[24px] font-semibold'>0/8</Text>
              <Image source={images.quiz} />
            </View>

          </View>
          <View className='mt-3'>

            <Title title="Activities" />
            <View className='bg-white p-5 rounded-md flex flex-row justify-between items-center'>
              <View className=''>
              <Image source={images.planning1} className='mx-auto'/>
              <Text className='text-[#0A0A0B] text-[14px] font-semibold mt-2'>Daily Check In</Text>
              </View>
              <View>
              <Image source={images.planning2} className='mx-auto'/>
              <Text className='text-[#0A0A0B] text-[14px] font-semibold mt-2'>View Proposals</Text>
              </View>
              <View>
              <Image source={images.planning3} className='mx-auto'/>
              <Text className='text-[#0A0A0B] text-[14px] font-semibold mt-2'>Join courses</Text>
              </View>
            </View>
          </View>

        </View>
      </View>
    </SafeAreaView>
  )
}

export default Home;

const styles = StyleSheet.create({
  img: {
    height: 200,
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#D2E0F3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {

    fontWeight: 'bold',
  },
  searchImg: {
    width: 24,
    height: 24,
  }
});