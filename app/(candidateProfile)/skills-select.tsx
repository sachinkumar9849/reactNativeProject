import { View, Text, StatusBar, ScrollView, Image, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { images } from '@/constants'
import SkillTitle from '@/components/comman/SkillTitle'

const Skills = () => {
    return (
        <ScrollView className='bg-white px-7 pt-10'>
            <View className=''>
                <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
                <View className="flex flex-row items-center">
                    <Image source={images.arrowBlack} width={33} height={33} />
                    <Text className='text-[#262626] font-bold ml-5 text-[18px]'>Setup your profile</Text>
                </View>
                <View className='flex justify-center w-full items-center mt-10'>
                    <Image source={images.skills1} />
                </View>
                <View className='mt-7'>
                    <SkillTitle titleSkill="Select your skills below to showcase what you can do." />
                    <Text className='text-[#0A0A0B] text-[12] font-normal mt-4'>Choose the skills that best define your strengths and expertise. Help employers quickly understand what makes you the right fit for their team.</Text>
                </View>
                <View className='my-6'>
                    <TextInput className='rounded-md'
                        style={styles.textInput}

                        placeholder={'Skills'}
                    />
                </View>
                <View>
                    <Text className='text-[#0A0A0B] text-[12px] font-semibold'>Suggested Skills</Text>
                </View>
                <View className='flex flex-wrap'>
                    <View style={styles.textInput} className=' mt-5 flex flex-row items-center p-2 rounded-md'>
                        <Image source={images.add} />
                        <Text> Housekeeping</Text>
                    </View>
                    <View style={styles.textInput} className=' mt-5 flex flex-row items-center p-2 rounded-md'>
                        <Image source={images.add} />
                        <Text> Housekeeping</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    textInput: {
        padding: 16,
        borderColor: 'gray',

        borderWidth: 1,

    },
});
export default Skills