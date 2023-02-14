import { View, Image, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'

import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
import { bgHomepage } from '../contains/bgHomePage'

const Signup = ({ navigation }) => {
  return (
    <SafeAreaView className="flex-1 relative">
        <View style={{ height: height * 0.8, width: width }}>
            <Image 
                source={bgHomepage[1]}
                resizeMode="cover"
                className={`h-full object-cover w-full flex-1`}
            />
        </View>
        <View className="absolute bottom-0 bg-theme rounded-t-2xl w-full py-5 px-7">
            <View className="mb-2">
                <Text className="text-center text-[26px] font-bold text-bold-txt tracking-wider">Hello Again!</Text>
                <Text className="text-center text-basic">Welcome back you've been missed</Text>
            </View>
            <View className="rounded-xl w-full border-[1px] border-[#A8AFB5] my-2">
                <View className="my-3 mx-4">
                    <Text className="text-basic text-base">Email</Text>
                </View>
                <View className="w-full h-[1px] bg-[#A8AFB5]"></View>
                <View className="my-3 mx-4">
                    <Text className="text-basic text-base">Password</Text>
                </View>
            </View>
            <View className="flex items-end">
                <Text className="text-basic">Forgot password?</Text>
            </View>
            <TouchableOpacity className="bg-primary rounded-xl py-3 my-2">
                <Text className="text-center text-white font-bold text-lg">Log in</Text>
            </TouchableOpacity>
            <Text className="text-center text-basic">Or, Signup with...</Text>
            <TouchableOpacity className="border-[2px] border-[#A8AFB5] rounded-xl py-3 my-2">
                <Text className="text-center text-basic font-bold text-lg">Google</Text>
            </TouchableOpacity>
            <View className="flex-row items-center justify-center mb-6">
                <Text className="text-basic mr-2">Not a memner?</Text>
                <Text className="font-bold text-primary tracking-wider"
                      onPress={() => navigation.navigate("Signup")}
                >Register now</Text>
            </View>
      </View>
    </SafeAreaView>
  )
}

export default Signup