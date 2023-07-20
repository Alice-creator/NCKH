import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import like from "../../assets/like.png"
import location from "../../assets/location.png"
import { REACT_NATIVE_BASE_URL } from '../../contains'
import LoginModal from './LoginModal'

const PlaceInfo = ({ navigation, data }) => {
    const [ liked, setLiked ] = useState(data.isStorage)
    const handleDetail = (data) => {
        navigation.navigate("Details", { data })
    }
    const handleStorage = async (value) => {
        const token = JSON.parse(await AsyncStorage.getItem('token'));
        // const language = JSON.parse(await AsyncStorage.getItem('language'));
        AsyncStorage.getItem('language').then(language => {
            fetch(`${REACT_NATIVE_BASE_URL}/${language}/User/storage`, {
                method: liked ? 'DELETE' : 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data)
              })
                .then(response => response.json())
                .then(data => {
                  // Cập nhật trạng thái "like/unlike" trong component
                  setLiked(!liked);
                  if(!data.status) {
                    setModalVisible(true)
                }
                })
                .catch(error => {
                  console.error('Error toggling like:', error);
                });
    
        })
    }
    const [modalVisible, setModalVisible] = useState(false);
  return (
    <TouchableOpacity className="mr-4 my-2" key={`${Math.random()}`}
                    onPress={() => handleDetail(data)}
    >
        <View className="w-[210px] p-[8px] bg-white shadow flex rounded-2xl">
            <Image source={{ uri: data.image }} className="w-full h-[150px] object-contain rounded-2xl relative opacity-[0.85]" />
            <View className="absolute top-3 left-3 right-3 flex-row justify-between items-center">
                <View className="bg-white opacity-80 px-3 py-1 rounded-2xl">
                    <Text className="">⭐ {data.likes}</Text>
                </View>
                <TouchableOpacity 
                    onPress={() => handleStorage(data)}
                    className="bg-white opacity-80 p-2 flex items-center justify-center rounded-full">
                    <Image source={like} className="z-50 w-5 h-5" tintColor={liked ?  "#fec76f" : ''} />
                </TouchableOpacity>
            </View>
            <Text className="text-[17px] font-semibold mx-1 mt-1 text-bold-txt">{data.name}</Text>
            <View className="flex-row items-center">
                <Image source={location} className="w-5 h-5" />
                <Text className="text-sm text-basic" > {data.location_string} </Text>
            </View>
        </View>
        <LoginModal navigation={navigation} isVisible={modalVisible} setModalVisible={setModalVisible} />
    </TouchableOpacity>  
  )
}

export default PlaceInfo