import { View, Text, StyleSheet, ScrollView, TouchableOpacity  } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import NavigationBack from '../components/NavigationBack'
import { REACT_NATIVE_BASE_URL } from '../../contains'

const Report = ({ navigation }) => {
  const [ userInfo, setUserInfo ] = useState()
  useEffect(() => {
    const getUserInfo = async () => {
      const token = JSON.parse(await AsyncStorage.getItem('token'));
      axios.get(`${REACT_NATIVE_BASE_URL}/Admin/UserInfo`)
      .then(response => {
          setUserInfo(response.data.data)
      }).catch(error => {
          console.log(error);
      });
    }
    getUserInfo()
  },[])
  const handleDeleteUser = (id) => {
    axios.delete(`${REACT_NATIVE_BASE_URL}/Admin/UserInfo/${id}`)
      .then(response => {
        setUserInfo(response.data.data)
      }).catch(error => {
          console.log(error);
      });
  }
  console.log(userInfo)
  return (
    <ScrollView>
      <View className="flex-1 flex-col justify-center items-center pt-8 px-4">
        <NavigationBack navigation={navigation} to='AdminHome'/>
        <Text className="text-xl text-bold-txt font-bold">Quản lý người dùng</Text>
        <View style={styles.table} className="w-full"> 
          <View style={styles.row}>
            <Text style={styles.cell} className="text-bold-txt font-bold text-center">id</Text>
            <Text style={styles.cell} className="text-bold-txt font-bold text-center">gmail</Text>
            <Text style={styles.cell} className="text-bold-txt font-bold text-center">username</Text>
            <Text style={styles.cell} className="text-bold-txt font-bold text-center">password</Text>
            <Text style={styles.cell} className="text-bold-txt font-bold text-center">Delete</Text>
          </View>
          {userInfo?.map((value, index) => (
            <View style={styles.row} key={index}>
              <Text style={styles.cell}>{value[0]}</Text>
              <Text style={styles.cell}>{value[1]}</Text>
              <Text style={styles.cell}>{value[2]}</Text>
              <Text style={styles.cell}>{value[3]}</Text>
              <View style={styles.cell}>
                <TouchableOpacity onPress={() => handleDeleteUser(value[0])}  className="bg-red-600 rounded-md p-1">
                    <Text className="text-white">Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  table: {
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
  },
});
export default Report