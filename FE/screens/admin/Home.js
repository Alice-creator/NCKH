import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({ navigation }) => {
    const functionList = [
        { title: 'Thêm địa điểm', onPress: () => navigation.navigate("AddPlace") },
        { title: 'Chỉnh sửa địa điểm', onPress: () => navigation.navigate("UpdatePlace") },
        { title: 'Xem báo cáo, đóng góp', onPress: () => navigation.navigate("Report") },
    ];
    const handleLogOut = async () => {
        await AsyncStorage.removeItem('user')
        .then(() => console.log('Item removed User from local storage'))
        .catch(error => console.error('Error removing item from local storage:', error));
        await AsyncStorage.removeItem('token')
        .then(() => console.log('Item removed Token from local storage'))
        .catch(error => console.error('Error removing item from local storage:', error));
        await AsyncStorage.removeItem('language')
        .then(() => console.log('Item removed Language from local storage'))
        .catch(error => console.error('Error removing item from local storage:', error));
        navigation.navigate("Home")
      }
  return (
    <SafeAreaView className="flex-1 p-5">
        <Text className='text-2xl text-bold-txt font-bold mb-4 text-center'>Admin</Text>
        <View className='flex-1 justify-center items-center p-4 bg-gray-100'>
            
            {functionList.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    className='bg-primary rounded-lg p-4 mb-2 w-full'
                    onPress={item.onPress}
                >
                    <Text className='text-white text-lg text-center font-bold'>{item.title}</Text>
                </TouchableOpacity>
            ))}
            <TouchableOpacity
                className='border-2 border-slate-500 rounded-lg p-3 mt-4 w-full'
                onPress={handleLogOut}
            >
                    <Text className='text-slate-500 text-center text-lg font-bold'>Logout</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default Home