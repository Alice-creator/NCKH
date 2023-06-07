import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, Button, TouchableOpacity } from 'react-native';
import NavigationBack from './components/NavigationBack';
import TouristAttractionInfo from './components/TouristAttractioninfo';
import { REACT_NATIVE_BASE_URL } from '../contains';
import Loading from './components/Loading';
import { useTranslation } from 'react-i18next';

export default function Saved({ navigation }) {
  const  { t } = useTranslation()
  const [ storages, setStorages ] = useState([])
  const [ loading, setLoading ] = useState(true)
  const [ requireLogin, setRequireLogin ] = useState(false)
  useEffect(() => {
    const getStorage = async () => {
      const token = JSON.parse(await AsyncStorage.getItem('token'));
      console.log(token)
      const language = await AsyncStorage.getItem('language');
        axios.get(`${REACT_NATIVE_BASE_URL}/${language}/User/storage`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        )
        .then(response => {
          console.log("fata" ,response.data.status)
          if(!response.data.status) {
            setRequireLogin(true)
          } else {
            setStorages(response.data.info)
            setLoading(false)
            setRequireLogin(false)
          }
        }).catch(error => {
            console.log(error);
        });
      }
    getStorage()
  }, [])
  return (
    <SafeAreaView className="flex-1 bg-theme">
      <NavigationBack navigation={navigation} to='Discover'/>
      <View className="my-6">
        <Text className="text-bold-txt font-bold text-center text-xl tracking-wider">{t('saved.title')}</Text>
      </View>
      {requireLogin ?
        <View className="flex-1 justify-center items-center">
            <Text className="text-bold-txt font-bold text-xl tracking-wider">{t('saved.requireLogin')}</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}
                className="bg-primary px-8 py-2 rounded-lg my-4"
            >
              <Text className="text-white text-base">{t('login')}</Text>
            </TouchableOpacity>
        </View>
        :
        <View className="mx-3">
          <View className="flex-row flex-wrap justify-between">
            {storages.length > 0 && storages?.map((value, index) => (
              <TouristAttractionInfo navigation={navigation} 
                    data = {{
                      id: value.TID,
                      name: value.name,
                      latitude: value.latitude,
                      longitude: value.longitude,
                      location_string: value.location_string,
                      image: value.images,
                      address: value.address,
                      description: value.description,
                      story: value.story,
                      type: value.type,
                      likes: value.likes,
                      isStorage: true
                  }}
                />  
            ))}
            </View>
            {storages.length == 0 &&
              <View className="flex-1 justify-center items-center">
                <Text className="text-bold-txt font-bold text-xl tracking-wider">{t('saved.noItem')}</Text>
              </View>
            }
        </View>
      }
    </SafeAreaView>
  );
}