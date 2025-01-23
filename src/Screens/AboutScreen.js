// src/Screens/AboutScreen.js
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from '../styles/aboutStyles'; // Importa o arquivo de estilo
import { useColorTheme } from '../context/ColorContext'; // Importa o contexto de cores

const AboutScreen = ({ navigation }) => {
  const { colors } = useColorTheme(); // Obtém as cores do contexto

  return (
    <ScrollView contentContainerStyle={[styles.scrollContainer, { backgroundColor: colors.background }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.title, { color: colors.text }]}>SOBRE</Text>
        <Text style={[styles.description, { color: colors.text }]}>
          O aplicativo "Meu Bairro" é uma plataforma digital que permite aos cidadãos reportar problemas urbanos e solicitar serviços públicos, como reparos de buracos, melhorias na iluminação e solução de vazamentos. Seu objetivo é facilitar a comunicação entre a comunidade e os órgãos públicos, promovendo uma gestão urbana mais eficiente e participativa, melhorando a qualidade de vida nos bairros.
        </Text>

        {/* Botão para voltar à Home */}
        <TouchableOpacity style={[styles.homeButton, { backgroundColor: colors.buttonBackground }]} onPress={() => navigation.navigate('Home')}>
          <MaterialIcons name="home" size={30} color={colors.buttonText} />
          <Text style={[styles.homeButtonText, { color: colors.buttonText }]}>Voltar ao Menu Inicial</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AboutScreen;
