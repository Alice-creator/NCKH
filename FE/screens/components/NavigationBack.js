import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import arrow_back from "../../assets/arrow_back.png"

const NavigationBack = ({ navigation, to }) => {
  return (
    <TouchableOpacity className="bg-theme rounded-full p-[8px] w-9 h-9 absolute top-6 left-4 z-20"
        onPress={() => navigation.navigate(to)}
    >
        <Image className="w-full h-full" source={arrow_back} />
    </TouchableOpacity>
  )
}

export default NavigationBack