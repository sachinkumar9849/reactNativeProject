import { View, Text, StatusBar, ScrollView, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { images } from '@/constants'
import SkillTitle from '@/components/comman/SkillTitle'

import { ActivityIndicator } from 'react-native'
import { GET_SKILLS } from '../apollo/queries'
import { useQuery } from '@apollo/client'

interface Skill {
    id: string
    name: string
}
interface SkillsData {
    skills: Skill[]
}

const Skills = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedSkills, setSelectedSkills] = useState<Skill[]>([])


    const { loading, error, data } = useQuery<SkillsData>(GET_SKILLS)


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

    return (
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
});

export default Skills