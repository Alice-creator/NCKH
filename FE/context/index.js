import React, { createContext, useState } from 'react';

// Tạo một context mới
const MyContext = createContext();

// Tạo một custom hook để sử dụng State trong context

const MyContextProvider = ({ children }) => {
  // Khởi tạo State trong context
  const [ user, setUser ] = useState();
  const [ language, setLanguage ] = useState('en')
  const  [modalVisible, setModalVisible ] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  return (
    <MyContext.Provider value={{ user, setUser, modalVisible, setModalVisible, closeModal, openModal, language, setLanguage }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContextProvider, MyContext };
