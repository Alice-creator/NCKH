import { View, Text, Image, TextInput, ScrollView, TouchableOpacity, SafeAreaView, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Avatar } from '../assets'

import search from "../assets/search.png"

import { categoriesData } from '../services/categoriesData';
import { citiesData } from '../services/citiesData'
import axios from 'axios'
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage'
import PlaceInfo from './components/PlaceInfo'
import { REACT_NATIVE_BASE_URL } from '../contains'
import Loading from './components/Loading'
import TouristAttractionInfo from './components/TouristAttractioninfo'
import { MyContext } from '../context';
import { places_vi, places_en } from '../services/places';
const Discover = ({ navigation }) => {
    const { t } = useTranslation()
    const { language } = useContext(MyContext)
    const [ getLanguage, setGetLanguage ] = useState('en')
    const [ touristAttraction, setTouristAttraction ] = useState()
    const [ recommends, setRecommends ]  = useState([])
    const [ loading, setLoading ] = useState(true)

    const [ searchType, setSearchType ] = useState()
    const [ keySearch, setKeySearch ]= useState('')
    const [ category, setCategory ] = useState()
    const [ searchPlaces, setSearchPlaces ] = useState([])

    useEffect(() => {
        const getAllPlaces = async () => {
            setLoading(true)
            const token = JSON.parse(await AsyncStorage.getItem('token'))
            const newlanguage = await AsyncStorage.getItem('language')
            // AsyncStorage.getItem('language').then(lang => {
            setGetLanguage(newlanguage)
            axios.get(`${REACT_NATIVE_BASE_URL}/${newlanguage || 'en'}/Account/SearchByType/all`,
            {
                headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
                },
            })
            .then(response => {
                console.log(response.data)
                // const data = response.data.stored.concat(response.data.notStored);
                setTouristAttraction(response.data);
                setLoading(false);
            }).catch(error => {
                const data = newlanguage == 'vi' ? places_vi : places_en
                setTouristAttraction(data)
                setLoading(false)
            });
        }
        getAllPlaces()
        const getRecommends = async () => {
            setLoading(true)
            const token = JSON.parse(await AsyncStorage.getItem('token'))
            const newlanguage = await AsyncStorage.getItem('language')
            // AsyncStorage.getItem('language').then(lang => {
            setGetLanguage(newlanguage)
            axios.get(`${REACT_NATIVE_BASE_URL}/${newlanguage || 'en'}/Recommender`,
            {
                headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
                },
            })
            .then(response => {
                setRecommends(response.data)
                // const data = response.data.stored.concat(response.data.notStored);
                // setTouristAttraction(response.data);
                setLoading(false);
            }).catch(error => {
                setRecommends([])
            });
        }
        getRecommends()
    }, [language])
    const handleKeySearch = (e) => {
        if(e.length > 0) setKeySearch(e)
    }
    const handleSearch = async () => {
        setLoading(true)
        const token = JSON.parse(await AsyncStorage.getItem('token'));
        axios.get(`${REACT_NATIVE_BASE_URL}/${getLanguage}/Account/Searchapi/${keySearch}`,
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
    }

    const handleTouchCategory = async (name, type) => {
        setLoading(true)
        setCategory(name)
        setSearchPlaces([])
        const token = JSON.parse(await AsyncStorage.getItem('token'))
        axios.get(`${REACT_NATIVE_BASE_URL}/${getLanguage}/Account/SearchByType/${type}`,
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
        .then(response => {
            setSearchType(response.data)
            setLoading(false)
        }).catch(error => {
            console.log(error);
        });
    }
    const renderCategory = (name, icon, id, type) => {
        return (
            <TouchableOpacity
                key={`${Math.random()}`}
                onPress={() => handleTouchCategory(name, type)}
            >
                <View className={name == category ? "mr-4 flex-row items-center rounded-3xl px-4 py-[5px] bg-primary" : "mr-4 flex-row items-center rounded-3xl px-4 py-[5px] bg-secondary"}>
                    <Image source={icon} className="w-[24px] h-[24px] mr-1" />
                    <Text className="text-white">{name}</Text>
                </View>
            </TouchableOpacity>
        )
    }
  return (
    <SafeAreaView className="flex-1 bg-theme ">
         
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
        </View>
        {loading ? <Loading /> : searchPlaces.length > 0 ?
            <View className="mx-5 pb-72 w-full">
                <Text className="text-xl font-semibold text-bold-txt">Tìm kiếm tương tự</Text>
                <FlatList 
                    data={searchPlaces}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouristAttractionInfo
                            navigation={navigation}
                            data={{
                                id: item.TID,
                                name: item.name,
                                latitude: item.latitude,
                                longitude: item.longitude,
                                location_string: item.location_string,
                                image: item.photo,
                                address: item.address,
                                description: item.description,
                                story: item.story,
                                type: item.type,
                                likes: item.rating,
                                isStorage: item.Stored,
                                noExistStorage: true,
                                isTwoColumn: true
                            }}
                            
                        />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
            :
        loading ? <Loading /> : searchType?.length > 0 ? 
            <View className="px-5 my-2 mb-72 w-full">
                <FlatList 
                    data={searchType}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouristAttractionInfo
                            navigation={navigation}
                            data={{
                                id: item.TID,
                                name: item.name,
                                latitude: item.latitude,
                                longitude: item.longitude,
                                location_string: item.location_string,
                                image: item.images,
                                address: item.address,
                                description: item.description,
                                story: item.story,
                                type: item.type,
                                likes: item.likes,
                                isStorage: item.Stored,
                                isTwoColumn: true
                            }}
                            
                        />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
            :
            loading ? <Loading /> : <ScrollView className="mx-5 flex-1" showsVerticalScrollIndicator={false}>
                {recommends.length > 0 &&
                <>
                    <View className="flex-row justify-between">
                        <Text className="font-semibold text-bold-txt text-lg" >{t('discover.forYou')}</Text>
                    </View>
                    <ScrollView 
                        horizontal 
                        showsHorizontalScrollIndicator={false}
                        className="my-2 flex-row overflow-x-scroll"
                    >
                        {
                            recommends?.map((value, index) => (
                                <TouristAttractionInfo 
                                    key={`${Math.random()}`}
                                    navigation={navigation} 
                                    data = {{
                                        id: `forYou-${index}`,
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
                </>
                }
                <View className="flex-row justify-between">
                    <Text className="font-semibold text-bold-txt text-lg" >{t('discover.exploreCity')}</Text>
                </View>
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    className="my-2 flex-row overflow-x-scroll"
                >
                    {
                        citiesData?.map((value, index) => (
                            <TouristAttractionInfo 
                                key={`${Math.random()}`}
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
                    <Text className="font-semibold text-bold-txt text-lg">{t('discover.popularPlace')}</Text>
                </View>
                {loading ? <Loading /> : 
                    <ScrollView 
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        className="pb-20"
                    >
                            {touristAttraction?.length > 0 && touristAttraction.map((value, index) => ( 
                                    <PlaceInfo navigation={navigation} 
                                                key={`${Math.random()}`}
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
            </ScrollView>
        }
    </SafeAreaView>
  )
}

export default Discover