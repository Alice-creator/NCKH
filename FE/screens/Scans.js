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
import axios from 'axios';

const DetailData = ({ image, setShowDetail, setImage, classifier, setPhoto, navigation }) => {
  const [ category, setCategory ] = useState('')
  const [ data, setData ] = useState('')

  const handleTouchCategory = (name) => {
    setCategory(name)
  }
  console.log("classifier", classifier)
  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://travel-advisor.p.rapidapi.com/locations/search',
      params: {
        query: classifier.name,
        limit: 1,
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
      setData(data[0].result_object)
    })
  }, [])
  const handleShowDetail = () => {
    setShowDetail(false)
    setImage(undefined)
    setPhoto(undefined)
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
    <ScrollView className="flex-1 bg-theme">
      <TouchableOpacity className="bg-theme rounded-full p-[10px] w-10 h-10 absolute top-6 left-4 z-20"
            onPress={handleShowDetail}
      >
        <Image className="w-full h-full" source={arrow_back} />
      </TouchableOpacity>
      <View className="h-[373] w-full">
        <Image style={styles.preview} source={{ uri: image }} />
      </View>
      <View className="p-4 flex-1 rounded-t-3xl -top-8 bottom-8 right-0 left-0 bg-theme">
        <View className="flex-row justify-between items-center mx-1">
          <View className="">
            <Text className="text-xl font-bold text-bold-txt tracking-wider ">{classifier.name}</Text>
            <View className="flex-row items-center">
                <Image source={locationIcon} className="w-5 h-5" />
                <Text className="text-base text-[#3F95EC]" >{data.address}</Text>
            </View>
          </View>
          {/* <View>
            <Text>{data.rating}</Text>
          </View> */}
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text className="text-base text-[#4F606D]">
          Bitexco Financial Tower hay Tháp Tài chính Bitexco là một tòa nhà chọc trời được xây dựng tại trung tâm Quận 1, Thành phố Hồ Chí Minh. Tòa nhà được xây dựng trên diện tích gần 6.100 m². Tổng vốn đầu tư ước tính khoảng 220 triệu USD, được tập đoàn Bitexco Group có trụ sở tại Hà Nội đầu tư xây dựng.          </Text>
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

export default function Scans({ navigation }) {
  const [ image, setImage ] = useState(null);
  const [ type, setType ] = useState(CameraType.back)
  const [ flash, setFlash ] = useState(Camera.Constants.FlashMode.off)
  const [ showDetail, setShowDetail ] = useState(false)
  const [ classifier, setClassifier ] = useState(null)
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [5, 6],
      quality: 1,
    });

    // console.log(result);
    
    if (!result.canceled) {
      const file = { file: result.assets[0].uri}
      const data = new FormData();
      data.append('file', {
        uri: result.assets[0].uri,
        type: 'image/jpeg',
        name: 'photo.jpg',
      });
      axios.post('http://192.168.44.230:5000/User/Image', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then(response => {
        
        setClassifier(response.data.result)
        setImage(result.assets[0].uri);
        setShowDetail(true)
      }).catch(error => {
        console.log(error);
      });
      
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
    console.log("new", newPhoto)
    
    setPhoto(newPhoto);

    setShowDetail(true)
  };
   
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

    // <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
    // <Button title="Share" onPress={sharePic} />
    // {hasMediaLibraryPermission ? <Button title="Save" onPress={savePhoto} /> : undefined}
    // <Button title="Discard" onPress={() => setPhoto(undefined)} />
    return (
      <SafeAreaView style={styles.container}>
        {showDetail && (
          <DetailData image={"data:image/jpg;base64," + photo.base64} setShowDetail={setShowDetail} setImage={setImage} setPhoto={setPhoto} classifier={classifier} navigation={navigation}/>
        )}
      </SafeAreaView>
    );
  }
  if(image) {
    return (
      <>
        {showDetail && (
          <DetailData image={image} setShowDetail={setShowDetail} setImage={setImage} setPhoto={setPhoto}  classifier={classifier} navigation={navigation}/>
        )}
      </>
    )
  }
  console.log("image",image)
  console.log("photo",photo)
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