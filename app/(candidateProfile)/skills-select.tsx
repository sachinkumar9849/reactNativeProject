import { View, Text, StatusBar, ScrollView, Image, TextInput, Alert, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { images } from '@/constants'
import SkillTitle from '@/components/comman/SkillTitle'
import { ActivityIndicator } from 'react-native'
import { GET_SKILLS } from '../apollo/queries'
import { gql, useMutation, useQuery } from '@apollo/client'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { useAuth } from '../hooks/useAuth'
import AsyncStorage from '@react-native-async-storage/async-storage'


interface SkillsData {
    skills: Skill[]
}

const ADD_SKILLS = gql`
  mutation AddSkills($input: AddSkillsInput!) {
    addSkills(input: $input) {
      success
      message
    }
  }
`

interface Skill {
    id: string
    name: string
}
interface SkillsData {
    skills: Skill[]
}

interface AddSkillsResponse {
    addSkills: {
        success: boolean
        message: string
    }
}

const Skills = () => {
    const { isAuthenticated, isLoading } = useAuth();
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedSkills, setSelectedSkills] = useState<Skill[]>([])
    const { loading, error, data } = useQuery<SkillsData>(GET_SKILLS)
    const [addSkills, { loading: addingSkills }] = useMutation<AddSkillsResponse>(ADD_SKILLS)

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const userData = await AsyncStorage.getItem("userData");
                const parsedUserData = userData ? JSON.parse(userData) : null;

                console.log("Authentication Status:", isAuthenticated);
                console.log("Loading Status:", isLoading);
                console.log("User Data:", parsedUserData);

                if (!isLoading && !isAuthenticated) {
                    router.replace('/login')
                }
            } catch (error) {
                console.log("Error checking auth status:", error);
            }
        };

        checkAuthStatus();
    }, [isAuthenticated, isLoading]);
    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#1D4F95" />
            </View>
        )
    }


    const filteredSkills = data?.skills.filter(skill =>
        skill.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || []


    const toggleSkill = (skill: Skill) => {
        const isSelected = selectedSkills.some(s => s.id === skill.id)
        if (isSelected) {
            setSelectedSkills(selectedSkills.filter(s => s.id !== skill.id))
        } else {
            setSelectedSkills([...selectedSkills, skill])
        }
    }

    const handleClicked = async () => {
        if (selectedSkills.length === 0) {
            Alert.alert('Error', 'Please select at least one skill')
            return
        }
        try {
            const userData = await AsyncStorage.getItem("userData");
            const parsedUserData = userData ? JSON.parse(userData) : null;
            console.log("Current User Data:", parsedUserData);
            console.log("Selected Skills:", selectedSkills);
            const response = await addSkills({
                variables: {
                    input: {
                        candidate_id: parsedUserData.id.toString(),
                        skills: selectedSkills.map(skill => skill.name).join(",")
                    }
                }
            })
            if (response.data?.addSkills.success) {
                Alert.alert('Success', response.data.addSkills.message, [
                    {
                        text: 'OK',
                        onPress:()=>{
                        setSelectedSkills([]);
                        router.push("/add-role")
                       }
                    }
                ])
            } else {
                Alert.alert('Error', 'Failed to add skills')
            }
        } catch (error) {
            Alert.alert('Error', 'Something went wrong while adding skills')
        }


        router.push("/add-role")
    }

    return (
        <SafeAreaView className='flex-1'>
            <ScrollView className='bg-white px-7 pt-10'>
                <View>
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
                        <Text className='text-[#0A0A0B] text-[12] font-normal mt-4'>
                            Choose the skills that best define your strengths and expertise. Help employers quickly understand what makes you the right fit for their team.
                        </Text>
                    </View>

                    <View className='my-6'>
                        <TextInput
                            className='rounded-md'
                            style={styles.textInput}
                            placeholder={'Skills'}
                            value={searchTerm}
                            onChangeText={setSearchTerm}
                        />
                    </View>


                    {selectedSkills.length > 0 && (
                        <View>
                            <Text className='text-[#0A0A0B] text-[12px] font-semibold'>Selected Skills</Text>
                            <View className='flex flex-row flex-wrap gap-2 mt-0'>
                                {selectedSkills.map(skill => (
                                    <TouchableOpacity
                                        key={skill.id}
                                        style={styles.textInput}
                                        className='mt-5 flex flex-row items-center p-2 rounded-md'
                                        onPress={() => toggleSkill(skill)}
                                    >

                                        <Text>{skill.name}</Text>
                                        <Image className='ml-2' source={images.close} />

                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    )}

                    <View>
                        <Text className='text-[#0A0A0B] text-[12px] font-semibold my-3'>Suggested Skills</Text>
                    </View>

                    {loading ? (
                        <ActivityIndicator size="large" className='mt-5' />
                    ) : error ? (
                        <Text className='mt-5 text-red-500'>Error loading skills</Text>
                    ) : (
                        <View className='flex flex-row flex-wrap gap-2'>
                            {filteredSkills.map(skill => (
                                <TouchableOpacity
                                    key={skill.id}
                                    style={[
                                        styles.textInput,
                                        selectedSkills.some(s => s.id === skill.id) && styles.selectedSkill
                                    ]}
                                    className='mt-5 flex flex-row items-center p-2 rounded-md'
                                    onPress={() => toggleSkill(skill)}
                                >
                                    <Image source={images.add} className='mr-2' />
                                    <Text>{skill.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>
            </ScrollView>
            <View className='py-3' style={styles.nextButtonContainer}>
                <TouchableOpacity
                    style={[
                        styles.nextButton,
                        addingSkills && { opacity: 0.7 }
                    ]}
                    onPress={handleClicked}
                    disabled={addingSkills}
                >
                    {addingSkills ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <Text style={styles.nextButtonText}>Next</Text>
                    )}
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
        padding: 16,
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
        justifyContent: "flex-end",
        alignItems: "flex-end",
        paddingRight: 11,


    },
    nextButton: {
        backgroundColor: '#1D4F95',
        paddingVertical: 14,
        paddingHorizontal: 30,
        borderRadius: 10,


    },
    nextButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Skills