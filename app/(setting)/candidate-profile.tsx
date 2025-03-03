import { View, Text, Image, Button, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { images } from '@/constants'
import { router } from 'expo-router'
import { useQuery } from '@apollo/client';
import type { CandidateDetailResponse } from '@/type/type';
import { GET_CANDIDATE_DETAIL } from '../apollo/queries';
import { useAuth } from '../hooks/useAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const formatDate = (dateString: string | null) => {
  if (!dateString) return 'Present';

  const [month, year] = dateString.split('-');
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return `${monthNames[parseInt(month) - 1]} ${year}`;
};


const CandidateProfile = () => {
  const { userData } = useAuth();




  const candidateId = userData?.candidate?.id;
  const { loading, error, data } = useQuery<CandidateDetailResponse>(
    GET_CANDIDATE_DETAIL,
    { variables: { candidateId } }

  )

  console.log("Checkek user detail", candidateId)
  if (loading) return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );

  if (error) return (
    <View className="flex-1 justify-center items-center p-4">
      <Text className="text-red-500 text-lg">Error: {error.message}</Text>
    </View>
  );
  if (!data?.candidateDetail?.data) return (
    <View className="flex-1 justify-center items-center p-4">
      <Text className="text-lg">No candidate data found</Text>
    </View>
  )
  const candidate = data.candidateDetail.data;
  const fullName = `${candidate.first_name} ${candidate.last_name}`;



  return (
    <ScrollView>
      <View>
        <View className='px-4 flex justify-between flex-row py-8 border-b border-[#E6E6E6]'>
          <TouchableOpacity onPress={() => router.push("profile")}> <Image source={images.angle} /></TouchableOpacity>
          <Text className='text-[#0A0A0B] text-[18px] font-semibold'>Profile</Text>
          <Text className='text-white'>o</Text>
        </View>
        <View className='p-4 flex flex-row'>
          <View className='mr-3'>
            <Image source={images.settingUser} />
          </View>
          <View>
            <Text className='text-[14px] mb-4'>{fullName}</Text>
            <Text className='text-[12px] text-[#5A5555]'>Email</Text>
            <Text className='text-[14px] mb-4'>{candidate.user.email}</Text>
            <Text className='text-[12px] text-[#5A5555]'>Phone</Text>
            <Text className='text-[14px] mb-4'>{candidate.phone}</Text>

          </View>
        </View>
        <View className='border-b border-t border-[#E6E6E6] flex flex-row items-center justify-between p-4'>
          <Text className='text-[18px]'>{candidate?.profile?.role}</Text>
          <TouchableOpacity>
            <Image source={images.edit} />
          </TouchableOpacity>
        </View>
        <View className='border-b border-t border-[#E6E6E6] flex flex-row items-center justify-between p-4'>
          <View className='w-[80%]'>
            <Text className='text-[12px]'>{candidate?.profile?.bio}</Text>
          </View>
          <TouchableOpacity>
            <Image source={images.edit} />
          </TouchableOpacity>
        </View>
        <View className='border-b border-t border-[#E6E6E6] flex flex-row items-center justify-between p-4'>
          <View className='w-[80%]'>
            <Text className='text-[18px] mb-2'>Skills</Text>
            <View className='flex flex-wrap flex-row gap-2'>
              {candidate.skills.map((skill) => (
                <Text key={skill.id} className='text-[14px] bg-[#F6F7FF] rounded-md px-2 py-1'>
                  {skill.name}
                </Text>
              ))}
            </View>
          </View>
          <TouchableOpacity>
            <Image source={images.edit} />
          </TouchableOpacity>
        </View>
        <View className='border-b border-t border-[#E6E6E6] flex flex-row items-center justify-between p-4'>
          <View className='w-[80%]'>
            <Text className='text-[18px] mb-3'>Work Experience</Text>
            {candidate.experiences.map((exp) => (
              <View key={exp.id} className="mb-4">
                <Text className='text-[14px] font-medium'>{exp.title}</Text>
                <Text className='text-[14px] py-1'>
                  {exp.company} | {formatDate(exp.start_date)} - {formatDate(exp.end_date)}
                </Text>
                <Text className='text-[12px] text-[#433E3F]'>{exp.location}, {exp.country.nicename}</Text>
                <Text className='text-[12px] mt-1'>{exp.description}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity>
            <Image source={images.edit} />
          </TouchableOpacity>
        </View>
        <View className='border-b border-[#E6E6E6] flex flex-row items-start justify-between p-4'>
          <View className='w-[80%]'>
            <Text className='text-[18px] mb-3'>Education</Text>
            {candidate.education.map((edu) => (
              <View key={edu.id} className="mb-4">
                <Text className='text-[14px] font-medium'>{edu.degree}</Text>
                <Text className='text-[14px] py-1'>{edu.school} | {edu.date_attended} - {edu.graduated_date}</Text>
                <Text className='text-[12px] text-[#433E3F]'>{edu.field_of_study}</Text>
                <Text className='text-[12px] mt-1'>{edu.description}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity>
            <Image source={images.edit} />
          </TouchableOpacity>
        </View>
        <View className='border-b border-[#E6E6E6] flex flex-row items-start justify-between p-4'>
          <View className='w-[80%]'>
            <Text className='text-[18px] mb-3'>Certificates</Text>
            {candidate.certifications.map((cert) => (
              <View key={cert.id} className="mb-4">
                <Text className='text-[16px] text-[#0A0A0B]'>{cert.name}</Text>
                <Text className='text-[14px] py-1'>{cert.organization}</Text>
                <Text className='text-[12px] text-[#433E3F]'>
                  Issued: {new Date(cert.issued_date).getFullYear()} |
                  Expires: {new Date(cert.expiry_date).getFullYear()}
                </Text>
              </View>
            ))}
          </View>
          <TouchableOpacity>
            <Image source={images.edit} />
          </TouchableOpacity>
        </View>
        <View className='border-b border-[#E6E6E6] flex flex-row items-start justify-between p-4'>
          <View className='w-[80%]'>
            <Text className='text-[18px] mb-3'>Languages</Text>
            {candidate.languages.map((lang) => (
              <View key={lang.id} className="flex flex-row justify-between mb-2">
                <Text className='text-[14px]'>{lang.language}</Text>
                <Text className='text-[14px] text-[#5A5555]'>{lang.proficiency}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity>
            <Image source={images.edit} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

export default CandidateProfile
