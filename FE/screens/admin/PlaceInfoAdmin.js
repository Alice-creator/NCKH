import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

import location from "../../assets/location.png"

const PlaceInfoAdmin = ({ navigation, data, language }) => {
    
    const handleDetail = (data) => {
        navigation.navigate("UpdatePlaceForm", { data, language })
    }

  return (
    <TouchableOpacity className="mr-4 my-2" key={`${Math.random()}`}
                    onPress={() => handleDetail(data)}
    >
        <View className="w-[170px] p-[8px] bg-white shadow flex rounded-2xl">
            <Image source={{ uri: data.images }} className="w-full h-[150px] object-contain rounded-2xl relative opacity-[0.85]" />
            <Text className="text-[17px] font-semibold mx-1 mt-1 text-bold-txt">{data.en_name}</Text>
            <View className="flex-row items-center">
                <Image source={location} className="w-5 h-5" />
                <Text className="text-sm text-basic" > {data.location_string} </Text>
            </View>
        </View>
    </TouchableOpacity>  
  )
}

export default PlaceInfoAdmin