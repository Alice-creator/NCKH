import { View, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import Loading from './Loading'

const ScanLoading = ({ image, photo }) => {
  console.log(image)
  return (
    <View className="flex-1 w-full h-full flex justify-center items-center px-12">
      <View className="flex flex-col">
          <Image 
            source={{uri: image}}
            className="w-full h-2/3 my-4 rounded-lg"
          />
      <ActivityIndicator size="large" color="#3F95EC" />

      </View>
    </View>
  )
}

export default ScanLoading