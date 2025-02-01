import { View, Text } from 'react-native'
import React from 'react'

const Title = ({title}) => {
  return (
    <View>
      <Text className='text-[#0A0A0B] font-semibold text-[18px] mb-3'>{title}</Text>
    </View>
  )
}

export default Title