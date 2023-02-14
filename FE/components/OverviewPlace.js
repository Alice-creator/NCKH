import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import like from "../assets/like.png"
import location from "../assets/location.png"

const OverviewPlace = ({ value }) => {
    console.log(value.result_object.photo.images.original.url)
  return (
        <TouchableOpacity className="my-2 mr-4" key={value.result_object.location_id}>
            <View className="w-[200px] h-12 p-[8px] bg-white flex rounded-2xl ">
                <Image source={{ uri: value.result_object.photo.images.original.url}} className="w-full h-full object-contain rounded-2xl relative opacity-[0.85]" />
                <View className="absolute top-3 left-3 right-3 flex-row justify-between items-center">
                    <View className="bg-white opacity-80 px-3 py-1 rounded-2xl">
                        <Text className="">⭐ 4.3</Text>
                    </View>
                    <View className="bg-white opacity-80 p-2 flex items-center justify-center rounded-full">
                        <Image source={like} className="z-50 w-5 h-5" />
                    </View>
                </View>
                <Text className="text-[17px] font-semibold mx-1 mt-1 text-bold-txt">{value.result_object.name}</Text>
                <View className="flex-row items-center">
                        <Image source={location} className="w-5 h-5" />
                        <Text className="text-sm text-basic" > {value.result_object.location_string} </Text>
                </View>
            </View>
        </TouchableOpacity>
  )
}

export default OverviewPlace