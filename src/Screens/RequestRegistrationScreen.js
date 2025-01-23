import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from '../styles/requestRegistrationStyles';
import { useColorTheme } from '../context/ColorContext';

const RequestRegistrationScreen = ({ navigation }) => {
  const [location, setLocation] = useState('');
  const [number, setNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [error, setError] = useState('');
  const { colors } = useColorTheme();
  const scrollViewRef = useRef(null);

  const isValidPhoneNumber = (phone) => {
    const phoneRegex = /^\+?55\s?\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
    return phoneRegex.test(phone);
  };

  // Função para manipular o envio de dados (simulação sem backend ou Firebase)
  const handleSubmit = () => {
    if (!location || !number || !neighborhood || !whatsapp) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      scrollToError();
      return;
    }

    if (!isValidPhoneNumber(whatsapp)) {
      setError('Por favor, insira um número de telefone válido no formato +55 (XX) XXXXX-XXXX.');
      scrollToError();
      return;
    }

    // Simulação de sucesso no envio
    Alert.alert('Sucesso', 'Informações registradas com sucesso!');
    navigation.navigate('SelectService');
  };

  const scrollToError = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  };

  const clearFields = () => {
    setLocation('');
    setNumber('');
    setNeighborhood('');
    setWhatsapp('');
    setError('');
  };

  return (
    <ScrollView ref={scrollViewRef} contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>CADASTRAR SOLICITAÇÃO</Text>

      <Text style={[styles.sectionTitle, { color: colors.text }]}>ENDEREÇO DO LOCAL</Text>
      <Text style={[styles.label, { color: colors.text }]}>Logradouro ou ponto de referência</Text>
      <View style={styles.inputContainer}>
        <MaterialIcons name="place" size={20} color={colors.icon} style={styles.icon} />
        <TextInput
          style={[
            styles.input,
            { backgroundColor: colors.inputBackground, color: colors.text },
            error && !location ? { borderColor: colors.error, borderWidth: 1 } : null,
          ]}
          placeholder="*Digite o nome da Av., Bairro ou Estrada"
          value={location}
          onChangeText={(text) => {
            setLocation(text);
            setError('');
          }}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            { backgroundColor: colors.inputBackground, color: colors.text },
            error && !number ? { borderColor: colors.error, borderWidth: 1 } : null,
          ]}
          placeholder="*Digite o Nº"
          value={number}
          onChangeText={(text) => {
            setNumber(text);
            setError('');
          }}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            { backgroundColor: colors.inputBackground, color: colors.text },
            error && !neighborhood ? { borderColor: colors.error, borderWidth: 1 } : null,
          ]}
          placeholder="*Digite o Bairro"
          value={neighborhood}
          onChangeText={(text) => {
            setNeighborhood(text);
            setError('');
          }}
        />
      </View>

      <Text style={[styles.sectionTitle, { color: colors.text }]}>CONTATO WHATSAPP</Text>
      <View style={styles.inputContainer}>
        <FontAwesome name="whatsapp" size={20} color={colors.icon} style={styles.icon} />
        <TextInput
          style={[
            styles.input,
            { backgroundColor: colors.inputBackground, color: colors.text },
            error && !isValidPhoneNumber(whatsapp) ? { borderColor: colors.error, borderWidth: 1 } : null,
          ]}
          placeholder="+55 (XX) XXXXX-XXXX"
          value={whatsapp}
          onChangeText={(text) => {
            setWhatsapp(text);
            setError('');
          }}
          keyboardType="phone-pad"
        />
      </View>

      {error ? <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text> : null}

      <TouchableOpacity style={[styles.button, { backgroundColor: colors.buttonBackground }]} onPress={handleSubmit} activeOpacity={0.8}>
        <Text style={[styles.buttonText, { color: colors.buttonText }]}>PRÓXIMA</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.clearButton, { backgroundColor: colors.clearButtonBackground }]} onPress={clearFields} activeOpacity={0.8}>
        <Text style={[styles.buttonText, { color: colors.clearButtonText }]}>LIMPAR</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default RequestRegistrationScreen;
