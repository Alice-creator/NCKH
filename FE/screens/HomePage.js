import { View, Text, Image, TouchableOpacity, Animated, SafeAreaView } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { bgHomepage } from '../contains/bgHomePage'
import elipBg from "../assets/elipse.png"
import { Dimensions } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get("window");

const HomePage = () => {
  const navigation = useNavigation()
  const scrollX = new Animated.Value(0);
  const [ bg, setBg ] = useState(bgHomepage[0])
  const [ isAdmin, setIsAdmin ] = useState(false)
  React.useEffect( ()=>{
    const checkLogin = async () => {
      try {
        const value = JSON.parse(await AsyncStorage.getItem('user'));
        if (value !== null) {
          if (value.role == 'Admin') {
            setIsAdmin(true)
          }
        }
        setIsAdmin(false)
      } catch (error) {
        console.log(error)
      }
    };
    checkLogin()
  },[]);
  function renderDots() {
    const dotPosition = Animated.divide(scrollX, width)
    return (
          <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 12
                }}
          >
                {bgHomepage.map((item, index) => {

                    const opacity = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [0.3, 1, 0.3],
                        extrapolate: "clamp"
                    })

                    const dotSize = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [8, 10, 8],
                        extrapolate: "clamp"
                    })

                    const dotColor = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: ["#9DC6FB", "#3F95EC", "#9DC6FB"],
                        extrapolate: "clamp"
                    })

                    return (
                        <Animated.View
                            key={`dot-${index}`}
                            opacity={opacity}
                            style={{
                                borderRadius: 10,
                                marginHorizontal: 5,
                                width: 20,
                                height: 6,
                                backgroundColor: dotColor
                            }}
                        />
                    )
                })}
          </View>
      )
    }

  return (
    <SafeAreaView className='flex-1 bg-theme'>
        <Animated.ScrollView
            horizontal
            pagingEnabled
            scrollEventThrottle={16}
            snapToAlignment="center"
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event([
                { nativeEvent: { contentOffset: { x: scrollX } } }
            ], { useNativeDriver: false })}
            >
              {
                bgHomepage.map((value, index) => (
                  <View style={{ height: height * 0.9, width: width }} key={`bg-${index}`}>
                    <Image 
                      source={value}
                      resizeMode="cover"
                      className={`h-full object-cover w-full flex-1`}
                    />
                  </View>
                ))
              }
        </Animated.ScrollView>
      <View className="w-full flex justify-center absolute -bottom-2 z-20">
        <View className="flex">
          <View className={`w-full h-[80] `}>
            <Image className="w-full h-full" source={elipBg}/>
          </View>
          <View className="bg-theme">
            <View className="w-full z-40 bg-transparent -top-[22]">
            { renderDots() }
            </View>
            <View className="w-full px-3 pb-2 bg-theme -top-3">
              <Text className="text-bold-txt font-bold tracking-wider text-[25px] text-center">Explore The</Text>
              <Text className="text-bold-txt font-bold tracking-wider text-[25px] text-center leading-7">Vietnam's Beauties</Text>
              <Text className="text-center text-basic text-[15px]">If you are craving for discovering your desired tourist attractions, this application suits you best</Text>
              <View className="mt-3">
                <TouchableOpacity
                  onPress={() => isAdmin ? navigation.navigate("AdminHome") : navigation.navigate("Tab")}
                >
                  <View className="w-full bg-primary py-4 rounded-full">
                    <Text className="text-center text-white text-xl font-medium">Get Started</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>

      
    </SafeAreaView>
  )
}

export default HomePage