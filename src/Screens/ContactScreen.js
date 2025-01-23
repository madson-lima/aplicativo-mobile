// src/Screens/ContactScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Linking, ScrollView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/contactStyles'; // Estilos para a tela de contato
import { useColorTheme } from '../context/ColorContext'; // Importa o contexto de cores

const ContactScreen = ({ navigation }) => {
  const { colors } = useColorTheme(); // Obtém as cores do contexto

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSendEmail = () => {
    if (email.trim() === '' || message.trim() === '') {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    // Aqui você pode adicionar a lógica para enviar o e-mail
    alert('Mensagem enviada com sucesso!');
    setEmail('');
    setMessage('');
  };

  const handleWhatsApp = () => {
    const url = 'https://wa.me/?text=Olá, gostaria de entrar em contato com vocês.';
    Linking.openURL(url);
  };

  return (
    <ScrollView contentContainerStyle={[styles.scrollContainer, { backgroundColor: colors.background }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.title, { color: colors.text }]}>FALE CONOSCO</Text>
        <Text style={[styles.description, { color: colors.text }]}>
          Para entrar em contato conosco, por favor, preencha o formulário abaixo para enviar suas perguntas,
          comentários ou sugestões.
        </Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.text }]}
          placeholder="Digite seu e-mail."
          placeholderTextColor={colors.placeholder}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={[
            styles.input,
            styles.textArea,
            { backgroundColor: colors.inputBackground, color: colors.text }
          ]}
          placeholder="Digite sua mensagem."
          placeholderTextColor={colors.placeholder}
          multiline
          numberOfLines={4}
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity
          style={[styles.sendButton, { backgroundColor: colors.buttonBackground }]}
          onPress={handleSendEmail}
        >
          <Text style={[styles.sendButtonText, { color: colors.buttonText }]}>ENVIAR</Text>
        </TouchableOpacity>

        <Text style={[styles.whatsappText, { color: colors.text }]}>
          Ou envie sua mensagem por aqui
        </Text>
        <TouchableOpacity
          style={[styles.whatsappButton, { backgroundColor: colors.whatsappButton }]}
          onPress={handleWhatsApp}
        >
          <FontAwesome name="whatsapp" size={30} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ContactScreen;
