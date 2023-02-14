import { View, Text, SafeAreaView, Image, TouchableOpacity, Switch } from 'react-native'
import React, { useState } from 'react'
import { Avatar } from '../assets'
import cameraIcon from "../assets/camera.png"
import arrow_next from "../assets/arrow_next.png"
import languageIcon from "../assets/language.png"
import darkmodeIcon from "../assets/darkmode.png"
import helpIcon from "../assets/help.png"


const Profile = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <SafeAreaView className="bg-theme flex-1 items-center justify-between my-4">
      <View className="w-full px-8">
        <Text className="text-center font-bold text-[22px] text-bold-txt tracking-wider"> Profile </Text>
        <View className="flex items-center my-5">
          <View className="w-[70px] h-[70px] rounded-full bg-primary relative">
            <Image
              className="w-full h-full rounded-full"
              source={Avatar}
            />
            <View className="w-6 h-6 rounded-full bg-theme absolute -bottom-1 -right-1">
              <Image 
                className="w-full h-full rounded-full"
                source={cameraIcon}
              />
            </View>
          </View>
          <View className="text-center mt-1">
            <Text className="text-center text-bold-txt font-bold text-[20px]">Username</Text>
            <Text className="text-center italic text-basic text-base">abcdef@gmail.com</Text>
          </View>
        </View>
        <View className="bg-white w-full rounded-3xl px-5 py-4">
          <View className="py-1 my-1 flex-row justify-between border-b-[1px] border-slate-300">
            <Text className="font-bold text-base tracking-wide text-bold-txt">Email</Text>
            <View className="flex-row items-center">
              <Text className="text-basic">abcdef@gmail.com</Text>
              <View>
                <Image source={arrow_next} />
              </View>
            </View>
          </View>
          <View className="py-1 my-1 flex-row justify-between border-b-[1px] border-slate-300">
            <Text className="font-bold text-base tracking-wide text-bold-txt">Date of Birth</Text>
            <Text className="text-basic">dd/mm/yy</Text>
          </View>
          <View className="py-1 my-1 flex-row justify-between border-b-[1px] border-slate-300">
            <Text className="font-bold text-base tracking-wide text-bold-txt">Gender</Text>
            <Text className="text-basic">Male</Text>
          </View>
          <View className="py-1 my-1 flex-row justify-between border-b-[1px] border-slate-300">
            <Text className="font-bold text-base tracking-wide text-bold-txt">Password</Text>
            <Text className="text-basic">*********</Text>
          </View>
        </View>
        <View>
          <Text className="text-bold-txt font-bold text-lg my-2">Settings</Text>
          <View>
            <View className="flex-row justify-between">
              <View className="flex-row justify-center my-2 items-center">
                <View className="rounded-xl bg-[#CBEDFD] mr-3 w-12 h-12 p-[10px]">
                  <Image 
                    className="w-full h-full"
                    source={languageIcon}
                  />
                </View>
                <Text className="text-bold-txt font-bold text-base tracking-wide">Language</Text>
              </View>
              <View className="rounded-xl bg-[#EBEAED] w-12 h-12 p-[14px]">
                <Image 
                  className="w-full h-full"
                  source={arrow_next}
                />
              </View>
            </View>
            <View className="flex-row justify-between">
              <View className="flex-row justify-center my-2 items-center">
                <View className="rounded-xl bg-[#D5D3FB] mr-3 w-12 h-12 p-[10px]">
                  <Image 
                    className="w-full h-full"
                    source={darkmodeIcon}
                  />
                </View>
                <Text className="text-bold-txt font-bold text-base tracking-wide">Dark Mode</Text>
              </View>
              <View className="flex items-center justify-center h-16 w-24">
                <Switch
                  className="h-full w-full"
                  trackColor={{false: '#EBEAED', true: '#81b0ff'}}
                  thumbColor={isEnabled ? '#f5dd4b' : '#fff'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
              </View>
            </View>
            <View className="flex-row justify-between">
              <View className="flex-row justify-center my-2 items-center">
                <View className="rounded-xl bg-[#FEE8EE] mr-3 w-12 h-12 p-[10px]">
                  <Image 
                    className="w-full h-full"
                    source={helpIcon}
                  />
                </View>
                <Text className="text-bold-txt font-bold text-base tracking-wide">Help</Text>
              </View>
              <View className="rounded-xl bg-[#EBEAED] w-12 h-12 p-[14px]">
                <Image 
                  className="w-full h-full"
                  source={arrow_next}
                />
              </View>
            </View>

          </View>
        </View>
      </View>
      <View className="w-full px-8">
        <TouchableOpacity className="w-full py-3 border-[1px] border-slate-500 rounded-xl"
            onPress={() => navigation.navigate("Login")}
        >
          <Text className="text-center text-slate-500 font-semibold text-lg">Log in</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Profile