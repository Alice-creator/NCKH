import { View, Image, Text, SafeAreaView, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'

import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
import { bgHomepage } from '../contains/bgHomePage'

import emailIcon from "../assets/email.png"
import passwordIcon from "../assets/password.png"
import googleIcon from "../assets/google.png"
import eyeIcon from "../assets/eye.png"
import closeEyeIcon from "../assets/closeEye.png"

import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = ({ navigation }) => {
    const [ gmail, setGmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const [ hidden, setHidden ] = useState(true)

    const handleLogin = async () => {
        const data = { gmail, password }

        fetch('http://192.168.44.230:5000/Account/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then(async (data) => {
            if(data.status) {
                console.log("data",data)
                await AsyncStorage.setItem('user', JSON.stringify({ username : data.username, gmail, avatar: '' }));
                navigation.navigate('Discover')
            } else {
                console.log('tai khoan khong ton tai')
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    }
            
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
                    <View className="w-6 h-6">
                        <Image className="w-full h-full" source={emailIcon} style={{tintColor: ''}}/>
                    </View>
                    <TextInput 
                        className="text-basic text-base ml-2 w-full"
                        placeholder='Email'
                        onChangeText={(e) => setGmail(e)}
                    />
                </View>
                <View className="w-full h-[1px] bg-[#A8AFB5]"></View>
                <View className="flex-row items-center justify-between my-3 mx-4">
                    <View className="flex-row flex-1">
                        <View className="w-6 h-6">
                            <Image className="w-full h-full" source={passwordIcon} style={{tintColor: ''}}/>
                        </View>
                        <TextInput 
                            secureTextEntry={hidden} 
                            className="text-basic w-full text-base ml-2"
                            placeholder='Password'
                            onChangeText={(e) => setPassword(e)}
                        />
                    </View>
                    {
                        password.length > 0 && 
                            <TouchableOpacity className="w-6 h-6" onPress={() => setHidden(!hidden)}>
                                <Image className="w-full h-full" source={hidden ? closeEyeIcon : eyeIcon} style={{tintColor: ''}}/>
                            </TouchableOpacity>
                    }
                </View>
            </View>
            <View className="flex items-end">
                <Text className="text-basic">Forgot password?</Text>
            </View>
            <TouchableOpacity className="bg-primary rounded-xl py-3 my-2"
                onPress={handleLogin}
            >
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