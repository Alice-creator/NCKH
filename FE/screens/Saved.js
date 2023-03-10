import React, { useState, useEffect } from 'react';
import { Button, Text, View, Platform, SafeAreaView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function Saved() {
  

  return (
    <SafeAreaView className="flex-1 items-center">
      <View>
        <Text className="text-bold-txt font-bold text-xl tracking-wider">Saved Items</Text>
      </View>
      <View className="flex-1 justify-center items-center">
        <Text className="text-bold-txt font-bold text-xl tracking-wider">You have no Saved Items</Text>
      </View>
    </SafeAreaView>
  );
}