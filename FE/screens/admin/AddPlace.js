import { View, TextInput, Text, Button, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import NavigationBack from '../components/NavigationBack';

const AddPlace = ({ navigation }) => {

    const [text, setText] = useState('');
    const [image, setImage] = useState(null);
  
    const handleTextChange = (value) => {
      setText(value);
    };
  
    const handleImageUpload = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }
    
        const pickerResult = await ImagePicker.launchImageLibraryAsync();
    
        if (!pickerResult.canceled) {
            setImage(pickerResult.uri);
        }
    };
    
   
  return (
    <View className='flex-1 justify-center items-center relative'>
        <NavigationBack navigation={navigation} to='AdminHome'/>
        <Text className='text-2xl text-bold-txt font-bold mb-4 text-center'>Thêm địa điêm</Text>
        <View className = 'p-6 w-full'>
            <Text>Name</Text>
            <TextInput
                className = 'bg-white border border-gray-300 rounded px-2 py-1 mb-2'
                placeholder="Name"
                value={text}
                onChangeText={handleTextChange}
            />
            <View className="flex flex-row gap-2 justify-between">
                <View className="flex-1">
                    <Text>Latitude</Text>
                    <TextInput
                        className = 'bg-white border border-gray-300 rounded px-2 py-1 mb-2'
                        placeholder="Lat"
                        value={text}
                        onChangeText={handleTextChange}
                    />
                </View>
                <View className="flex-1">
                    <Text>Longitude</Text>
                    <TextInput
                        className = 'bg-white border border-gray-300 rounded px-2 py-1 mb-2'
                        placeholder="Lng"
                        value={text}
                        onChangeText={handleTextChange}
                    />
                </View>
            </View>
            <View>
                <Text>Address</Text>
                <TextInput
                    className = 'bg-white border border-gray-300 rounded px-2 py-1 mb-2'
                    placeholder="Address"
                    value={text}
                    onChangeText={handleTextChange}
                />
            </View>
            <View>
                <Text>Description</Text>
                <TextInput
                    className = 'bg-white border border-gray-300 rounded px-2 py-1 mb-2'
                    placeholder="Desc"
                    value={text}
                    onChangeText={handleTextChange}
                />
            </View>
            <View>
                <Text>Story</Text>
                <TextInput
                    className = 'bg-white border border-gray-300 rounded px-2 py-1 mb-2'
                    placeholder="Story"
                    value={text}
                    onChangeText={handleTextChange}
                />
            </View>
            <TouchableOpacity className="border-dashed border-primary border-2 py-3 bg-white " onPress={handleImageUpload}>
                <Text className="text-center">Upload Image</Text>
            </TouchableOpacity>
            <TouchableOpacity className="py-3 bg-primary rounded-md my-2" onPress={handleImageUpload}>
                <Text className="text-center text-white">Add</Text>
            </TouchableOpacity>
            {/* Hiển thị ảnh đã tải lên (nếu có) */}
            {image && (
                <Image
                    className = 'w-full h-44 mt-4'
                    source={{ uri: image }}
                />
            )}
        </View>
    </View>
  )
}

export default AddPlace