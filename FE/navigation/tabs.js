import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Discover from "../screens/Discover.js"
import Scan from '../screens/Scans.js'

import scan from "../assets/scan.png"
import home from "../assets/home.png"
import user from "../assets/user.png"
import tour from "../assets/tour.png"
import like from "../assets/like.png"
import Profile from '../screens/Profile.js'
import Saved from '../screens/Saved.js'
import Tours from '../screens/Tours.js'



const Tab = createBottomTabNavigator()

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View 
      style={state.index == 1 ? { flexDirection: 'row', justifyContent: 'space-around', alignContent: 'center', alignItems: 'center',
              height: 60, bottom: 15, right: 20, left: 20, position: 'absolute', backgroundColor: 'rgba(255, 255, 255, 255)' ,borderRadius: 13}
              : { display : 'none'}
            }>
      
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        let icon = ''
        if(label == 'Scan') {
          icon = scan
        } else if (label == 'Discover') {
          icon = home
        } else if (label == 'Saved') {
          icon = like
        } else if (label == 'Profile') {
          icon = user
        } else {
          icon = tour
        }
        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={label == 'Scan' ? { flexDirection: 'row',alignContent: 'center', bottom: 17, backgroundColor: "#fff", padding: 6, borderRadius: 100} : { flexDirection: 'row', alignContent: 'center', left: -10}  }
            key={index}
          >
            <View style={label == 'Scan' ? { padding: 15, backgroundColor: "#3F95EC", borderRadius: 100} : {}}>
              <Image source={icon} 
                    style={{
                        width: 26,
                        height: 26,
                        tintColor:  isFocused ? '#487dd0' : "#cbcbcd"
                    }}
              />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
const Tabs = () => {
  return (
    <Tab.Navigator tabBar={props => <MyTabBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Discover"
      >
        <Tab.Screen 
          name='Scan'
          component={Scan}
          options={{
              tabBarStyle: { display: 'none'}
          }}
        />
        <Tab.Screen name='Discover' component={Discover} options={{tabBarStyle: {display: "none"}}} />
        <Tab.Screen name='Tour' component={Tours} options={{tabBarStyle: {display: "none"}}} />

        <Tab.Screen name='Saved' component={Saved} options={{tabBarStyle: {display: "none"}}}/>
        <Tab.Screen name='Profile' component={Profile} />
      </Tab.Navigator>
  )
}

export default Tabs