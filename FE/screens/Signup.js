import { View, Image, Text, SafeAreaView, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'

import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
import { bgHomepage } from '../contains/bgHomePage'

import usernameIcon from "../assets/username.png"
import emailIcon from "../assets/email.png"
import passwordIcon from "../assets/password.png"
import googleIcon from "../assets/google.png"
import eyeIcon from "../assets/eye.png"
import closeEyeIcon from "../assets/closeEye.png"

import axios from 'axios';

const Signup = ({ navigation }) => {
    const [ username, setUsername ] = useState('')
    const [ gmail, setGmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const [ hidden, setHidden ] = useState(true)

    const handleSignup = async () => {
        const data = { username, gmail, password }
        console.log(data)

        fetch('http://192.168.44.230:5000/Account/sign-up', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((data) => {
            if(data.status) {
                navigation.navigate('Login')
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    }

    console.log(username)
    
  return (
    <SafeAreaView className="flex-1 relative">
        <View style={{ height: height * 0.8, width: width }}>
            <Image 
                source={bgHomepage[2]}
                resizeMode="cover"
                className={`h-full object-cover w-full flex-1`}
            />
        </View>
        <View className="absolute bottom-0 bg-theme rounded-t-2xl w-full py-5 px-7">
            <View className="mb-2">
                <Text className="text-center text-[26px] font-bold text-bold-txt tracking-wider">Create your account</Text>
                <Text className="text-center text-basic">Enter the fields below to get started</Text>
            </View>
            <View className="rounded-xl w-full border-[1px] border-[#A8AFB5] my-2">
                <View className="flex-row items-center my-3 mx-4">
                    <View className="w-6 h-6">
                        <Image className="w-full h-full" source={usernameIcon} style={{tintColor: ''}}/>
                    </View>
                    <TextInput 
                        className="text-basic text-base ml-2 w-full"
                        placeholder='Username'
                        onChangeText={e => setUsername(e)}
                    />
                </View>
                <View className="w-full h-[1px] bg-[#A8AFB5]"></View>
                <View className="flex-row items-center my-3 mx-4">
                    <View className="w-6 h-6">
                        <Image className="w-full h-full" source={emailIcon} style={{tintColor: ''}}/>
                    </View>
                    <TextInput 
                        className="text-basic text-base ml-2 w-full"
                        placeholder='Email'
                        onChangeText={e => setGmail(e)}
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
                onPress={handleSignup}
            >
                <Text className="text-center text-white font-bold text-lg">Create account</Text>
            </TouchableOpacity>
            <Text className="text-center text-basic">Or, Signup with...</Text>
            <TouchableOpacity className="flex-row items-center justify-center border-[1px] border-[#A8AFB5] rounded-xl py-3 my-2">
                <Image source={googleIcon} />
                <Text className="text-center text-basic font-semibold text-base ml-2">Sign up with Google</Text>
            </TouchableOpacity>
            <View className="flex-row items-center justify-center mb-6">
                <Text className="text-basic mr-2">Already have an account?</Text>
                <Text className="font-bold text-primary tracking-wider"
                      onPress={() => navigation.navigate("Login")}
                >Log in</Text>
            </View>
      </View>
    </SafeAreaView>
  )
}

export default Signup