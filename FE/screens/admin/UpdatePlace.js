import { View, Text, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { REACT_NATIVE_BASE_URL } from '../../contains';

const UpdatePlace = () => {
  const [ places, setPlaces ] = useState()
  useEffect(() => {
    const getUserInfo = async () => {
      const token = JSON.parse(await AsyncStorage.getItem('token'));
      axios.post(`${REACT_NATIVE_BASE_URL}/Admin/UserInfo`,
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
    </View>
  );
}

export default UpdatePlace