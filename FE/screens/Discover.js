import { View, Text, SafeAreaView, Image, TextInput, Button, ScrollView, Touchable, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import { Avatar } from '../assets'

import search from "../assets/search.png"
import like from "../assets/like.png"
import location from "../assets/location.png"

import { getHotels, getPlaceSearch } from '../services/placesData';
import { categoriesData } from '../services/categoriesData';
import { touristAttractionData } from '../services/touristAttractionData'

import { citiesData } from '../services/citiesData'
import axios from 'axios'

const Discover = ({ navigation }) => {
    const handleScroll = (e) => {
        const currentOffset = e.nativeEvent.contentOffset.y;
        const dif = currentOffset;  

        if (dif < 10) {
            navigation.setParams({tabBarVisible: true});
        } else {
            navigation.setParams({tabBarVisible: false});
        }
        //console.log('dif=',dif);

        e.offset = currentOffset;    
    }

        // <GooglePlacesAutocomplete
        //             GooglePlacesDetailsQuery={{fields: "geometry"}}
        //             placeholder='Discover a city'
        //             fetchDetails={true}
        //             onPress={(data, details = null) => {
        //                 // 'details' is provided when fetchDetails = true
        //                 console.log(data, details);
        //             }}
        //             query={{
        //                 key: 'AIzaSyDuTzv3VTXToXf2SoT7rvvVLqSSp9GtOfQ',
        //                 language: 'en',
        //             }}
        //         />
        const [ change, setChange ]= useState()
        const [ category, setCategory ] = useState('All')
        // const [ place, setPlace ] = useState({
        //     name: null,
        //     address: null,
        //     location: null,
        //     image: null,
        //     rating: null,
        //     geo_description: null,
        //     lat: null,
        //     lng: null,
        // })
        const [ searchPlaces, setSearchPlaces ] = useState()

        const handleChange = (e) => {
            setChange(e)
        }
        const handleSubmit = async () => {
            if(change == '') {
                return 
            }
            const options = {
                method: 'GET',
                url: 'https://travel-advisor.p.rapidapi.com/locations/search',
                params: {
                  query: change,
                  limit: 30,
                  offset: '0',
                  units: 'km',
                  location_id: '1',
                  currency: 'USD',
                  sort: 'relevance',
                  lang: 'en' //or vi
                },
                headers: {
                  'X-RapidAPI-Key': 'dfd82f7dc1msh79f889e9b674a2fp1d9bf5jsn06aaec52702a',
                  'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
                }
            };

            axios.request(options).then(function (response) {
                const { data } = response.data
                console.log(data)
                let dataLocations = []
                let dataHotels = []
                data.map((value) => {
                    if(value.result_object.timezone === 'Asia/Ho_Chi_Minh') {
                        if(value.result_type === 'things_to_do' || value.result_type === 'geos') {
                            console.log(value)
                            dataLocations.push(value)
                        }
                        if(value.result_type === 'lodging') {
                            dataHotels.push(value)
                        }
                    }
                })
                console.log(dataLocations)

                const lat = dataLocations[0].result_object.latitude
                const lng = dataLocations[0].result_object.longitude
                const options = {
                    method: 'GET',
                    url: 'https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng',
                    params: {
                      latitude: lat,
                      longitude: lng,
                      limit: '30',
                      currency: 'USD',
                      distance: '2',
                      open_now: 'false',
                      lunit: 'km',
                      lang: 'en_US'
                    },
                    headers: {
                      'X-RapidAPI-Key': 'dfd82f7dc1msh79f889e9b674a2fp1d9bf5jsn06aaec52702a',
                      'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
                    }
                };
                axios.request(options).then(function (response) {
                    const { data } = response.data
                    setSearchPlaces({
                        locations: dataLocations,
                        hotels: dataHotels,
                        restaurants: data,
                    })
                })
                    
            }).catch(function (error) {
                console.error(error);
            });
            // const { data } = getPlaceSearch(change)
            // console.log(data)
            // .then(async (data) => {
            //     let dataLocations = []
            //     let dataHotels = []
            //     data.map((value) => {
            //         if(value.result_object.timezone === 'Asia/Ho_Chi_Minh') {
            //             if(value.result_type === 'things_to_do' || value.result_type === 'geos') {
            //                 dataLocations.push(value)
            //             }
            //             if(value.result_type === 'lodging') {
            //                 dataHotels.push(value)
            //             }
            //         }
            //     })
            //     const lat = dataLocations[0].result_object.latitude
            //     const lng = dataLocations[0].result_object.longitude
            //     const dataRestaurants = await getHotels(lat, lng)
            //     .then((data) => {
            //         console.log(data)
            //         setSearchPlaces({
            //             locations: dataLocations,
            //             hotels: dataHotels,
            //             restaurants: dataRestaurants.data,
            //         })
            //     })
            // })
   
            
        }
        const handleClick = (data) => {
            navigation.navigate("Details", { data })
        }

        const handleTouchCategory = (name) => {
            setCategory(name)
        }
        const renderCategory = ({ item }) => {
            return (
                <TouchableOpacity
                    onPress={() => handleTouchCategory(item.name)}
                >
                    <View className={item.name == category ? "mr-4 flex-row items-center rounded-3xl px-4 py-[6px] bg-primary" : "mr-4 flex-row items-center rounded-3xl px-4 py-[6px] bg-secondary"}>
                        <Image source={item.icon} className="w-6 h-6 mr-2" />
                        <Text className="text-white">{item.name}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
  return (
    <SafeAreaView className="flex-1 pt-4 bg-theme ">
        <ScrollView
            onScroll={(e) => handleScroll(e)}
        >
            <View className="flex-row mx-5 justify-between mt-4 items-center">
                <View className="flex-row flex justify-between items-center flex-wrap w-full">
                    
                    <View className="w-[220px]">
                        <Text className="text-bold-txt text-2xl font-bold ">Where do you want to discover?</Text>
                    </View>
                    <View className="w-16 h-16 border-2 mr-2 border-slate-100 rounded-full bg-primary">
                        <Image className="w-full h-full rounded-full"
                                source={Avatar}
                        />
                    </View>

                </View>
                
            </View>

            <View className="flex-row mx-5 bg-white mt-6 shadow-2xl justify-between items-center border-[1px] border-[#D2D2D2] rounded-3xl px-2">
                <View className="flex-row items-center justify-center">
                    <Image source={search} className="w-6 h-6 mx-2"/>
                    <TextInput 
                        placeholder='Discover a city'
                        className="py-2 flex-1 text-lg"
                        onChangeText={handleChange}
                    />           
                </View>
                <View>
                    <Button
                        onPress={handleSubmit}
                        title="Submit"
                        color="#3F95EC"
                        accessibilityLabel="Learn more about this purple button"
                    />
                </View>
            </View>

            <View className="mx-5">
                <FlatList
                    data={categoriesData}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderCategory}
                    contentContainerStyle={{ paddingVertical: 10 }}
                />
            </View>
            {searchPlaces ?
                <View className="mx-5">
                    <Text className="text-xl font-bold">Tìm kiếm tương tự</Text>
                    <View className="flex-row flex-wrap justify-between">
                        { searchPlaces && searchPlaces?.locations.map((value, index) => 
                            value.result_object.photo && value.result_object.name && (
                            <TouchableOpacity className="" key={value.result_object.location_id}
                                onPress={() => handleClick(value)}
                            >
                                <View className="w-[175px] p-[5px] bg-white flex rounded-2xl ">
                                    <Image source={{ uri: value.result_object.photo.images?.original.url}} className="w-full h-[150px] object-contain rounded-2xl relative opacity-[0.85]" />
                                    <View className="absolute top-3 left-3 right-3 flex-row justify-between items-center">
                                        <View className="bg-white opacity-80 px-3 py-1 rounded-2xl">
                                            <Text className="">⭐ {value.result_object.rating}</Text>
                                        </View>
                                        <View className="bg-white opacity-80 p-2 flex items-center justify-center rounded-full">
                                            <Image source={like} className="z-50 w-5 h-5" />
                                        </View>
                                    </View>
                                    <Text className="text-[17px] font-semibold mx-1 mt-1 text-bold-txt">{value.result_object.name.length > 20 ? value.result_object.name.slice(0,20) + "..." : value.result_object.name}</Text>
                                    <View className="flex-row items-center">
                                            <Image source={location} className="w-5 h-5" />
                                            <Text className="text-sm text-basic" > {value.result_object.location_string.length > 15 ? value.result_object.location_string.slice(0,15) + "..." : value.result_object.location_string} </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            )
                       )}
                    </View>
                    <Text className="font-bold text-lg" >Nhà hàng gần đó</Text>
                    <View className="flex-row flex-wrap justify-between">
                    { searchPlaces && searchPlaces?.restaurants.slice(0,8).map((value, index) => 
                        value.photo && value.name && (
                            <TouchableOpacity className="" key={value.location_id}
                            onPress={() => handleClick(value)}
                        >
                            <View className="w-[175px] p-[5px] bg-white flex rounded-2xl ">
                                <Image source={{ uri: value.photo.images?.original.url}} className="w-full h-[150px] object-contain rounded-2xl relative opacity-[0.85]" />
                                <View className="absolute top-3 left-3 right-3 flex-row justify-between items-center">
                                    <View className="bg-white opacity-80 px-3 py-1 rounded-2xl">
                                        <Text className="">⭐ {value.rating}</Text>
                                    </View>
                                    <View className="bg-white opacity-80 p-2 flex items-center justify-center rounded-full">
                                        <Image source={like} className="z-50 w-5 h-5" />
                                    </View>
                                </View>
                                <Text className="text-[17px] font-semibold mx-1 mt-1 text-bold-txt">{value.name.length > 20 ? value.name.slice(0,20) + "..." : value.name}</Text>
                                <View className="flex-row items-center">
                                        <Image source={location} className="w-5 h-5" />
                                        <Text className="text-sm text-basic" > {value.location_string.length > 15 ? value.location_string.slice(0,15) + "..." : value.location_string} </Text>
                                </View>
                            </View>
                            </TouchableOpacity>
                        )
                    )}
                </View>
                    <Text classNam="font-bold text-lg">Khách sạn gần đó</Text>
                    <View className="flex-row flex-wrap justify-between">
                        { searchPlaces && searchPlaces?.hotels.map((value, index) => 
                            value.result_object.photo && value.result_object.name && (
                                <TouchableOpacity className="" key={value.result_object.location_id}
                                onPress={() => handleClick(value)}
                            >
                                <View className="w-[175px] p-[5px] bg-white flex rounded-2xl ">
                                    <Image source={{ uri: value.result_object.photo.images?.original.url}} className="w-full h-[150px] object-contain rounded-2xl relative opacity-[0.85]" />
                                    <View className="absolute top-3 left-3 right-3 flex-row justify-between items-center">
                                        <View className="bg-white opacity-80 px-3 py-1 rounded-2xl">
                                            <Text className="">⭐ {value.result_object.rating}</Text>
                                        </View>
                                        <View className="bg-white opacity-80 p-2 flex items-center justify-center rounded-full">
                                            <Image source={like} className="z-50 w-5 h-5" />
                                        </View>
                                    </View>
                                    <Text className="text-[17px] font-semibold mx-1 mt-1 text-bold-txt">{value.result_object.name.length > 20 ? value.result_object.name.slice(0,20) + "..." : value.result_object.name}</Text>
                                    <View className="flex-row items-center">
                                            <Image source={location} className="w-5 h-5" />
                                            <Text className="text-sm text-basic" > {value.result_object.location_string.length > 15 ? value.result_object.location_string.slice(0,15) + "..." : value.result_object.location_string} </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            )
                        )}
                    </View>
    
                </View>
                :
                <View className="mx-5">
                    <View className="flex-row justify-between">
                        <Text className="font-semibold text-bold-txt text-lg" >Recommand City</Text>
                        <Text className="text-basic">See All</Text>
                    </View>
                    <ScrollView 
                        horizontal 
                        showsHorizontalScrollIndicator={false}
                        className="my-2 flex-row overflow-x-scroll"
                    >
                        {
                            citiesData?.map((value, index) => (
                                <TouchableOpacity 
                                    onPress={() => handleClick(value)}
                                    className="w-[200px] h-[230px] mr-4"
                                    key={`city-${index}`}
                                >
                                    <Image source={{ uri: value.result_object.photo.images.original.url}} className="w-full h-full object-contain rounded-2xl relative opacity-[0.8]" />
                                    <View className="absolute top-3 right-3 flex-row justify-between items-center">
                                        <View className="bg-white opacity-80 p-2 flex items-center justify-center rounded-full">
                                            <Image source={like} className="z-50 w-5 h-5" />
                                        </View>
                                    </View>
                                    <View className="absolute bottom-3 left-3">
                                        <Text className="text-lg font-bold mx-1 text-white">{value.result_object.name}</Text>
                                        <View className="flex-row items-center">
                                            <Image source={location} className="w-5 h-5" />
                                            <Text className="text-sm font-medium text-white" >{value.result_object.location_string}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))
                        }
                        
                    </ScrollView>
                    
                    <View className="flex-row justify-between">
                        <Text className="font-semibold text-bold-txt text-lg" >Best Places</Text>
                        <Text className="text-basic">See All</Text>
                    </View>
                    <ScrollView 
                        horizontal 
                        showsHorizontalScrollIndicator={false}
                        className="my-2 flex-row overflow-x-scroll"
                    >
                        {
                            touristAttractionData.map((value) => (
                                <TouchableOpacity className="mr-4" key={value.result_object.location_id}
                                                    onPress={() => handleClick(value)}
                                >
                                    <View className="w-[200px] p-[8px] bg-white flex rounded-2xl ">
                                        <Image source={{ uri: value.result_object.photo.images.original.url}} className="w-full h-[170px] object-contain rounded-2xl relative opacity-[0.85]" />
                                        <View className="absolute top-3 left-3 right-3 flex-row justify-between items-center">
                                            <View className="bg-white opacity-80 px-3 py-1 rounded-2xl">
                                                <Text className="">⭐ {value.result_object.rating}</Text>
                                            </View>
                                            <View className="bg-white opacity-80 p-2 flex items-center justify-center rounded-full">
                                                <Image source={like} className="z-50 w-5 h-5" />
                                            </View>
                                        </View>
                                        <Text className="text-[17px] font-semibold mx-1 mt-1 text-bold-txt">{value.result_object.name}</Text>
                                        <View className="flex-row items-center">
                                                <Image source={location} className="w-5 h-5" />
                                                <Text className="text-sm text-basic" > {value.result_object.location_string} </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>                       
                            ))
                        }
                    </ScrollView>
                    <View className="flex-row justify-between">
                        <Text className="font-semibold text-bold-txt text-lg" >Best Hotels</Text>
                        <Text className="text-basic">See All</Text>
                    </View>
                    <View className="flex-row justify-between">
                        <Text className="font-semibold text-bold-txt text-lg" >Best Restaurants</Text>
                        <Text className="text-basic">See All</Text>
                    </View>

                    
                </View>
            }
        </ScrollView>
    </SafeAreaView>
  )
}

export default Discover