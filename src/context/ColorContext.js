import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Paleta de cores sugerida
const suggestedPalette = {
  primary: '#F28A2E', // Laranja vibrante
  secondary: '#F2732E', // Laranja mais intenso
  accent: '#D94929', // Vermelho acentuado
  neutralDark: '#575352', // Cinza escuro
  neutralLight: '#D9D9D9', // Cinza claro
};

// Tema normal (claro e escuro)
const normalLightTheme = {
  background: '#ffffff',
  text: suggestedPalette.neutralDark,
  buttonBackground: suggestedPalette.primary,
  buttonText: '#ffffff',
  inputBackground: '#ffffff',
  placeholderText: suggestedPalette.neutralLight,
  border: suggestedPalette.neutralLight,
};
const normalDarkTheme = {
  background: '#1c1c1c',
  text: '#ffffff',
  buttonBackground: suggestedPalette.secondary,
  buttonText: '#ffffff',
  inputBackground: '#2C2C2C',
  placeholderText: '#777777',
  border: '#444444',
};

// Temas para diferentes tipos de daltonismo
const deuteranopiaLightTheme = {
  background: suggestedPalette.neutralLight,
  text: suggestedPalette.neutralDark,
  buttonBackground: suggestedPalette.primary,
  buttonText: '#000000',
  inputBackground: '#ffffff',
  placeholderText: '#777777',
  border: suggestedPalette.neutralLight,
};
const deuteranopiaDarkTheme = {
  background: '#2d2d2d',
  text: suggestedPalette.neutralLight,
  buttonBackground: suggestedPalette.secondary,
  buttonText: '#000000',
  inputBackground: '#2C2C2C',
  placeholderText: '#777777',
  border: '#444444',
};

const protanopiaLightTheme = {
  background: '#f4e8c7',
  text: '#4b3b3b',
  buttonBackground: suggestedPalette.accent,
  buttonText: '#000000',
  inputBackground: '#ffffff',
  placeholderText: '#777777',
  border: '#dddddd',
};
const protanopiaDarkTheme = {
  background: '#3c2c2c',
  text: '#f4e8c7',
  buttonBackground: suggestedPalette.secondary,
  buttonText: '#000000',
  inputBackground: '#2C2C2C',
  placeholderText: '#777777',
  border: '#444444',
};

const tritanopiaLightTheme = {
  background: '#e0f0ff',
  text: '#333b4b',
  buttonBackground: '#ffaf40',
  buttonText: '#000000',
  inputBackground: '#ffffff',
  placeholderText: '#777777',
  border: '#dddddd',
};
const tritanopiaDarkTheme = {
  background: '#1e2d3d',
  text: '#e0f0ff',
  buttonBackground: '#ffb366',
  buttonText: '#000000',
  inputBackground: '#2C2C2C',
  placeholderText: '#777777',
  border: '#444444',
};

// Criação do contexto
const ColorContext = createContext();

// Provedor do contexto de cores
export const ColorProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [colorblindFilter, setColorblindFilter] = useState(null); // Filtro de daltonismo selecionado

  // Carrega as preferências do AsyncStorage ao inicializar
  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const savedDarkMode = await AsyncStorage.getItem('darkMode');
        const savedFilter = await AsyncStorage.getItem('colorblindFilter');
        if (savedDarkMode !== null) setIsDarkMode(JSON.parse(savedDarkMode));
        if (savedFilter) setColorblindFilter(savedFilter);
      } catch (error) {
        console.error('Erro ao carregar preferências:', error);
      }
    };
    loadPreferences();
  }, []);

  // Alterna entre modo escuro e claro
  const toggleDarkMode = async () => {
    try {
      setIsDarkMode((prev) => {
        const newMode = !prev;
        AsyncStorage.setItem('darkMode', JSON.stringify(newMode));
        return newMode;
      });
    } catch (error) {
      console.error('Erro ao salvar modo escuro:', error);
    }
  };

  // Aplica o filtro de daltonismo e salva no AsyncStorage
const applyColorblindFilter = async (filter) => {
  try {
    if (filter !== null && filter !== undefined) {
      await AsyncStorage.setItem('colorblindFilter', filter);
    } else {
      await AsyncStorage.removeItem('colorblindFilter'); // Remove o item se o valor for nulo ou indefinido
    }
    setColorblindFilter(filter); // Atualiza o estado
  } catch (error) {
    console.error('Erro ao salvar filtro de daltonismo:', error);
  }
};


  // Escolhe o tema apropriado com base nos estados
  let colors;
  if (colorblindFilter === 'deuteranopia') {
    colors = isDarkMode ? deuteranopiaDarkTheme : deuteranopiaLightTheme;
  } else if (colorblindFilter === 'protanopia') {
    colors = isDarkMode ? protanopiaDarkTheme : protanopiaLightTheme;
  } else if (colorblindFilter === 'tritanopia') {
    colors = isDarkMode ? tritanopiaDarkTheme : tritanopiaLightTheme;
  } else {
    colors = isDarkMode ? normalDarkTheme : normalLightTheme;
  }

  return (
    <ColorContext.Provider
      value={{
        colors,
        toggleDarkMode,
        applyColorblindFilter,
        colorblindFilter,
        isDarkMode,
      }}
    >
      {children}
    </ColorContext.Provider>
  );
};

// Hook para acessar o contexto em qualquer componente
export const useColorTheme = () => useContext(ColorContext);
