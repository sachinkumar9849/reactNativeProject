
import { View, Text, StatusBar, ScrollView, Image, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { images } from '@/constants'
import SkillTitle from '@/components/comman/SkillTitle'
import CustomButton from '@/components/comman/CustomButton'
import { useQuery } from '@apollo/client'
import { CANDIDATE_CERTIFICATION, MY_DETAIL_QUERY } from '../apollo/queries'


interface EducationProps {
    id: string;
    name: string;
    organization: string;
    issued_date: string | number;
    expiry_date: string | number;
    credential_id: string | number;
    credential_url: string;

}



const ShowExperience = () => {
    const { loading, error, data } = useQuery<EducationProps>(CANDIDATE_CERTIFICATION);


    const handlePress = () => {
        router.push("/add-experience-form")
    }
    const AddExperience = () => {
        router.push("/add-experience-form")
    }



    return (
        <SafeAreaView className='flex-1'>
            <ScrollView className='bg-white px-7 pt-10 pb-36'>
                <View >
                    <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
                    <View className="flex flex-row items-center">

                        <TouchableOpacity onPress={() => router.push("/add-education")}>
                            <Image source={images.arrowBlack} />
                        </TouchableOpacity>
                        <Text className='text-[#262626] font-bold ml-5 text-[18px]'>Setup your profile</Text>
                    </View>
                    <View className='flex justify-center w-full items-center mt-10'>
                        <Image resizeMode='contain' source={images.certificate} />
                    </View>
                    <View className='mt-7'>
                        <SkillTitle titleSkill="Highlight Your Journey!" />
                        <Text className='text-[#0A0A0B] text-[12px] font-normal mt-4'>
                            Add your work experience to showcase your career path and achievements to potential employers.
                        </Text>
                    </View>
                    {loading ? (
                        <Text>Loading experience...</Text>
                    ) : error ? (
                        <Text>Error loading experience : {error.message}</Text>
                    ) : (
                        data?.CandidateCertification.map((experience: EducationProps) => (
                            <View key={experience.id} className='border rounded-md border-[#B5B3B3] p-4 mt-4 flex flex-row justify-between'>
                                <View className='' style={styles.textBlock}>
                                    <Text className='text-[18px] font-normal'>{experience.name}</Text>
                                    <View className='flex flex-row mt-2'>
                                        <Text className='text-[#0A0A0B] text-[14px]'>{experience.organization} </Text>



                                    </View>

                                    <Text className='text-[#433E3F] text-[12px] mt-2'>Issued {experience.issued_date}</Text>
                                </View>
                                <View className='flex flex-col items-end justify-items-end' style={styles.wrapBtn}>
                                    <Image className='mb-2' source={images.edit} />
                                    <Image source={images.deleteBtn} />
                                </View>
                            </View>
                        ))
                    )}
                    <View className='w-3/6 mt-6 mb-40'>
                        <CustomButton onPress={AddExperience} title="Add Experience" />
                    </View>


                </View>
            </ScrollView>
            <View className='py-3 px-3 flex flex-row justify-between w-full bg-black' style={styles.nextButtonContainer}>
                <TouchableOpacity
                    className=' p-0 px-[20px] py-[10px] rounded-md'
                    onPress={() => router.push("/languageAdd")}

                >
                    <Text className='text-[#1D4F95] font-semibold text-[16]'>
                        Skip
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={() => router.push("/languageAdd")}
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
    },
    nextButton: {
        backgroundColor: '#1D4F95',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },

    nextButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '400',
    },
    textBlock: {
        width: "70%"
    },
    wrapBtn: {
        width: "20%"
    }
});

export default ShowExperience