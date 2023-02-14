import { View, Image, Text, SafeAreaView, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'

import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
import { bgHomepage } from '../contains/bgHomePage'

import emailIcon from "../assets/email.png"
import passwordIcon from "../assets/password.png"
import googleIcon from "../assets/google.png"


const Login = ({ navigation }) => {
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
                <View className="flex-row items-center my-3 mx-4">
                    <Image source={emailIcon}/>
                    <TextInput 
                        className="text-basic text-base ml-2 w-full"
                        placeholder='Email'
                    />
                </View>
                <View className="w-full h-[1px] bg-[#A8AFB5]"></View>
                <View className="flex-row items-center my-3 mx-4">
                    <Image source={passwordIcon} />
                    <TextInput 
                        className="text-basic text-base ml-2 w-full"
                        placeholder='Password'
                    />
                </View>
            </View>
            <View className="flex items-end">
                <Text className="text-basic">Forgot password?</Text>
            </View>
            <TouchableOpacity className="bg-primary rounded-xl py-3 my-2">
                <Text className="text-center text-white font-bold text-lg">Log in</Text>
            </TouchableOpacity>
            <Text className="text-center text-basic">Or, login with...</Text>
            <TouchableOpacity className="flex-row items-center justify-center border-[2px] border-[#A8AFB5] rounded-xl py-3 my-2">
                <Image source={googleIcon} />
                <Text className="text-center text-basic font-bold text-lg ml-2">Google</Text>
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

export default Login