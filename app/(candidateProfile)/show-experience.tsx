
import { View, Text, StatusBar, ScrollView, Image, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { images } from '@/constants'
import SkillTitle from '@/components/comman/SkillTitle'
import CustomButton from '@/components/comman/CustomButton'
import { useQuery } from '@apollo/client'
import { MY_DETAIL_QUERY } from '../apollo/queries'

interface Country {
    id: string;
    iso: string;
    nicename: string;
    phonecode: string;
}

interface Experience {
    id: string;
    candidate_id: string;
    title: string;
    company: string;
    location: string;
    currently_working: boolean;
    start_date: string;
    end_date: string | null;
    description: string;
    country: Country;
}

interface MyDetailData {
    myDetail: {
        id: string;
        status: string | null;
        is_favourite: boolean | null;
        experiences: Experience[];
        user_id: string;
    };
}

const ShowExperience = () => {
    const { loading, error, data } = useQuery<MyDetailData>(MY_DETAIL_QUERY);


    const handlePress = () => {
        router.push("/add-experience-form")
    }
    const AddExperience = () => {
        router.push("/add-experience-form")
    }

    const formatDate = (dateString: string | null) => {
        if (!dateString) return "Present";

        const [month, year] = dateString.split("-");
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return `${monthNames[parseInt(month) - 1]} ${year}`;
    }

    return (
        <SafeAreaView className='flex-1'>
            <ScrollView className='bg-white px-7 pt-10 pb-36'>
                <View >
                    <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
                    <View className="flex flex-row items-center">
                        <Image source={images.arrowBlack} width={33} height={33} />
                        <Text className='text-[#262626] font-bold ml-5 text-[18px]'>Setup your profile</Text>
                    </View>
                    <View className='flex justify-center w-full items-center mt-10'>
                        <Image resizeMode='contain' source={images.addExperience} />
                    </View>
                    <View className='mt-7'>
                        <SkillTitle titleSkill="Highlight Your Journey!" />
                        <Text className='text-[#0A0A0B] text-[12] font-normal mt-4'>
                            Add your work experience to showcase your career path and achievements to potential employers.
                        </Text>
                    </View>
                    {loading ? (
                        <Text>Loading experience...</Text>
                    ) : error ? (
                        <Text>Error loading experience : {error.message}</Text>
                    ) : (
                        data?.myDetail.experiences.map((experience) => (
                            <View key={experience.id} className='border rounded-md border-[#B5B3B3] p-4 mt-4 flex flex-row justify-between'>
                                <View className='textBlock' style={styles.textBlock}>
                                    <Text className='text-[18px] font-normal'>{experience.title}</Text>
                                    <View className='flex flex-row mt-4'>
                                        <Text className='text-[#0A0A0B] text-[14px]'>{experience.company} </Text> |
                                        <Text className='text-[#0A0A0B] text-[14px]'>
                                            {formatDate(experience.start_date)} - {formatDate(experience.end_date)}
                                        </Text>
                                    </View>
                                    <Text className='text-[12px] text-[#433E3F] my-2'>
                                        {experience.location}, {experience.country.nicename}
                                    </Text>
                                    <Text className='text-[#433E3F] text-[12px]'>{experience.description}</Text>
                                </View>
                               <View className='flex flex-col items-end justify-items-end' style={styles.wrapBtn}>
                                <Image className='mb-2' source={images.edit}/>
                                <Image source={images.deleteBtn}/>
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
                    style={styles.nextButton}
                    onPress={handlePress}
                >
                    <Text style={styles.nextButtonText}>
                        Skip
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={handlePress}
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
        width: "80%"
    },
    wrapBtn: {
        width: "20%",
    }
});

export default ShowExperience