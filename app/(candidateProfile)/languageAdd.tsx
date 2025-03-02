
import { View, Text, StatusBar, ScrollView, Image, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { images } from '@/constants'
import SkillTitle from '@/components/comman/SkillTitle'
import CustomButton from '@/components/comman/CustomButton'

const LanguageAdd = () => {

    const AddExperience = () => {
        router.push("/search-language")
    }

    return (
        <SafeAreaView className='flex-1'>
            <ScrollView className='bg-white px-7 pt-10'>
                <View>
                    <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
                    <View className="flex flex-row items-center">
                        <TouchableOpacity onPress={() => router.push("/show-certifications")}>
                            <Image source={images.arrowBlack} width={33} height={33} />
                        </TouchableOpacity>
                        <Text className='text-[#262626] font-bold ml-5 text-[18px]'>Setup your profile</Text>

                    </View>
                    <View className='flex justify-center w-full items-center mt-10'>
                        <Image source={images.language} />
                    </View>
                    <View className='mt-7'>
                        <SkillTitle titleSkill="Highlight Your Language Skills!" />
                        <Text className='text-[#0A0A0B] text-[12] font-normal mt-4'>
                        Add your language proficiencies to demonstrate your communication abilities and connect with diverse opportunities.
                        </Text>
                    </View>
                    <View className='w-3/6 mt-6'>
                        <CustomButton onPress={AddExperience} title="Add Language" />
                    </View>
                </View>
            </ScrollView>
            <View className='py-3 px-3 flex flex-row justify-between w-full bg-black' style={styles.nextButtonContainer}>
                <TouchableOpacity
                    className=' p-0 px-[20px] py-[10px] rounded-md'
                    onPress={() => router.push("/candidate-bio")}

                >
                    <Text className='text-[#1D4F95] font-semibold text-[16]'>
                        Skip
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={() => router.push("/show-education")}
                >
                    <Text style={styles.nextButtonText}>
                        Next
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

        paddingRight: 11,


    },
    nextButton: {
        backgroundColor: '#1D4F95',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    nextButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default LanguageAdd