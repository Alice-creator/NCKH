import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomePage from './screens/HomePage.js';
import Details from './screens/Details.js';
import Tabs from './navigation/tabs';
import Login from './screens/Login.js';
import Signup from './screens/Signup.js';
import Maps from './screens/Maps.js';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
      >
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Tab" component={Tabs} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="Maps" component={Maps} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;