import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import NavigationBack from './components/NavigationBack'
import { useTranslation } from 'react-i18next'

const ChangePassword = ({ navigation }) => {
  const { t } = useTranslation()
  return (
    <SafeAreaView className="flex-1 bg-theme">
      <NavigationBack navigation={navigation} to='Profile'/>
      <View className="my-6">
        <Text className="text-bold-txt font-bold text-center text-xl tracking-wider">{t('changePassword.title')}</Text>
      </View>
      <View className="mx-4">
        <Text className="text-base font-semibold mt-1">{t('changePassword.oldPass')}</Text>
        <TextInput 
          placeholder={t('changePassword.oldPass')}
          className="border-[1px] px-2 py-1 rounded-lg"
        />
        <Text className="text-base mt-1 font-semibold">{t('changePassword.newPass')}</Text>
        <TextInput 
          placeholder={t('changePassword.newPass')}
          className="border-[1px] px-2 py-1 rounded-lg"
        />
        <TouchableOpacity
          className="bg-primary w-full mt-4 py-2 rounded-lg"
        >
          <Text className="text-white text-base font-semibold text-center">{t('button.submit')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default ChangePassword