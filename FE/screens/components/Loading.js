


import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const Loading = () => {
    return (
      <View style={styles.container} className="flex-1 w-full h-full">
        <ActivityIndicator size="large" color="#3F95EC" />
      </View>
    );
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loading;
