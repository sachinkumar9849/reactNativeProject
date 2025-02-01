import { View, Text } from 'react-native'
import React from 'react'

const SkillTitle = ({titleSkill}) => {
  return (
    <View>
      <Text className='font-normal text-[18px] text-[#0A0A0B]'>{titleSkill}</Text>
    </View>
  )
}

export default SkillTitle