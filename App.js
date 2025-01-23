import 'react-native-gesture-handler'; // Deve ser a primeira importação para gestos
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet, View } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator'; // Configuração de navegação
import { ColorProvider } from './src/context/ColorContext'; // Contexto de temas de cor
import { ImageProvider } from './src/context/ImageContext'; // Contexto de imagens

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ColorProvider>
        <ImageProvider>
          <AppNavigator />
        </ImageProvider>
      </ColorProvider>
    </GestureHandlerRootView>
  );
};

export default App;
