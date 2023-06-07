import { View, Text, Image, TextInput, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Avatar } from '../assets'

import search from "../assets/search.png"
import like from "../assets/like.png"
import location from "../assets/location.png"

import { getHotels, getPlaceSearch } from '../services/placesData';
import { categoriesData } from '../services/categoriesData';
import { touristAttractionData } from '../services/touristAttractionData'

import { citiesData } from '../services/citiesData'
import axios from 'axios'
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage'
import PlaceInfo from './components/PlaceInfo'
import { REACT_NATIVE_BASE_URL } from '../contains'
import Loading from './components/Loading'
import TouristAttractionInfo from './components/TouristAttractioninfo'
import { MyContext } from '../context';

const Discover = ({ navigation }) => {
    const { t } = useTranslation()
    const { language, setLanguage } = useContext(MyContext)
    const [ touristAttraction, setTouristAttraction ] = useState({ stored: [], notStored: []})
    const [ loading, setLoading ] = useState(true)

    const [ searchType, setSearchType ] = useState({ stored: [], notStored: []})
    const [ seeAll, setSeeAll ] = useState(false)
    const [ keySearch, setKeySearch ]= useState('')
    const [ category, setCategory ] = useState(language == 'en' ? 'All' : 'Tất cả')
    const [ searchPlaces, setSearchPlaces ] = useState([])

    useEffect(() => {
        const getAllPlaces = async () => {
            setLoading(true)
            const token = JSON.parse(await AsyncStorage.getItem('token'))
            const newlanguage = await AsyncStorage.getItem('language')
            // AsyncStorage.getItem('language').then(lang => {
                setLanguage(newlanguage);
                setCategory(newlanguage == 'en' ? 'All' : 'Tất cả');
                
                axios.get(`${REACT_NATIVE_BASE_URL}/${newlanguage || 'en'}/Account/SearchByType/all`,
                {
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                  },
                })
                .then(response => {
                        // const data = response.data.stored.concat(response.data.notStored);
                        console.log(response.data)
                        setTouristAttraction(response.data);
                        setLoading(false);
                    }).catch(error => {
                        setLoading(false);
                        console.log(error); 
                    });
            // }).catch(error => {
            //     console.log(error);
            // });        
        }
        getAllPlaces()
    }, [])
    const handleKeySearch = (e) => {
        setKeySearch(e)
    }
    const handleSearch = async () => {
        setLoading(true)
        const token = JSON.parse(await AsyncStorage.getItem('token'));
        const language = await AsyncStorage.getItem('language');
        axios.get(`${REACT_NATIVE_BASE_URL}/${language}/Account/Searchapi/${keySearch}`,
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
        .then(response => {
            setSearchPlaces(response.data.result)
            setLoading(false)
        }).catch(error => {
            console.log(error);
        });
        // if(change == '') {
        //     return 
        // }
        // const options = {
        //     method: 'GET',
        //     url: 'https://travel-advisor.p.rapidapi.com/locations/search',
        //     params: {
        //       query: change,
        //       limit: 30,
        //       offset: '0',
        //       units: 'km',
        //       location_id: '1',
        //       currency: 'USD',
        //       sort: 'relevance',
        //       lang: 'en' //or vi
        //     },
        //     headers: {
        //       'X-RapidAPI-Key': 'dfd82f7dc1msh79f889e9b674a2fp1d9bf5jsn06aaec52702a',
        //       'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
        //     }
        // };

        // axios.request(options).then(function (response) {
        //     const { data } = response.data

        //     let dataLocations = []
        //     let dataHotels = []
        //     data.map((value) => {
        //         if(value.result_object.timezone === 'Asia/Ho_Chi_Minh') {
        //             if(value.result_type === 'things_to_do' || value.result_type === 'geos') {
        //                 console.log(value)
        //                 dataLocations.push(value)
        //             }
        //             if(value.result_type === 'lodging') {
        //                 dataHotels.push(value)
        //             }
        //         }
        //     })
        //     console.log(dataLocations)

        //     const lat = dataLocations[0].result_object.latitude
        //     const lng = dataLocations[0].result_object.longitude
        //     const options = {
        //         method: 'GET',
        //         url: 'https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng',
        //         params: {
        //           latitude: lat,
        //           longitude: lng,
        //           limit: '30',
        //           currency: 'USD',
        //           distance: '2',
        //           open_now: 'false',
        //           lunit: 'km',
        //           lang: 'en_US'
        //         },
        //         headers: {
        //           'X-RapidAPI-Key': 'dfd82f7dc1msh79f889e9b674a2fp1d9bf5jsn06aaec52702a',
        //           'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
        //         }
        //     };
        //     axios.request(options).then(function (response) {
        //         const { data } = response.data
        //         setSearchPlaces({
        //             locations: dataLocations,
        //             hotels: dataHotels,
        //             restaurants: data,
        //         })
        //     })
                
        // }).catch(function (error) {
        //     console.error(error);
        // });
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
    const handleClick = (name, address, image, description, rating, latitude, longitude) => {
        const data = {
            name, address, image, description, rating, latitude, longitude
        }
        navigation.navigate("Details", { data })
    }

    const handleTouchCategory = async (name, type) => {
        setLoading(true)
        setCategory(name)
        setSearchPlaces([])
        const token = JSON.parse(await AsyncStorage.getItem('token'))
        axios.get(`${REACT_NATIVE_BASE_URL}/${language}/Account/SearchByType/${type}`,
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
        .then(response => {
            console.log(response.data)
            setSearchType(response.data)
            setLoading(false)
        }).catch(error => {
            console.log(error);
        });
    

    }
    const renderCategory = (name, icon, id, type) => {
        return (
            <TouchableOpacity
                key={`${type}-${id}`}
                onPress={() => handleTouchCategory(name, type)}
            >
                <View className={name == category ? "mr-4 flex-row items-center rounded-3xl px-4 py-[5px] bg-primary" : "mr-4 flex-row items-center rounded-3xl px-4 py-[5px] bg-secondary"}>
                    <Image source={icon} className="w-[24px] h-[24px] mr-1" />
                    <Text className="text-white">{name}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    const handleSeeAll = (type) => {
        setSeeAll({ boolean: !seeAll.boolean , type })
    }
  
  return (
    <SafeAreaView className="flex-1 bg-theme ">
        <ScrollView
            // onScroll={(e) => handleScroll(e)}
        >
            <View className="flex-row mx-5 justify-between mt-6 items-center">
                <View className="flex-row flex justify-between items-center flex-wrap w-full">
                    
                    <View className="w-[220px]">
                        <Text className="text-bold-txt text-2xl font-bold ">{t('discover.title')}</Text>
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
                        placeholder={t('discover.search')}
                        className="py-2 flex-1 text-lg"
                        onChangeText={handleKeySearch}
                        onSubmitEditing={handleSearch}
                        returnKeyType="search"
                    />           
                </View>
            </View>

            <View className="mx-5">
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    className="my-2 flex-row overflow-x-scroll"
                >
                    {categoriesData.map((category) => (
                        renderCategory(t(`discover.${category.name}`), category.icon, category.id, category.type)
                    ))}
                </ScrollView>
                {/* <FlatList
                    data={categoriesData}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderCategory}
                    contentContainerStyle={{ paddingVertical: 10 }}
                /> */}
            </View>
            {loading ? <Loading /> : searchPlaces.length > 0 ?
                <View className="mx-5 pb-16">
                    <Text className="text-xl font-semibold text-bold-txt">Tìm kiếm tương tự</Text>
                    <View className="flex-row flex-wrap justify-between">
                        { searchPlaces.map((value, index) => 
                            <TouchableOpacity className="" key={`searchPlace-${index}`}
                                onPress={() => handleClick(value.name, value.address ? value.address : '' , value.photo, value.description ? value.description : '', value.rating, value.latitude, value.longitude)}
                            >
                                <View className="w-[175px] p-[5px] bg-white flex rounded-2xl ">
                                    <Image source={{ uri: value.photo }} className="w-full h-[150px] object-contain rounded-2xl relative opacity-[0.85]" />
                                    <View className="absolute top-3 left-3 right-3 flex-row justify-between items-center">
                                        {value.rating != 'None' &&
                                            <View className="bg-white opacity-80 px-3 py-1 rounded-2xl">
                                                <Text className="">⭐ {value.rating}</Text>
                                            </View>
                                        }
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
                            </TouchableOpacity>)
                       }
                    </View>
                    {/* <Text className="font-bold text-lg" >Nhà hàng gần đó</Text>
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
                    </View> */}
    
                </View>
                :
            loading ? <Loading /> : searchType.length > 0 ? 
                <View className="mx-5 my-2 pb-16">
                    <View className="flex-row flex-wrap justify-between">
                            {searchType.length > 0 && searchType.map((value, index) => ( 
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
                                            isStorage: value.Stored
                                        }}
                                    />                     
                                ))
                            }
                    </View>
                </View>
                :
                loading ? <Loading /> : <View className="mx-5 pb-8">
                    <View className="flex-row justify-between">
                        <Text className="font-semibold text-bold-txt text-lg" >{t('discover.exploreCity')}</Text>
                        {/* <Text className="text-basic">{t('discover.seeAll')}</Text> */}
                    </View>
                    <ScrollView 
                        horizontal 
                        showsHorizontalScrollIndicator={false}
                        className="my-2 flex-row overflow-x-scroll"
                    >
                        {
                            citiesData?.map((value, index) => (
                                <TouristAttractionInfo 
                                    navigation={navigation} 
                                    data = {{
                                        id: `city-${index}`,
                                        name: value.result_object.name, 
                                        latitude: value.result_object.latitude, 
                                        longitude: value.result_object.longitude,
                                        location_string: value.result_object.location_string,
                                        image: value.result_object.photo.images.original.url,
                                        address: value.result_object.location_string, 
                                        description: value.result_object.geo_description,
                                        story: undefined,
                                        type: value.result_object.type,
                                        noExistStorage: true
                                    }}
                                />
                            ))
                        }
                    </ScrollView>
                    
                    <View className="flex-row justify-between">
                        <Text className="font-semibold text-bold-txt text-lg" >{t('discover.popularPlace')}</Text>
                        {/* <TouchableOpacity onPress={() => handleTouchCategory('all', 'all')}>
                            <Text className="text-basic">{t('discover.seeAll')}</Text> 
                        </TouchableOpacity> */}
                    </View>
                    {loading ? <Loading /> : 
                        <ScrollView 
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            className="my-2 flex-row overflow-x-scroll mb-16"
                        >
                            {touristAttraction.length > 0 && touristAttraction.map((value, index) => ( 
                                    <PlaceInfo navigation={navigation} 
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
                    }
                </View>
            }
        </ScrollView>
    </SafeAreaView>
  )
}

export default Discover