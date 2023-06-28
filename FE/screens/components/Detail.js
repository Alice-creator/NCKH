import { View, Text, ScrollView, Image, TouchableOpacity, SafeAreaView, BackHandler } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { categoriesNearData } from '../../services/categoriesData';

import locationIcon from "../../assets/location.png"
import distanceIcon from "../../assets/distance.png"
import NavigationBack from './NavigationBack'
import NavigationPanorama from './NavigationPanorama'

import axios from 'axios';
import Loading from './Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import TouristAttractionInfo from './TouristAttractioninfo';
import { PLACES_API } from '../../contains';

const Detail = ({ data, scan, navigation }) => {
    const { t } = useTranslation()
    const [ textLength, setTextLength ]= useState(150)
    const [ category, setCategory ] = useState('attractions')
    const [ type, setType ] = useState('desc')
    const [ nearList, setNearList ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ distance, setDistance ] = useState('None')
    useEffect(() => {
    const getNearByLocation = async () => {
      setLoading(true)
      const language = await AsyncStorage.getItem('language')
   
      if(data.latitude && data.longitude) {
        const location = `${data.latitude},${data.longitude}`;
        const radius = 20000;
        let types = []   
        if (category == "hotels") {
          types = [ "point_of_interest", "hotel" ];
        } else if (category == "restaurants") {
          types = [ "restaurant" ];
        } else {
          types = [ "tourist_attraction", "museum", "zoo", "natural_feature", "aquarium" ];
        }
        try {
          const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&types=${types.join("|")}&key=${PLACES_API}&language=${language}&rankby=prominence`;
          const { data } = await axios.request(url);
          const results = data.results;
          const places = [];
  
          // Lặp qua các kết quả và trích xuất thông tin
          results.forEach(placeData => {
            // Kiểm tra xem có hình ảnh trong địa điểm hay không
            if (placeData.photos && placeData.photos.length > 0) {
              const photoReference = placeData.photos[0].photo_reference;
              const photoWidth = placeData.photos[0].width;
  
              // Tạo URL hình ảnh từ photo_reference
              const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${photoWidth}&photoreference=${photoReference}&key=${PLACES_API}`;
              if (photoUrl.length > 0) {
                const place = {
                  name: placeData.name,
                  address: placeData.vicinity,
                  latitude: placeData.geometry.location.lat,
                  longitude: placeData.geometry.location.lng,
                  rating: placeData.rating,
                  type: placeData.types[0],
                  image: photoUrl
                };
                places.push(place);
              }
            }
          })
          setNearList(places)
          setLoading(false)
        } catch (error) {
          // Xử lý lỗi ở đây
          console.error(error);
        }
      } else {
        return (
          <Text>No result</Text>
        )
      }
    };
    getNearByLocation();
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

        setDistance(dis.toFixed(2) + ' km')
        // Lấy được vị trí hiện tại của thiết bị
        // Tiếp tục tính toán khoảng cách từ vị trí hiện tại đến vị trí đích
      }
      const deg2rad = (deg) => {
        return deg * (Math.PI / 180);
      };
      getCurrentLocation()
      const backAction = () => {
        navigation.navigate(scan ? "Scan": "Discover");
        return true; // Trả về true để ngăn không thoát khỏi ứng dụng
      };
      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
      return () => backHandler.remove();
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
                  <Text className="text-white text-sm">{name}</Text>
              </View>
          </TouchableOpacity>
      )
    }
  return (
    <ScrollView className="bg-theme relative">
    <NavigationBack navigation={navigation} to={scan ? "Scan" : "Discover"}/>
    <NavigationPanorama navigation={navigation}/>
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
        <View className="p-4 flex-1 rounded-t-3xl -top-5 bottom-0 bg-theme">
           <Text className="text-xl font-bold text-bold-txt tracking-wider ">{t('detail.suggest')}</Text>
           <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                className="flex-row overflow-x-scroll"
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
        <View className="py-4 px-5 flex-1 rounded-t-3xl -top-5 bottom-0 bg-theme">
          <View className="flex-row justify-between items-center ">
            <View>
              <Text className="text-xl font-bold text-bold-txt tracking-wider ">{data.name}</Text>
              <View className="flex-row items-center">
                  <Image source={locationIcon} className="w-5 h-5" />
                  <Text className="text-base text-[#3F95EC]" >{data.address}</Text>
              </View>
            </View>
          </View>
          <View className="w-full h-[2px] rounded-lg my-3 bg-[#e2e2e2]"></View>
          <Text className="font-bold text-[17px] text-bold-txt mb-1">{t('detail.about')}</Text>
            {data.description && data.story &&
              <View className="flex-row mt-1">
                <TouchableOpacity onPress={() => setType('desc')} className={type == 'desc' ? "border-b-2 border-basic mr-3" : "mr-3"}>
                  <Text className="text-[15px] font-semibold text-basic">{t('detail.description')}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setType('story')} className={type == 'story' ? "border-b-2 border-basic" : ""}>
                  <Text className="text-[15px] font-semibold text-basic">{t('detail.story')}</Text>
                </TouchableOpacity>
              </View>
            }
          
          {type == 'desc' && data.description && data.description.length > 0 &&
            <View style={{ marginVertical: 10 }}>
              <Text  className="text-base text-[#4F606D]">{data.description.length > textLength ? 
                      data.description.slice(0,textLength) + "..." : 
                      data.description}
                    {textLength == 150 ? 
                      <Text className="ml-2" style={{ fontWeight: 'bold'}}
                            onPress={() => setTextLength(data.description.length)}
                      >{t('detail.seeMore')}</Text> : 
                      <Text className="ml-2" style={{ fontWeight: 'bold' }}
                            onPress={() => setTextLength(150)}
                      >{t('detail.hide')}</Text>
                  }
              </Text>
            </View>
          }
          {type == 'story' && data.story.length > 0 &&
            <View style={{ marginVertical: 10 }}>
              <Text className="text-base text-[#4F606D]">{data.story.length > textLength ? 
                      data.story.slice(0,textLength) + "..." : 
                      data.story}
                    {textLength == 150 ? 
                      <Text className="ml-2" style={{ fontWeight: 'bold'}}
                            onPress={() => setTextLength(data.story.length)}
                      >{t('detail.seeMore')}</Text> : 
                      <Text className="ml-2"  style={{ fontWeight: 'bold' }}
                            onPress={() => setTextLength(150)}
                      >{t('detail.hide')}</Text>
                  }
              </Text>
            </View>
          }
          <View className="flex-row mt-2">
            <View className="flex-row mr-4">
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
            {/* <View className="flex-row">
                <View className="bg-[#D5D3FB] mr-3 rounded-lg w-12 h-12 p-3">
                  <Image className="w-full h-full" source={typeIcon} />
                </View>
                <View>
                  <Text className="text-[14px] font-bold tracking-wide mb-1 text-[#5F3FF1]">{t('detail.type')}</Text>
                  <Text className="text-[13px]">{data.type}</Text>
                </View>
            </View>      */}
          </View>
          <View>
            <View className="w-full h-[2px] rounded-lg my-3 bg-[#e2e2e2]"></View>
            <Text className="font-bold text-[17px] text-bold-txt mb-1">{t('detail.tour')}</Text>
            <View> 
              <Text className="font-bold text-[15px] text-primary mt-2">Tour 1: Exploring the trace of the past in the heart of the city</Text>
              <View className="flex flex-row my-1">
                <View className="w-14 h-14 rounded-lg mr-2 p-[2px] border-[2px] border-[#e2e2e2]">
                  <Image className="w-full h-full rounded-lg" source={{
                    uri: `${data.image}`
                  }}/>
                </View>
                <View className="flex flex-col justify-center">
                  <Text className="font-bold text-[14px] text-bold-txt">{data.name}</Text>
                  <Text className="text-[13px] text-basic">{data.address}</Text>
                </View>
              </View>
            </View>
          </View>

          <View>
            <View className="w-full h-[2px] rounded-lg my-3 bg-[#e2e2e2]"></View>
            <Text className="font-bold text-[17px] text-bold-txt mb-1">{t('detail.suggest')}</Text>
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
                            <Text className="text-bold-txt font-semibold mr-1">{place.name?.length > 25 ? place?.name.slice(0,25) + '...': place?.name}</Text>
                            <Text>⭐</Text>
                        </View>
                        <View className="flex-row justify-between">
                            <Text className="text-basic mr-1">{place.address?.length > 25 ? place?.address.slice(0,25) + '...': place?.address}</Text>
                            <View className="flex-row">
                                <Text>{place?.rating}</Text>
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
  )
}

export default Detail