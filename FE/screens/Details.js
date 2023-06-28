import { SafeAreaView, Animated, Dimensions, View } from 'react-native'
import React from 'react'
import Detail from './components/Detail';
import Panorama from './components/Panorama';
const { width } = Dimensions.get('window');

const Details = ({ route, navigation }) => {
  const animatedX = React.useRef(new Animated.Value(0)).current;
    const { data, scan } = route.params;
    const handleScroll = Animated.event(
      [{ nativeEvent: { contentOffset: { x: animatedX } } }],
      { useNativeDriver: true }
    );
    return (
    <SafeAreaView className="bg-theme flex-1">
        <Detail data={data} scan={scan} navigation={navigation} />
    </SafeAreaView>
  )
}

export default Details