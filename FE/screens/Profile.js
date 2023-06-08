import { View, Text, Image, TouchableOpacity, Switch, Modal, Button, TextInput, SafeAreaView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import avatarIcon from "../assets/avatar.jpg"
import cameraIcon from "../assets/camera.png"
import arrow_next from "../assets/arrow_next.png"
import languageIcon from "../assets/language.png"
import darkmodeIcon from "../assets/darkmode.png"
import reportIcon from "../assets/report.png"
import arrow_back from "../assets/arrow_back.png"

import * as ImagePicker from 'expo-image-picker';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { MyContext } from '../context';
import { REACT_NATIVE_BASE_URL } from '../contains';
import LoginModal from './components/LoginModal';

const Profile = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const { user, setUser, setLanguage } = useContext(MyContext)

  const [isEnabled, setIsEnabled] = useState(false);
  const [isEnabledLanguage, setIsEnabledLanguage] = useState(false);

  const [ avatar, setAvatar ] = useState("")
  const [modalVisible, setModalVisible] = useState(false);
  const [ feedback, setFeedback ] = useState()

  useEffect( ()=>{
    const retrieveData = async () => {
      try {
        const value = JSON.parse(await AsyncStorage.getItem('user'));

        if (value !== null) {
          setUser({username :" Vy hihi", gmail: "hfdjhfsj"})
          setAvatar(value.avatar)
        }
      } catch (error) {
        console.log(error)
      }
    };
    retrieveData()
    const getLanguage = async () => {
      try {
        const value = await AsyncStorage.getItem('language');
        if (value !== null) {
          setLanguage(value)
          setIsEnabledLanguage(value == 'en' || value == null ? true : false)
        }
      } catch (error) {
        console.log(error)
      }
    };
    getLanguage()
  },[]);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const toggleLanguage = async () => {
    const newLanguage = i18n.language === 'en' ? 'vi' : 'en';
    setIsEnabledLanguage(previousState => !previousState)
    i18n.changeLanguage(newLanguage);
    setLanguage(newLanguage)
    await AsyncStorage.setItem('language', newLanguage);
  };
  const handleFeedback = async () => {
    const token = JSON.parse(await AsyncStorage.getItem('token'));
    axios.post(`${REACT_NATIVE_BASE_URL}/Account/feedback`, { feedback },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    )
    .then(response => {
        if(!response.status) {
          setModalVisible(true)
        }
    }).catch(error => {
        console.log(error);
    });
  }
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    const data = {...user, avatar: result.assets[0].uri }
    setAvatar(result.assets[0].uri)
    if (!result.canceled) {
      try {
        await AsyncStorage.setItem('user', JSON.stringify(data));
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleLogOut = async () => {
    await AsyncStorage.removeItem('user')
    .then(() => console.log('Item removed from local storage'))
    .catch(error => console.error('Error removing item from local storage:', error));
    await AsyncStorage.removeItem('token')
    .then(() => console.log('Item removed Token from local storage'))
    .catch(error => console.error('Error removing item from local storage:', error));
    await AsyncStorage.removeItem('language')
    .then(() => console.log('Item removed Language from local storage'))
    .catch(error => console.error('Error removing item from local storage:', error));
    setUser(null)
    navigation.navigate("Discover")
  }
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  return (
    <SafeAreaView className="bg-theme flex-1">
      <TouchableOpacity className="bg-theme rounded-full p-[10px] w-10 h-10 absolute top-6 left-4 z-20"
            onPress={() => navigation.navigate("Discover")}
      >
      <Image className="w-full h-full" source={arrow_back} />
      </TouchableOpacity>
      <View className="flex flex-col items-center flex-1 justify-between my-4">
        <View className="w-full px-8">
          <Text className="text-center font-bold text-[22px] text-bold-txt tracking-wider"> {t('profile.title')} </Text>
          <View className="flex items-center my-5">
            <TouchableOpacity 
              className="w-[70px] h-[70px] rounded-full bg-primary relative"
              onPress={pickImage}
            >
              <Image
                className="w-full h-full rounded-full object-cover"
                source={ avatar.length > 0 ? { uri: avatar } : avatarIcon }
              />
              <View className="w-6 h-6 rounded-full bg-theme absolute -bottom-1 -right-1">
                <Image 
                  className="w-full h-full rounded-full"
                  source={cameraIcon}
                />
              </View>
            </TouchableOpacity>
            <View className="text-center mt-1">
              <Text className="text-center text-bold-txt font-bold text-[20px]">{user ? user.username: 'Username'}</Text>
              <Text className="text-center italic text-basic text-base">{user ? user.gmail : 'abcdef@gmail.com'}</Text>
            </View>
          </View>
          <View className="bg-white w-full rounded-3xl px-5 py-4">
            <View className="py-1 my-1 flex-row justify-between border-b-[1px] border-slate-300">
              <Text className="font-bold text-base tracking-wide text-bold-txt">Email</Text>
              <Text className="text-basic">{user ? (user.gmail.length > 28 ? user.gmail.slice(0,28) + "..." : user.gmail) : 'abcdef@gmail.com'}</Text>
            </View>
            <TouchableOpacity className="py-1 my-1 flex-row justify-between border-b-[1px] border-slate-300"
                              onPress={() => navigation.navigate("Saved")}
            >
              <Text className="font-bold text-base tracking-wide text-bold-txt">{t('profile.storage')}</Text>
              <View className="flex-row items-center">                
                  <Image source={arrow_next} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="py-1 my-1 flex-row justify-between border-b-[1px] border-slate-300"
                              onPress={() => navigation.navigate("ChangePassword")}
            >
              <Text className="font-bold text-base tracking-wide text-bold-txt">{t('profile.password')}</Text>
              
              <View className="flex-row items-center">
              <Text className="text-basic">*********</Text>
                <View>
                  <Image source={arrow_next} />
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <Text className="text-bold-txt font-bold text-lg my-2">{t('profile.setting')}</Text>
            <View>
              <View className="flex-row justify-between">
                <View className="flex-row justify-center my-2 items-center">
                  <View className="rounded-xl bg-[#CBEDFD] mr-3 w-12 h-12 p-[10px]">
                    <Image 
                      className="w-full h-full"
                      source={languageIcon}
                    />
                  </View>
                  <Text className="text-bold-txt font-bold text-base tracking-wide">{t('profile.language')}</Text>
                  <Text className="text-bold-txt font-bold text-base tracking-wide">(en)</Text>
                </View>
                <View className="flex flex-row items-center justify-center h-16 w-24">
                  <Switch
                    className="h-full w-full"
                    trackColor={{false: '#EBEAED', true: '#81b0ff'}}
                    thumbColor={isEnabledLanguage ? '#f5dd4b' : '#fff'}
                    
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleLanguage}
                    value={isEnabledLanguage}
                  />
                </View>
              </View>
              <View className="flex-row justify-between">
                <View className="flex-row justify-center my-2 items-center">
                  <View className="rounded-xl bg-[#D5D3FB] mr-3 w-12 h-12 p-[10px]">
                    <Image 
                      className="w-full h-full"
                      source={darkmodeIcon}
                    />
                  </View>
                  <Text className="text-bold-txt font-bold text-base tracking-wide">{t('profile.darkMode')}</Text>
                </View>
                <View className="flex items-center justify-center h-16 w-24">
                  <Switch
                    className="h-full w-full"
                    trackColor={{false: '#EBEAED', true: '#81b0ff'}}
                    thumbColor={isEnabled ? '#f5dd4b' : '#fff'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
                </View>
              </View>

              <TouchableOpacity className="flex-row justify-between"
                onPress={openModal}
              >
                <View className="flex-row justify-center my-2 items-center">
                  <View className="rounded-xl bg-[#FCFFC4] mr-3 w-12 h-12 p-[10px]">
                    <Image 
                      className="w-full h-full"
                      source={reportIcon}
                    />
                  </View>
                  <Text className="text-bold-txt font-bold text-base tracking-wide">{t('profile.report')}</Text>
                </View>
                <View className="rounded-xl bg-[#EBEAED] w-12 h-12 p-[14px]">
                  <Image 
                    className="w-full h-full"
                    source={arrow_next}
                  />
                </View>
              </TouchableOpacity>
              {/* <View className="flex-row justify-between">
                <View className="flex-row justify-center my-2 items-center">
                  <View className="rounded-xl bg-[#FEE8EE] mr-3 w-12 h-12 p-[10px]">
                    <Image 
                      className="w-full h-full"
                      source={helpIcon}
                    />
                  </View>
                  <Text className="text-bold-txt font-bold text-base tracking-wide">{t('profile.help')}</Text>
                </View>
                <View className="rounded-xl bg-[#EBEAED] w-12 h-12 p-[14px]">
                  <Image 
                    className="w-full h-full"
                    source={arrow_next}
                  />
                </View>
              </View> */}
            </View>
          </View>
        </View>
        <View className="w-full px-8">
          {user ? 
            <TouchableOpacity className="w-full py-3 border-[1px] border-slate-500 rounded-xl"
                onPress={handleLogOut}
            >
              <Text className="text-center text-slate-500 font-semibold text-lg">{t('logout')}</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity className="w-full py-3 border-[1px] border-slate-500 rounded-xl"
                onPress={() => navigation.navigate("Login")}
            >
              <Text className="text-center text-slate-500 font-semibold text-lg">{t('login')}</Text>
            </TouchableOpacity>
          }
        </View>
        <Modal visible={modalVisible} animationType="slide" onRequestClose={closeModal}
          transparent={true}    
        >
          <View className="flex-1 items-center justify-center px-10" style={{backgroundColor: 'rgba(0,0,0,0.3)'}}>
            <View className="bg-white rounded-xl py-3 px-5 w-full">
              <View className="flex-row justify-between items-center">
                <Text className="text-bold-txt font-bold text-xl tracking-wide">{t('profile.report')}</Text>
                <TouchableOpacity onPress={closeModal} ><Text className="font-bold text-bold-txt">X</Text></TouchableOpacity>
              </View>
              <Text className="text-base mt-1">{t('label.content')}</Text>
              <TextInput 
                placeholder={t('input.feedback')}
                className="border-[1px] px-2 py-1 rounded-lg"
                onChangeText={(e) => setFeedback(e)}
              />
              <TouchableOpacity
                onPress={handleFeedback}
                className="bg-primary w-full mt-4 py-2 rounded-lg"
              >
                <Text className="text-white text-base font-semibold text-center">{t('button.submit')}</Text>
              </TouchableOpacity>
            </View>
          </View>
          
        </Modal>
        <LoginModal isVisible={modalVisible} setModalVisible={setModalVisible}/>
      </View>
    </SafeAreaView>
  )
}

export default Profile