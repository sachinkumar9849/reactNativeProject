import { View, Text, StatusBar, ScrollView, Image, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { images } from '@/constants'
import SkillTitle from '@/components/comman/SkillTitle'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useMutation } from '@apollo/client'
import { ADD_ROLE } from '../apollo/queries'
import { router } from 'expo-router'

interface AddRoleInput {
    role: string
    
}

interface AddRoleResponse {
    addRole: {
        success: boolean
        message: string
        role: string
    }
}

const AddRole = () => {
    const [role, setRole] = useState("");
    const [addRole, { loading }] = useMutation<AddRoleResponse, AddRoleInput>(ADD_ROLE);

    const handleSubmit = async () => {
        if (!role.trim()) {
            Alert.alert("Error", "Please enter a professional role");
            return;
        }

        try {
            const response = await addRole({
                variables: { 
                    input: { role }  // Wrap role in input object
                }
            });

            if (response.data?.addRole.success) {
                router.push("/add-experience"); 
            } else {
                Alert.alert("Error", response.data?.addRole.message || "Something went wrong");
            }
        } catch (error) {
            Alert.alert("Error", "Failed to submit role");
            console.error(error);
        }
    };

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
                        <Image source={images.role} />
                    </View>

                    <View className='mt-7'>
                        <SkillTitle titleSkill="Define Your Role!" />
                        <Text className='text-[#0A0A0B] text-[12] font-normal mt-4'>
                            Choose the job title that best describes your expertise to help employers find the right match.
                        </Text>
                    </View>
                    <View className='mt-7'>
                        <TextInput
                            className='rounded-md'
                            style={styles.textInput}
                            placeholder={'Your Professional role'}
                            value={role}
                            onChangeText={setRole}
                        />
                        <Text className='text-[#00000099] text-[12px] pl-2 pt-1'>Example: Warehouse Worker</Text>
                    </View>
                </View>
            </ScrollView>
            <View className='py-3' style={styles.nextButtonContainer}>
                <TouchableOpacity 
                    style={styles.nextButton} 
                    onPress={handleSubmit}
                    disabled={loading}
                >
                    <Text style={styles.nextButtonText}>
                        {loading ? 'Submitting...' : 'Submit'}
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
        justifyContent: "flex-end",
        alignItems: "flex-end",
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

export default AddRole