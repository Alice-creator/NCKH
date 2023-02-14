import React, { useState, useEffect, useRef } from 'react';
import { Button, Image, View, StyleSheet, Text, SafeAreaView, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { Camera, CameraType } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import { StatusBar } from 'expo-status-bar';

import imageIcon from "../assets/image.png"
import retweetIcon from "../assets/retweet.png"
import flashIcon from "../assets/flash.png"
import arrow_back from "../assets/arrow_back.png"
import locationIcon from "../assets/location.png"
import distanceIcon from "../assets/distance.png"
import typeIcon from "../assets/type.png"
import { categoriesData } from '../services/categoriesData';

export default function Scans({ navigation }) {
  const [ image, setImage ] = useState(null);
  const [ type, setType ] = useState(CameraType.back)
  const [ flash, setFlash ] = useState(Camera.Constants.FlashMode.off)

  const [ category, setCategory ] = useState('')


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>
  } else if (!hasCameraPermission) {
    return <Text>Permission for camera not granted. Please change this in settings.</Text>
  }

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };


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
  if (photo) {
    let sharePic = () => {
      shareAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    return (
      <SafeAreaView style={styles.container}>
        <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
        <Button title="Share" onPress={sharePic} />
        {hasMediaLibraryPermission ? <Button title="Save" onPress={savePhoto} /> : undefined}
        <Button title="Discard" onPress={() => setPhoto(undefined)} />
      </SafeAreaView>
    );
  }
  if(image) {
    return (
      <ScrollView className="flex-1 bg-theme">
        <View className="h-[373] w-full">
          <Image style={styles.preview} source={{ uri: image }} />
        </View>
        <View className="p-4 flex-1 rounded-t-3xl -top-8 bottom-8 right-0 left-0 bg-theme">
          <View className="flex-row justify-between items-center ">
            <View>
              <Text className="text-xl font-bold text-bold-txt tracking-wider ">Landmark 81</Text>
              <View className="flex-row items-center">
                  <Image source={locationIcon} className="w-5 h-5" />
                  <Text className="text-base text-[#3F95EC]" >Binh Thanh, Ho Chi Minh</Text>
              </View>
            </View>
            <View>
              <Text>4.7</Text>
            </View>
          </View>
          <View style={{ marginVertical: 10 }}>
            <Text className="text-base text-[#4F606D]">fjdsakfjskfjaskjfkfjdsakfjskfjaskjfkfjdsakfjskfjaskjfkfjdsakfjskfjaskjfkfjdsakfjskfjaskjfkfjdsakfjskfjaskjfkfjdsakfjskfjafjdsakfjskfjaskjfkfjdsakfjskfjaskjfkfjdsakfjskfjaskjfkfjdsakfjskfjaskjfkfjdsakfjskfjaskjfkfjdsakfjskfjaskjfkfjdsakfjskfjaskjfkskjfkfjdsakfjskfjaskjfk
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
                  <Text className="text-[13px]">lodging</Text>
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
                onPress={() => navigation.navigate("Maps")}
              >
                <View className="w-full bg-primary py-4 rounded-full">
                  <Text className="text-center text-white text-xl font-medium">Check on map</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        
      </ScrollView>
    )
  }
  return (
    <View className="w-full h-full flex-1" style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      

      <Camera 
        className="w-full flex-1 flex items-center justify-end relative" 
        ref={cameraRef}
        flashMode={flash}
        type={type}
      >
        
        <TouchableOpacity
          className="w-14 h-14 top-8 right-0 absolute"
          onPress={() =>  { setFlash(flash === Camera.Constants.FlashMode.off ? Camera.Constants.FlashMode.on : Camera.Constants.FlashMode.off)}}
        >
          <Image source={flashIcon} />
        </TouchableOpacity>
        <TouchableOpacity className="bg-theme rounded-full p-[10px] w-10 h-10 absolute top-6 left-6 z-20"
            onPress={() => navigation.navigate("Discover")}
        >
        <Image className="w-full h-full" source={arrow_back} />
      </TouchableOpacity>
        <View className="bottom-12 px-10 py-2 rounded-full bg-[#00000080]">
          <View className="flex-row justify-center items-center">
            <TouchableOpacity
              className="w-14 h-14 rounded-full"
              onPress={pickImage}
            >
              <Image 
                className="h-full w-full rounded-full"
                source={imageIcon}/>
            </TouchableOpacity>

            <TouchableOpacity
              className="p-1 border-[3px] mx-8 border-white w-20 h-20 rounded-full"
              onPress={takePic} 
            >
              <View 
                className="bg-white  rounded-full w-full h-full"
              ></View>
            </TouchableOpacity>

            <TouchableOpacity
              className="w-10 h-10"
              onPress={() => { setType(type === CameraType.back ? CameraType.front : CameraType.back  ) }}
            >
              <Image 
                className="h-full w-full"
                source={retweetIcon}/>
            </TouchableOpacity>
          </View>
        </View>
        <StatusBar style="auto" />
      </Camera>

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    backgroundColor: '#fff',
    alignSelf: 'flex-end'
  },
  preview: {
    alignSelf: 'stretch',
    flex: 1
  }
}); 