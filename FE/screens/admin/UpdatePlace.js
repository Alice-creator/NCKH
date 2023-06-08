import { View, Text, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';

const UpdatePlace = () => {
  const [ places, setPlaces ] = useState()
  useEffect(() => {
    const getUserInfo = async () => {
      const token = JSON.parse(await AsyncStorage.getItem('token'));
      axios.post(`http://192.168.1.7:5000/Admin/UserInfo`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
      )
      .then(response => {
          console.log(response.data)
      }).catch(error => {
          console.log(error);
      });
    }
    getUserInfo()
  },[])
  return (
    <View>
      <Text>Edit place</Text>
      <Text>{t('welcome')}</Text>
      <Text>{t('hello')}</Text>
      <Text>{t('goodbye')}</Text>
      <Button title="Hihi" onPress={toggleLanguage} />
    </View>
  );
}

export default UpdatePlace