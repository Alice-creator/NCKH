import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Modal, TextIn } from 'react-native';
import { useTranslation } from 'react-i18next';

const LoginModal = ({ isVisible, setModalVisible }) => {
    const { t } = useTranslation()
    const closeModal = () => {
      setModalVisible(false);
    };
  return (
    <Modal visible={isVisible} animationType="slide" onRequestClose={closeModal} onBackdropPress={closeModal}
        transparent={true}    
      >
       <View className="flex-1 items-center justify-center px-10" style={{backgroundColor: 'rgba(0,0,0,0.3)'}}>
          <View className="bg-white rounded-xl py-3 px-5 w-full">
            <View className="flex-row justify-between items-center">
              <Text className="text-yellow-500 font-bold text-xl tracking-wide text-center">{t('modal.requireLogin.title')}</Text>
              <TouchableOpacity onPress={closeModal} ><Text className="font-bold text-bold-txt">X</Text></TouchableOpacity>
            </View>
            <Text className="text-lg">{t('modal.requireLogin.content')}</Text>
            <TouchableOpacity
              className="bg-primary w-full mt-4 py-2 rounded-lg"
            >
              <Text className="text-white text-base font-semibold text-center">{t('modal.requireLogin.button')}</Text>
            </TouchableOpacity>
           
      </View>
      </View>
        
      </Modal>
  );
};

export default LoginModal;
