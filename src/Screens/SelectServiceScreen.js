import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, Alert } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import selectServiceStyles from '../styles/selectServiceStyles';
import { useColorTheme } from '../context/ColorContext';

const SelectServiceScreen = ({ navigation }) => {
  const [expandedService, setExpandedService] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const { colors } = useColorTheme();
  const styles = selectServiceStyles(colors);

  const toggleServiceOptions = (service) => {
    setExpandedService(expandedService === service ? null : service);
  };

  const toggleOption = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleNext = () => {
    if (selectedOptions.length > 0) {
      navigation.navigate('ProblemDetailsScreen', { selectedProblems: selectedOptions });
    } else {
      Alert.alert('Seleção Necessária', 'Por favor, selecione pelo menos um serviço para continuar.');
    }
  };

  const clearSelections = () => {
    setSelectedOptions([]);
    Alert.alert('Limpar Seleções', 'Todas as seleções foram removidas.');
  };

  const renderOptions = (options) =>
    options.map((option) => (
      <Pressable key={option.value} style={styles.optionButton} onPress={() => toggleOption(option.value)}>
        <Text style={[styles.optionText, selectedOptions.includes(option.value) && styles.selectedOptionText]}>
          {option.label}
        </Text>
      </Pressable>
    ));

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>SELECIONE O SERVIÇO</Text>
        <Text style={styles.description}>
          Escolha o serviço que deseja solicitar. Selecione as opções relevantes para sua necessidade e clique em "Próxima".
        </Text>
      </View>

      <View style={styles.serviceContainer}>
        <Pressable style={styles.serviceButton} onPress={() => toggleServiceOptions('arvores')}>
          <MaterialIcons name="park" size={24} color={colors.icon} />
          <Text style={styles.serviceText}>Problemas com Árvores e Vegetação</Text>
        </Pressable>
        {expandedService === 'arvores' &&
          renderOptions([
            { label: 'Árvore caída na via', value: 'ArvoreCaida' },
            { label: 'Árvore com galhos baixos ou podres', value: 'GalhosBaixos' },
            { label: 'Interferência de raízes na calçada ou via', value: 'RaizesCalcada' },
            { label: 'Invasão de vegetação na via', value: 'VegetacaoVia' },
          ])}

        <Pressable style={styles.serviceButton} onPress={() => toggleServiceOptions('pavimentacao')}>
          <MaterialCommunityIcons name="road" size={24} color={colors.icon} />
          <Text style={styles.serviceText}>Problemas de Pavimentação e Estrutura</Text>
        </Pressable>
        {expandedService === 'pavimentacao' &&
          renderOptions([
            { label: 'Buraco na pavimentação', value: 'BuracoPavimentacao' },
            { label: 'Calçada quebrada', value: 'CalcadaQuebrada' },
          ])}

        <Pressable style={styles.serviceButton} onPress={() => toggleServiceOptions('sinalizacao')}>
          <MaterialIcons name="traffic" size={24} color={colors.icon} />
          <Text style={styles.serviceText}>Problemas com Sinalização e Equipamentos</Text>
        </Pressable>
        {expandedService === 'sinalizacao' &&
          renderOptions([
            { label: 'Semáforo com defeito', value: 'SemaforoDefeito' },
            { label: 'Placa de trânsito danificada', value: 'PlacaDanificada' },
          ])}

        <Pressable style={styles.serviceButton} onPress={() => toggleServiceOptions('servicosPublicos')}>
          <MaterialIcons name="plumbing" size={24} color={colors.icon} />
          <Text style={styles.serviceText}>Problemas com Serviços Públicos</Text>
        </Pressable>
        {expandedService === 'servicosPublicos' &&
          renderOptions([
            { label: 'Vazamento de água', value: 'VazamentoAgua' },
            { label: 'Problemas com iluminação pública', value: 'IluminacaoPublica' },
          ])}

        <Pressable style={styles.serviceButton} onPress={() => toggleServiceOptions('ambiental')}>
          <MaterialIcons name="eco" size={24} color={colors.icon} />
          <Text style={styles.serviceText}>Problemas Naturais e Ambientais</Text>
        </Pressable>
        {expandedService === 'ambiental' &&
          renderOptions([
            { label: 'Áreas de preservação invadidas', value: 'PreservacaoInvadida' },
            { label: 'Queimada em vegetação', value: 'QueimadaVegetacao' },
          ])}

        <Pressable style={styles.serviceButton} onPress={() => toggleServiceOptions('transito')}>
          <MaterialIcons name="directions-car" size={24} color={colors.icon} />
          <Text style={styles.serviceText}>Problemas com Trânsito e Mobilidade</Text>
        </Pressable>
        {expandedService === 'transito' &&
          renderOptions([
            { label: 'Falta de acessibilidade', value: 'FaltaAcessibilidade' },
            { label: 'Obstrução de calçadas', value: 'ObstrucaoCalcada' },
          ])}

        <Pressable style={styles.serviceButton} onPress={() => toggleServiceOptions('saude')}>
          <MaterialIcons name="medical-services" size={24} color={colors.icon} />
          <Text style={styles.serviceText}>Problemas de Saúde e Segurança</Text>
        </Pressable>
        {expandedService === 'saude' &&
          renderOptions([
            { label: 'Foco de mosquitos transmissores', value: 'FocoMosquitos' },
            { label: 'Áreas inseguras', value: 'AreasInseguras' },
          ])}
      </View>

      <View style={styles.buttonContainer}>
        <Pressable style={styles.clearButton} onPress={clearSelections}>
          <Text style={styles.clearButtonText}>LIMPAR SELEÇÕES</Text>
        </Pressable>

        <Pressable
          style={[
            styles.nextButton,
            selectedOptions.length > 0 ? { backgroundColor: colors.enabledButtonBackground } : { backgroundColor: colors.disabledButtonBackground },
          ]}
          onPress={handleNext}
          disabled={selectedOptions.length === 0}
        >
          <Text style={[styles.buttonText, selectedOptions.length > 0 ? { color: colors.enabledButtonText } : { color: colors.disabledButtonText }]}>
            PRÓXIMA
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default SelectServiceScreen;
