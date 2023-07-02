import { View, Text, SafeAreaView, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios'
import { REACT_NATIVE_BASE_URL } from '../../contains'
import AsyncStorage from '@react-native-async-storage/async-storage'
const UpdatePlaceForm = ({ route }) => {
    const { data } = route.params
    const [ change, setChange ] = useState(data)

    const handleUpdatePlace =async () => {
        console.log(change)
        const token = JSON.parse(await AsyncStorage.getItem('token'));
        axios.put(`${REACT_NATIVE_BASE_URL}/Admin/Attractions`, change, 
        {
            headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            },
        })
        .then(response => {
            console.log(response.data)
        }).catch(error => {
            console.log(error)
        });
    }
  return (
    <ScrollView className="px-4">
        <Text className="text-xl text-bold-txt font-bold text-center mt-5">Edit place</Text>
        <Text className="text-lg text-bold-txt font-bold text-center mt-2">{data.en_name}</Text>
        <Text className="text-sm mt-1 text-bold-txt font-semibold">Name(en)</Text>
        <TextInput 
            value={change.en_name}
            className="border-[1px] border-slate-400 px-2 py-1 rounded-lg"
            onChangeText={(e) => setChange({...change, en_name: e })}
        />
        <Text className="text-sm mt-1 text-bold-txt font-semibold">Name(vi)</Text>
        <TextInput 
            value={change.vi_name}
            className="border-[1px] border-slate-400 px-2 py-1 rounded-lg"
            onChangeText={(e) => setChange({...change, vi_name: e })}
        />
        <Text className="text-sm mt-1 text-bold-txt font-semibold">Description(en)</Text>
        <TextInput 
            value={change.en_description}
            className="border-[1px] border-slate-400 px-2 py-1 rounded-lg"
            onChangeText={(e) => setChange({...change, en_description: e })}
        />
        <Text className="text-sm mt-1 text-bold-txt font-semibold">Description(vi)</Text>
        <TextInput 
            value={change.vi_description}
            className="border-[1px] border-slate-400 px-2 py-1 rounded-lg"
            onChangeText={(e) => setChange({...change, vi_description: e })}
        />
        <Text className="text-sm mt-1 text-bold-txt font-semibold">Story(en)</Text>
        <TextInput 
            value={change.en_story}
            className="border-[1px] border-slate-400 px-2 py-1 rounded-lg"
            onChangeText={(e) => setChange({...change, en_story: e })}
        />
        <Text className="text-sm mt-1 text-bold-txt font-semibold">Story(vi)</Text>
        <TextInput 
            value={change.vi_story}
            className="border-[1px] border-slate-400 px-2 py-1 rounded-lg"
            onChangeText={(e) => setChange({...change, vi_story: e })}
        />
        <Text className="text-sm mt-1 text-bold-txt font-semibold">Address(en)</Text>
        <TextInput 
            value={change.en_address}
            className="border-[1px] border-slate-400 px-2 py-1 rounded-lg"
            onChangeText={(e) => setChange({...change, en_address: e })}
        />
        <Text className="text-sm mt-1 text-bold-txt font-semibold">Address(vi)</Text>
        <TextInput 
            value={change.vi_address}
            className="border-[1px] border-slate-400 px-2 py-1 rounded-lg"
            onChangeText={(e) => setChange({...change, vi_address: e })}
        />
        <Text className="text-sm mt-1 text-bold-txt font-semibold">Image</Text>
        <TextInput 
            value={change.images}
            className="border-[1px] border-slate-400 px-2 py-1 rounded-lg"
            onChangeText={(e) => setChange({...change, images: e })}
        />
        <View className="flex flex-row gap-4 justify-between">
            <View className="flex-1">
                <Text className="text-sm mt-1 text-bold-txt font-semibold">Latitude</Text>
                <TextInput 
                    value={change.latitude}
                    className="border-[1px] border-slate-400 px-2 py-1 rounded-lg"
                    onChangeText={(e) => setFeedback(e)}
                />
            </View>
            <View className="flex-1">
                <Text className="text-sm mt-1 text-bold-txt font-semibold">Longitude</Text>
                <TextInput 
                    value={change.longitude}
                    className="border-[1px] border-slate-400 px-2 py-1 rounded-lg"
                    onChangeText={(e) => setFeedback(e)}
                />
            </View>
        </View>
        <TouchableOpacity
            className="bg-primary w-full mt-4 py-3 rounded-lg"
            onPress={handleUpdatePlace}
        >
            <Text className="text-white text-base font-semibold text-center">Update</Text>
        </TouchableOpacity>
    </ScrollView>
  )
}

export default UpdatePlaceForm