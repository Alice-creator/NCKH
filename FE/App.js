import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

import HomePage from './screens/HomePage.js';
import Details from './screens/Details.js';
import Tabs from './navigation/tabs';
import Login from './screens/Login.js';
import Signup from './screens/Signup.js';
import Maps from './screens/Maps.js';
import AdminHome from './screens/admin/Home.js'
import Report from './screens/admin/Report.js'
import AddPlace from './screens/admin/AddPlace.js'
import UpdatePlace from './screens/admin/UpdatePlace.js'
import './languages/i18n.js'
import {MyContextProvider} from './context/index.js';
import ChangePassword from './screens/ChangePassword.js';

const Stack = createNativeStackNavigator();
function App() {
  const { i18n } = useTranslation();
  React.useEffect(() => {

    const getLanguage = async () => {
      const newLanguage = await AsyncStorage.getItem('language');
      if (newLanguage) {
        i18n.changeLanguage(newLanguage);
      } else {
        i18n.changeLanguage('en');
      }
    };
    getLanguage()
  }, [])
  return (
    <MyContextProvider>
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
          <Stack.Screen name="ChangePassword" component={ChangePassword} />

          {/* Admin */}
          <Stack.Screen name="AdminHome" component={AdminHome} />
          <Stack.Screen name="AddPlace" component={AddPlace} />
          <Stack.Screen name="UpdatePlace" component={UpdatePlace} />

          <Stack.Screen name="Report" component={Report} />

        </Stack.Navigator>
      </NavigationContainer>
    </MyContextProvider>
  );
}

export default App;