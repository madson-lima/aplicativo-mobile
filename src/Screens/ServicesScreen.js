import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import servicesStyles from '../styles/servicesStyles';
import { useColorTheme } from '../context/ColorContext';

const ServicesScreen = ({ navigation }) => {
  const { colors } = useColorTheme();
  const styles = servicesStyles(colors);

  const navigateToServiceDetails = (serviceType) => {
    navigation.navigate('ServiceDetails', { serviceType });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>SERVIÇOS</Text>
        <Text style={styles.description}>
          O Aplicativo Meu Bairro auxilia a comunidade fazendo a gestão das
          solicitações diretamente com a Administração Pública e Prestadores de
          Serviços Públicos para atuar em diversos serviços, incluindo:
        </Text>

        <View style={styles.serviceList}>
          <TouchableOpacity
            style={styles.serviceItem}
            onPress={() => navigateToServiceDetails('arvores')}
          >
            <MaterialIcons name="park" size={24} color="#4CAF50" />
            <Text style={styles.serviceText}>Problemas com Árvores e Vegetação</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.serviceItem}
            onPress={() => navigateToServiceDetails('pavimentacao')}
          >
            <MaterialCommunityIcons name="road-variant" size={24} color="#795548" />
            <Text style={styles.serviceText}>Problemas de Pavimentação e Estrutura</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.serviceItem}
            onPress={() => navigateToServiceDetails('sinalizacao')}
          >
            <MaterialIcons name="traffic" size={24} color="#FFC107" />
            <Text style={styles.serviceText}>Problemas com Sinalização e Equipamentos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.serviceItem}
            onPress={() => navigateToServiceDetails('servicosPublicos')}
          >
            <MaterialIcons name="plumbing" size={24} color="#FF9800" />
            <Text style={styles.serviceText}>Problemas com Serviços Públicos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.serviceItem}
            onPress={() => navigateToServiceDetails('naturaisAmbientais')}
          >
            <MaterialIcons name="eco" size={24} color="#4CAF50" />
            <Text style={styles.serviceText}>Problemas Naturais e Ambientais</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.serviceItem}
            onPress={() => navigateToServiceDetails('transito')}
          >
            <MaterialIcons name="commute" size={24} color="#FF5722" />
            <Text style={styles.serviceText}>Problemas com Trânsito e Mobilidade</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.serviceItem}
            onPress={() => navigateToServiceDetails('saudeSeguranca')}
          >
            <MaterialIcons name="medical-services" size={24} color="#E91E63" />
            <Text style={styles.serviceText}>Problemas de Saúde e Segurança</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.serviceItem}
            onPress={() => navigateToServiceDetails('outrosProblemas')}
          >
            <MaterialIcons name="help-outline" size={24} color="#FFEB3B" />
            <Text style={styles.serviceText}>Outros Problemas</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.navigate('Home')}
        >
          <MaterialIcons name="home" size={24} color={colors.buttonText} />
          <Text style={styles.homeButtonText}>Voltar ao Menu</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ServicesScreen;
