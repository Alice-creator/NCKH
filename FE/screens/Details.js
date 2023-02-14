import { View, Text, SafeAreaView, ScrollView, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { categoriesData } from '../services/categoriesData';

import locationIcon from "../assets/location.png"
import distanceIcon from "../assets/distance.png"
import typeIcon from "../assets/type.png"
import arrow_back from "../assets/arrow_back.png"

const Details = ({ route, navigation }) => {
    const { data } = route.params;
    const decription = data.result_object.geo_description ? data.result_object.geo_description : data.result_object.description
    const location = data.result_object.geo_description ? data.result_object.location_string : data.result_object.address

    const [ textLength, setTextLength ]= useState(150)
    const [ category, setCategory ] = useState('')

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
    <SafeAreaView className="bg-theme">
     <ScrollView className="bg-theme relative">
      <TouchableOpacity className="bg-theme rounded-full p-[10px] w-10 h-10 absolute top-6 left-4 z-20"
            onPress={() => navigation.navigate("Discover")}
      >
        <Image className="w-full h-full" source={arrow_back} />
      </TouchableOpacity>
      <View className="flex-1 flex justify-between bg-theme">
        <View className="" style={{ height: 373 , width: '100%' }}
              key={data.result_object.location_id}
        >
          <Image
                source={{
                uri: `${data.result_object.photo && data.result_object.photo.images.original.url}`,
                }}
                className="w-full h-full bg-blue-100"
          />
        </View>   
        <View className="p-4 flex-1 rounded-t-3xl -top-10 bottom-0 bg-theme">
          <View className="flex-row justify-between items-center ">
            <View>
              <Text className="text-xl font-bold text-bold-txt tracking-wider ">{data.result_object.name}</Text>
              <View className="flex-row items-center">
                  <Image source={locationIcon} className="w-5 h-5" />
                  <Text className="text-base text-[#3F95EC]" >{location}</Text>
              </View>
            </View>
            <View>
              <Text>{data.result_object.rating}</Text>
            </View>
          </View>
          <View style={{ marginVertical: 10 }}>
            <Text className="text-base text-[#4F606D]">{decription.length > 50 ? 
                    decription.slice(0,textLength) + "..." : 
                    decription}
                  {textLength == 150 ? 
                    <Text style={{ fontWeight: 'bold'}}
                          onPress={() => setTextLength(-1)}
                    >Xem thêm</Text> : 
                    <Text style={{ fontWeight: 'bold' }}
                          onPress={() => setTextLength(150)}
                    >Ẩn bớt</Text>
                }
            </Text>
          </View>

          <View className="flex-row justify-between mt-2">
            <View className="flex-row">
                <View className="bg-[#CBEDFD] mr-3 rounded-lg w-12 h-12 p-3">
                  <Image className="w-full h-full" source={distanceIcon} />
                </View>
                <View>
                  <Text className="text-[14px] font-bold tracking-wide mb-1 text-[#154874]">Distance</Text>
                  <Text className="text-[13px]">4.7km</Text>
                </View>
            </View>
            <View className="flex-row">
                <View className="bg-[#FCF2E3] mr-3 rounded-lg w-12 h-12 p-3">
                  <Text className="text-base">⭐</Text>
                </View>
                <View>
                  <Text className="text-[14px] font-bold tracking-wide mb-1 text-[#FCD53E]">Rating</Text>
                  <Text className="text-[13px]">4.0</Text>
                </View>
            </View>
            <View className="flex-row">
                <View className="bg-[#D5D3FB] mr-3 rounded-lg w-12 h-12 p-3">
                  <Image className="w-full h-full" source={typeIcon} />
                </View>
                <View>
                  <Text className="text-[14px] font-bold tracking-wide mb-1 text-[#5F3FF1]">Type</Text>
                  <Text className="text-[13px]">{data.result_type}</Text>
                </View>
            </View>
          
          </View>

          <View>
            <Text className="font-bold text-lg text-[#4F606D]">Suggest</Text>
            <View className="">
                <FlatList
                    data={categoriesData}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderCategory}
                    contentContainerStyle={{ paddingVertical: 10 }}
                />
            </View>
          </View>


          <View className="mt-6">
              <TouchableOpacity
                onPress={() => navigation.navigate("Maps", { data })}
              >
                <View className="w-full bg-primary py-4 rounded-full">
                  <Text className="text-center text-white text-xl font-medium">Check on map</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

      </View>
     </ScrollView>
    </SafeAreaView>
  )
}

export default Details