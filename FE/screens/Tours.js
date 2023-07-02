import { View, Text, SafeAreaView, Image, ScrollView } from 'react-native'
import React from 'react'
import NavigationBack from './components/NavigationBack'

const Tours = ({ navigation }) => {
  return (
    <SafeAreaView>
        <NavigationBack navigation={navigation} to={"Discover"}/>
        <View className="my-6">
        <Text className="text-bold-txt font-bold text-center text-xl tracking-wider">Tours</Text>
      </View>
      <ScrollView className="px-3 py-2">
        <View> 
            <Text className="font-bold text-lg text-primary mt-2">Tour 1: Exploring the trace of the past in the heart of the city</Text>
            <View className="flex flex-row my-1">
                <View className="w-14 h-14 rounded-lg mr-2 p-[2px] border-[2px] border-[#e2e2e2]">
                    <Image className="w-full h-full rounded-lg" source={{
                    // uri: `${data.image}` 
                    uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/C%E1%BB%95ng_ch%C3%B9a_V%C4%A9nh_Nghi%C3%AAm.jpg/375px-C%E1%BB%95ng_ch%C3%B9a_V%C4%A9nh_Nghi%C3%AAm.jpg"
                    }}/>
                </View>
                <View className="flex flex-col justify-center">
                    {/* <Text className="font-bold text-[14px] text-bold-txt">{data.name}</Text>
                    <Text className="text-[13px] text-basic">{data.address}</Text> */}
                    <Text className="font-bold text-base text-bold-txt">Name </Text>
                    <Text className="text-sm text-basic">Address</Text>
                </View>
            </View>
            <View className="flex flex-row my-1">
                <View className="w-14 h-14 rounded-lg mr-2 p-[2px] border-[2px] border-[#e2e2e2]">
                    <Image className="w-full h-full rounded-lg" source={{
                    // uri: `${data.image}` 
                    uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/C%E1%BB%95ng_ch%C3%B9a_V%C4%A9nh_Nghi%C3%AAm.jpg/375px-C%E1%BB%95ng_ch%C3%B9a_V%C4%A9nh_Nghi%C3%AAm.jpg"
                    }}/>
                </View>
                <View className="flex flex-col justify-center">
                    {/* <Text className="font-bold text-[14px] text-bold-txt">{data.name}</Text>
                    <Text className="text-[13px] text-basic">{data.address}</Text> */}
                    <Text className="font-bold text-base text-bold-txt">Name </Text>
                    <Text className="text-sm text-basic">Address</Text>
                </View>
            </View>
            
            <View className="w-full h-[2px] rounded-lg bg-gray-200"></View>
        </View>
        <View> 
            <Text className="font-bold text-lg text-primary mt-2">Tour 2: Exploring the trace of the past in the heart of the city</Text>
            <View className="flex flex-row my-1">
            <View className="w-14 h-14 rounded-lg mr-2 p-[2px] border-[2px] border-[#e2e2e2]">
                <Image className="w-full h-full rounded-lg" source={{
                // uri: `${data.image}` 
                uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/C%E1%BB%95ng_ch%C3%B9a_V%C4%A9nh_Nghi%C3%AAm.jpg/375px-C%E1%BB%95ng_ch%C3%B9a_V%C4%A9nh_Nghi%C3%AAm.jpg"
                }}/>
            </View>
            <View className="flex flex-col justify-center">
                {/* <Text className="font-bold text-[14px] text-bold-txt">{data.name}</Text>
                <Text className="text-[13px] text-basic">{data.address}</Text> */}
                <Text className="font-bold text-base text-bold-txt">Name </Text>
                <Text className="text-sm text-basic">Address</Text>
            </View>
            </View>
            
            <View className="w-full h-[2px] rounded-lg bg-gray-200"></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Tours