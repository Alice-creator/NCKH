import { View, Text, SafeAreaView, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import NavigationBack from './components/NavigationBack'
import axios from 'axios'
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { REACT_NATIVE_BASE_URL } from '../contains';

const Tours = ({ navigation }) => {
    useEffect(() => {
        const getCurrentLocation = async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            console.log('Permission to access location was denied');
            setDistance('None')
            return;
          }
        
          let location = await Location.getCurrentPositionAsync({});
          const { latitude, longitude } = location.coords;
          return { latitude, longitude }
          // Lấy được vị trí hiện tại của thiết bị
          // Tiếp tục tính toán khoảng cách từ vị trí hiện tại đến vị trí đích
        }
        const getTours = async () => {
            const { latitude, longitude } = getCurrentLocation()
            const newlanguage = await AsyncStorage.getItem('language')
            const token = JSON.parse(await AsyncStorage.getItem('token'))
            // axios.post(`${REACT_NATIVE_BASE_URL}/${newlanguage || 'en'}/Tour/${latitude}/${longitude}/2`)
            axios.get(`${REACT_NATIVE_BASE_URL}/${newlanguage || 'en'}/Tour/10.0/100.0/2`,
            {
                headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
                },
            })
            .then(response => {
                console.log(response.data)
                // const data = response.data.stored.concat(response.data.notStored);
               
            }).catch(error => {
                console.log(error)
            });
        }
        getTours()
    }, [])
  return (
    <SafeAreaView>
        <NavigationBack navigation={navigation} to={"Discover"}/>
        <View className="my-6">
            <Text className="text-bold-txt font-bold text-center text-xl tracking-wider">Tours</Text>
        </View>
        <View className="flex flex-row justify-between items-center mx-4">
            <Text>Đi trong vòng </Text>
            <View className="flex flex-row items-center">
                <TextInput
                    className='border border-slate-600 mr-3 rounded-lg w-14' 
                    value='2'
                />
                <TouchableOpacity className="bg-primary px-4 py-2 rounded-lg"><Text className="text-white">Submit</Text></TouchableOpacity>
            </View>
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