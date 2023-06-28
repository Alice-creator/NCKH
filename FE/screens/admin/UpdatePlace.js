import { View, Text, Button, FlatList, SafeAreaView, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { REACT_NATIVE_BASE_URL } from '../../contains';
import PlaceInfoAdmin from './PlaceInfoAdmin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const UpdatePlace = ({ navigation }) => {
  const [ placeVi, setPlaceVi ] = useState()
  const [ placeEn, setPlaceEn ] = useState()

  const [ loading, setLoading ] = useState(true)
  useEffect(() => {
    const getPlacesEn = async () => {
      const token = JSON.parse(await AsyncStorage.getItem('token'));
      const newlanguage = await AsyncStorage.getItem('language')
      axios.get(`${REACT_NATIVE_BASE_URL}/en/Account/SearchByType/all`,
      {
          headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          },
      })
      .then(response => {
          console.log(response.data)
          setPlaceEn(response.data);
          setLoading(false);
      }).catch(error => {
          console.log(error)
      });
    }
    getPlacesEn()
    const getPlacesVi = async () => {
      const token = JSON.parse(await AsyncStorage.getItem('token'));
      axios.get(`${REACT_NATIVE_BASE_URL}/vi/Account/SearchByType/all`,
      {
          headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          },
      })
      .then(response => {
          setPlaceVi(response.data);
      }).catch(error => {
          console.log(error)
      });
    }
    getPlacesVi()
  },[])
  return (
    <SafeAreaView>
      <Text className="text-xl text-bold-txt font-bold text-center mt-5">Edit place</Text>
      <View className="px-5 my-2 w-full flex flex-wrap">
          {placeEn?.map((item, index) => (
            <PlaceInfoAdmin
                  key={index}
                  navigation={navigation}
                  data={{
                      TID: item.TID,
                      name: item.hashtag,
                      en_name: item.name,
                      vi_name: placeVi && placeVi[index]?.name,
                      latitude: item.latitude,
                      longitude: item.longitude,
                      location_string: item.location_string,
                      images: item.images,
                      en_address: item.address,
                      vi_address: placeVi && placeVi[index]?.address,
                      en_description: item.description,
                      vi_description: placeVi && placeVi[index]?.description,
                      en_story: item.story,
                      vi_story: placeVi && placeVi[index]?.story,
                      type: item.type,
                      likes: item.likes,
                      timezone: item.timezone,
                      isStorage: item.Stored,
                      isTwoColumn: true
                  }}
              />
          ))}
       
      </View>
    </SafeAreaView>
  );
}

export default UpdatePlace