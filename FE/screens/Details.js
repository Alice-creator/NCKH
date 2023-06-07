import { View, Text, ScrollView, Image, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { categoriesData, categoriesNearData } from '../services/categoriesData';

import locationIcon from "../assets/location.png"
import distanceIcon from "../assets/distance.png"
import typeIcon from "../assets/type.png"
import NavigationBack from './components/NavigationBack';
import axios from 'axios';
import Loading from './components/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import TouristAttractionInfo from './components/TouristAttractioninfo';

const Details = ({ route, navigation }) => {
    const { t } = useTranslation()
    const { data, scan } = route.params;
    const [ textLength, setTextLength ]= useState(150)
    const [ category, setCategory ] = useState('attractions')
    const [ type, setType ] = useState('desc')
    const [ nearList, setNearList ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ distance, setDistance ] = useState('None')
    useEffect(() => {
      // let street = currentLocation.streetName
      const calculateBoundingBox = async (latitude, longitude, radius) => {
        const earthRadius = 6371; // Bán kính Trái đất (đơn vị km)
        const angularRadius = radius / earthRadius; // Góc đối ứng với bán kính

        const latRadian = latitude * Math.PI / 180; // Chuyển đổi latitude sang radian
        const degLatitude = radius / earthRadius * (180 / Math.PI); // Chuyển đổi bán kính sang độ latitude

        // Tính toán các giá trị tọa độ của bounding box
        const tr_latitude = latitude + degLatitude;
        const tr_longitude = longitude + angularRadius / Math.cos(latRadian);

        const bl_latitude = latitude - degLatitude;
        const bl_longitude = longitude - angularRadius / Math.cos(latRadian);

        // Trả về bounding box dưới dạng một object
        return {
            tr_latitude,
            tr_longitude,
            bl_latitude,
            bl_longitude,
        };
      };
    const updateMapRegion = async () => {
      const language = await AsyncStorage.getItem('language')
      let toLoc = { "latitude": parseFloat(data.latitude), "longitude": parseFloat(data.longitude) }
      const {
          tr_latitude,
          tr_longitude,
          bl_latitude,
          bl_longitude,
      } = await calculateBoundingBox(toLoc.latitude, toLoc.longitude, 10)
      if(data.latitude && data.longitude) {
        const options = {
            method: 'GET',
            url: `https://travel-advisor.p.rapidapi.com/${category}/list-in-boundary`,
            params: {
                tr_longitude,
                tr_latitude,
                bl_longitude,
                bl_latitude,
                currency: 'USD',
                limit: '10',
                lunit: 'km',
                lang: language
            },
            headers: {
              'X-RapidAPI-Key': '92fa813160msha11f7e2d7ff032ep17db1cjsnc98c0e83ce86',
              'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
            }
        };
          
        try {
            const response = await axios.request(options);
            const limit = 10
            let data = response.data.data.reduce((acc, value) => {
              if (value.name && value.photo && value.location_string && value.latitude && value.longitude && (parseFloat(value.distance).toFixed(1) + " km" != '0.0 km')) {
                const item = {
                  name: value.name,
                  address: value.address,
                  location_string: value.location_string,
                  image: value.photo.images.original.url,
                  latitude: value.latitude,
                  longitude: value.longitude,
                  distance: parseFloat(value.distance).toFixed(1) + " km",
                  rating: value.rating
                };
                acc.push(item);
              }
              return acc;
            }, []);
            if (data.length > limit) {
              data = data.sort(() => Math.random() - 0.5).slice(0, limit)
            }
            setNearList(data)
            setLoading(false)
        } catch (error) {
              console.error(error);
        }    
      } else {
        return (
          <Text>No result</Text>
        )
      }
    };

      updateMapRegion();
    }, [category])
    useEffect(() => {
      const getCurrentLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission to access location was denied');
          setDistance('None')
          return;
        }
      
        let location = await Location.getCurrentPositionAsync({});
        const { latitude: lat1, longitude: lon1 } = location.coords;
        const lat2 = data.latitude
        const lon2 = data.longitude

        const R = 6371; // Earth's radius in kilometers
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const dis= R * c; // Distance in meters

        console.log('Distance:', dis, 'meters');
        setDistance(dis.toFixed(2) + ' km')
        // Lấy được vị trí hiện tại của thiết bị
        // Tiếp tục tính toán khoảng cách từ vị trí hiện tại đến vị trí đích
      }
      const deg2rad = (deg) => {
        return deg * (Math.PI / 180);
      };
      getCurrentLocation()
    }, [])
    const handleTouchCategory = (name) => {
      setCategory(name)
    }
    const renderCategory = (name, icon, id, type) => {
      return (
          <TouchableOpacity
              key={`category-${id}`}
              onPress={() => handleTouchCategory(type)}
          >
              <View className={type == category ? "flex-row items-center rounded-3xl px-3 py-[6px] bg-primary" : "flex-row items-center rounded-3xl px-3 py-[6px] bg-secondary"}>
                  <Image source={icon} className="w-[26px] h-[26px] mr-1" />
                  <Text className="text-white">{name}</Text>
              </View>
          </TouchableOpacity>
      )
    }
    return (
    <SafeAreaView className="bg-theme flex-1">
     <ScrollView className="bg-theme relative">
      <NavigationBack navigation={navigation} to={scan ? "Scan" : "Discover"}/>
      <View className="flex-1 flex justify-between bg-theme">
        <View className="" style={{ height: 373 , width: '100%' }}>
          <Image
                source={{
                  uri: `${data.image}`,
                }}
                className="w-full h-full bg-blue-100"
          />
        </View>   
        {data.suggest ?
          <View className="p-4 flex-1 rounded-t-3xl -top-10 bottom-0 bg-theme">
             <Text className="text-xl font-bold text-bold-txt tracking-wider ">{data.name}</Text>
             <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false}
                  className="my-2 flex-row overflow-x-scroll"
              >
                  {
                      data.suggest?.map((value, index) => (
                          <TouristAttractionInfo 
                              navigation={navigation} 
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
                                isStorage: value.Stored
                            }}
                          />
                      ))
                  }
              </ScrollView>
          </View>
          :
          <View className="p-4 flex-1 rounded-t-3xl -top-10 bottom-0 bg-theme">
            <View className="flex-row justify-between items-center ">
              <View>
                <Text className="text-xl font-bold text-bold-txt tracking-wider ">{data.name}</Text>
                <View className="flex-row items-center">
                    <Image source={locationIcon} className="w-5 h-5" />
                    <Text className="text-base text-[#3F95EC]" >{data.address}</Text>
                </View>
              </View>
              <View>
                <Text>{data.rating}</Text>
              </View>
            </View>
              {data.description && data.story &&
                <View className="flex-row mt-1">
                  <TouchableOpacity onPress={() => setType('desc')} className={type == 'desc' ? "border-b-2 border-basic mr-3" : "mr-3"}>
                    <Text className="text-base font-semibold text-basic">{t('detail.description')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setType('story')} className={type == 'story' ? "border-b-2 border-basic" : ""}>
                    <Text className="text-base font-semibold text-basic">{t('detail.story')}</Text>
                  </TouchableOpacity>
                </View>
              }
            
            {type == 'desc' && data.description.length > 0 &&
              <View style={{ marginVertical: 10 }}>
                <Text className="text-base text-[#4F606D]">{data.description.length > 50 ? 
                        data.description.slice(0,textLength) + "..." : 
                        data.description}
                      {textLength == 150 ? 
                        <Text style={{ fontWeight: 'bold'}}
                              onPress={() => setTextLength(-1)}
                        >{t('detail.seeMore')}</Text> : 
                        <Text style={{ fontWeight: 'bold' }}
                              onPress={() => setTextLength(150)}
                        >{t('detail.hide')}</Text>
                    }
                </Text>
              </View>
            }
            {type == 'story' && data.story.length > 0 &&
              <View style={{ marginVertical: 10 }}>
                <Text className="text-base text-[#4F606D]">{data.story.length > 50 ? 
                        data.story.slice(0,textLength) + "..." : 
                        data.story}
                      {textLength == 150 ? 
                        <Text style={{ fontWeight: 'bold'}}
                              onPress={() => setTextLength(-1)}
                        >{t('detail.seeMore')}</Text> : 
                        <Text style={{ fontWeight: 'bold' }}
                              onPress={() => setTextLength(150)}
                        >{t('detail.hide')}</Text>
                    }
                </Text>
              </View>
            }
            <View className="flex-row justify-between mt-2">
              <View className="flex-row">
                  <View className="bg-[#CBEDFD] mr-3 rounded-lg w-12 h-12 p-3">
                    <Image className="w-full h-full" source={distanceIcon} />
                  </View>
                  <View>
                    <Text className="text-[14px] font-bold tracking-wide mb-1 text-[#154874]">{t('detail.distance')}</Text>
                    <Text className="text-[13px]">{distance}</Text>
                  </View>
              </View>
              <View className="flex-row">
                  <View className="bg-[#FCF2E3] mr-3 rounded-lg w-12 h-12 p-3">
                    <Text className="text-base">⭐</Text>
                  </View>
                  <View>
                    <Text className="text-[14px] font-bold tracking-wide mb-1 text-[#FCD53E]">{t('detail.rating')}</Text>
                    <Text className="text-[13px]">{data.likes}</Text>
                  </View>
              </View>
              <View className="flex-row">
                  <View className="bg-[#D5D3FB] mr-3 rounded-lg w-12 h-12 p-3">
                    <Image className="w-full h-full" source={typeIcon} />
                  </View>
                  <View>
                    <Text className="text-[14px] font-bold tracking-wide mb-1 text-[#5F3FF1]">{t('detail.type')}</Text>
                    <Text className="text-[13px]">{data.type}</Text>
                  </View>
              </View>     
            </View>

            <View>
              <Text className="font-bold text-lg text-[#4F606D] mt-2 mb-1">Suggest</Text>
              <View className="flex-row justify-between mb-2">
                  {categoriesNearData.map((category) => (
                    renderCategory(t(`detail.${category.name}`), category.icon, category.id, category.name)
                  ))}
              </View>
              {loading ? <Loading /> :
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                >
                  {nearList?.map((place, index) => (
                    <View className="flex-row items-center bg-white p-2 mr-2 rounded-xl" key={index}>
                    {/* Avatar */}
                      <Image
                          source={{ uri: place?.image ? place.image : "" }}
                          style={{
                              width: 50,
                              height: 50,
                              borderRadius: 25
                          }}
                      />

                      <View style={{ flex: 1, marginLeft: 8 }}>
                          {/* Name & Rating */}
                          <View className="flex-row justify-between">
                              <Text className="text-bold-txt font-semibold mr-1">{place?.name}</Text>
                              <View className="flex-row">
                                  <Image
                                      className="h-4 w-4 mr-2"
                                      source={distanceIcon}
                                      style={{ tintColor: "#3F95EC" }}
                                  />
                              </View>
                          </View>
                          <View className="flex-row justify-between">
                              <Text className="text-basic mr-1">{place.location_string?.length > 20 ? place?.location_string.slice(0,20) + '...': place?.location_string}</Text>
                              <View className="flex-row">
                                  <Text>{place?.distance}</Text>
                              </View>
                          </View>
                      </View>
                  </View>))}

                </ScrollView>
              }
            </View>
            <View className="mt-6">
                <TouchableOpacity
                  onPress={() => navigation.navigate("Maps", { data, nearList })}
                >
                  <View className="w-full bg-primary py-4 rounded-full">
                    <Text className="text-center text-white text-xl font-medium">Check on map</Text>
                  </View>
                </TouchableOpacity>
              </View>
          </View>
        }
      </View>
     </ScrollView>
    </SafeAreaView>
  )
}

export default Details