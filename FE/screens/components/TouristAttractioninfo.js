import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import like from "../../assets/like.png"
import location from "../../assets/location.png"
import { REACT_NATIVE_BASE_URL } from '../../contains'
import LoginModal from './LoginModal'

const TouristAttractionInfo = ({ navigation, data }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const handleDetail = (data) => {
        navigation.navigate("Details", { data })
    }
    const handleStorage = async (value) => {
        const token = JSON.parse(await AsyncStorage.getItem('token'));
        // const language = JSON.parse(await AsyncStorage.getItem('language'));
        AsyncStorage.getItem('language').then(language => {
            axios.post(`${REACT_NATIVE_BASE_URL}/${language}/User/storage`, { TID: value.id },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
            )
            .then(response => {
                console.log(response.data)
                if(!response.data.status) {
                    setModalVisible(true)
                }
            }).catch(error => {
                console.log(error);
            });
        })
    }

  return (
    <TouchableOpacity 
        onPress={() => handleDetail(data)}
        className={`w-[170px] h-[250px] my-2 mx-1 shadow`}
    >
        <Image source={{ uri: data.image }} className="w-full h-full object-cover rounded-2xl relative opacity-[0.8]" />
        <View className="absolute top-3 left-3 right-3 flex-row justify-between items-center">
            {!data.noExistStorage &&
                <>
                    <View className="bg-white opacity-80 px-3 py-1 rounded-2xl">
                        <Text className="text-black">⭐ {data.likes}</Text>
                    </View>
                    <TouchableOpacity 
                        onPress={() => handleStorage(data.id)}
                        className="bg-white opacity-80 p-[6px] flex items-center justify-center rounded-full">
                        <Image source={like} tintColor={data.isStorage ?  "#fec76f" : ''} className="z-50 w-6 h-6" />
                    </TouchableOpacity>
                </>
            }
        </View>
        <View className="absolute bottom-3 left-2 right-2 rounded-xl p-1" style={{backgroundColor: 'rgba(255, 255, 255, 0.7)'}}>
            <Text className="text-sm font-bold mx-1 text-bold-txt">{data.name}</Text>
            <View className="flex-row items-center">
                <Image source={location} className="w-5 h-5" tintColor="#4F606D" />
                <Text className="text-xs font-normal text-basic" >{data.address.length > 18 ? data.address.slice(0,20) + "..." : data.address}</Text>
            </View>
        </View>
        <LoginModal isVisible={modalVisible} setModalVisible={setModalVisible}/>
    </TouchableOpacity>
  )
}

export default TouristAttractionInfo