import React, { useState, useEffect, useRef } from 'react';
import { Image, View, Text, SafeAreaView, TouchableOpacity, BackHandler } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { Camera, CameraType } from 'expo-camera';
import { StatusBar } from 'expo-status-bar';

import imageIcon from "../assets/image.png"
import retweetIcon from "../assets/retweet.png"
import flashIcon from "../assets/flash.png"
import arrow_back from "../assets/arrow_back.png"
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { REACT_NATIVE_BASE_URL } from '../contains';
import Loading from './components/Loading';

// import * as ort from 'onnxruntime-react-native';
import { Asset } from 'expo-asset';
import { InferenceSession } from 'onnxruntime-react-native';

export default function Scans({ navigation }) {
  const [ image, setImage ] = useState(null);
  const [ type, setType ] = useState(CameraType.back)
  const [ flash, setFlash ] = useState(Camera.Constants.FlashMode.off)
  const [ loading, setLoading ] = useState(false)
  const getPlace = async (data, image) => {
    // setLoading(true)
    // const token = JSON.parse(await AsyncStorage.getItem('token'));
    // const language = await AsyncStorage.getItem('language');
    // axios.post(`${REACT_NATIVE_BASE_URL}/${language}/FindingPlace`, data, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //     Authorization: `Bearer ${token}`,
    //   },
    // }).then(response => {          
    //   const result = response.data.result
    //   let data = {}
    //   if(result.length > 1) {
    //     data = {
    //       suggest: result,
    //       image: image,
    //       name: result[0].type
    //     }
    //   } else {
    //     data = {
    //       id: result[0].TID,
    //       name: result[0].name,
    //       latitude: result[0].latitude,
    //       longitude: result[0].longitude,
    //       location_string: result[0].location_string,
    //       image: image,
    //       address: result[0].address,
    //       description: result[0].description,
    //       story: result[0].story,
    //       type: result[0].type,
    //       likes: result[0].likes,
    //       isStorage: result[0].Stored
    //     }
    //   }
    //   navigation.navigate("Details", { data, scan: true })
    //   setLoading(false)
    // }).catch(error => {
    //   console.log(error);
    // });  
    // let myModel = ort.InferenceSession;
    // const modelPath = '../model/best.onnx'
    const path = require('../assets/best.onnx')
    const assets = await Asset.loadAsync(path);
    const modelUri = assets[0].localUri;
    console.log("modelUri", modelUri)
    let myModel = await InferenceSession.create(modelUri);
    console.log("myModel", myModel)
    // console.log(modelUri)
    // const inputData = new Float32Array(28 * 28);
    // const feeds = {};
    // feeds[myModel.inputNames[0]] = new ort.Tensor(inputData, [1, 28, 28]);
    // console.log(feeds)
    // const fetches = await myModel.run(feeds);
    // const output = fetches[myModel.outputNames[0]];
    // if (!output) {
    //   Alert.alert('failed to get output', `${myModel.outputNames[0]}`);
    // } else {
    //   Alert.alert(
    //     'model inference successfully',
    //     `output shape: ${output.dims}, output data: ${output.data}`);
    // }
    // // const session = await InferenceSession.create(modelPath);
    
    // const result = session.run(image, ['num_detection:0', 'detection_classes:0'])
    // console.log(result)
  }
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [5, 6],
      quality: 1,
    });    
    if (!result.canceled) {
      const data = new FormData();
      data.append('file', {
        uri: result.assets[0].uri,
        type: 'image/jpeg',
        name: 'photo.jpg',
      });
      setImage(result.assets[0].uri);
      getPlace(data, result.assets[0].uri) //Add
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
    const backAction = () => {
      navigation.navigate("Discover");
      return true; // Trả về true để ngăn không thoát khỏi ứng dụng
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, []);

  if (hasCameraPermission === undefined) {
    return (
      <SafeAreaView className="flex-1 bg-theme"><Loading /></SafeAreaView>
    )
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
    
    const data = new FormData();
    data.append('file', {
      uri: newPhoto.uri,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });
    setPhoto(newPhoto); 
    getPlace(data, "data:image/jpg;base64," + newPhoto.base64) //add
  };

  if (loading) return <SafeAreaView className="flex-1 bg-theme"><Loading /></SafeAreaView>
  return (
    <SafeAreaView className="flex-1" style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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
              className="w-10 h-10"
              onPress={pickImage}
            >
              <Image 
                className="h-full w-full"
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

    </SafeAreaView>
  );
}