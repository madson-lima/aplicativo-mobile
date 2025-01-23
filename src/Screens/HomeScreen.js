import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  DrawerLayoutAndroid,
  Image,
  StyleSheet,
  Alert,
  Modal,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useColorTheme } from '../context/ColorContext';

const HomeScreen = ({ navigation }) => {
  const { colors, toggleColorblindMode, applyColorblindFilter, isColorblind } = useColorTheme();
  const drawer = useRef(null);
  const [profileImage, setProfileImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openDrawer = () => {
    if (drawer.current) {
      drawer.current.openDrawer();
    }
  };

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão necessária', 'Precisamos da permissão para acessar suas fotos.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Erro ao selecionar imagem:', error);
      Alert.alert('Erro', 'Não foi possível selecionar a imagem.');
    }
  };

  const openColorblindModal = () => {
    setIsModalVisible(true);
  };

  
  const drawerContent = () => (
    <View style={[styles.drawerContainer, { backgroundColor: colors.background }]}>
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={pickImage}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <MaterialIcons name="person" size={80} color={colors.text} />
          )}
        </TouchableOpacity>
        <Text style={[styles.userName, { color: colors.text }]}>Nome do Usuário</Text>
        <Text style={[styles.userDetails, { color: colors.text }]}>Cidade: Santana de Parnaíba</Text>
        <Text style={[styles.userDetails, { color: colors.text }]}>Bairro: Parque Santana 2</Text>
      </View>

      <TouchableOpacity style={styles.drawerItem} onPress={openColorblindModal}>
        <MaterialIcons name="visibility" size={24} color={colors.text} />
        <Text style={[styles.drawerLabel, { color: colors.text }]}>
          {isColorblind ? 'Alterar Filtro Daltonismo' : 'Ativar Daltonismo'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.drawerItem} onPress={() => drawer.current.closeDrawer()}>
        <MaterialIcons name="close" size={24} color={colors.text} />
        <Text style={[styles.drawerLabel, { color: colors.text }]}>Fechar Menu</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition="left"
      renderNavigationView={drawerContent}
    >
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <TouchableOpacity onPress={openDrawer} style={styles.menuButton}>
          <MaterialIcons name="menu" size={28} color={colors.text} />
        </TouchableOpacity>

        <Text style={[styles.title, { color: colors.text }]}>Menu Inicial</Text>
        <View style={styles.grid}>
          {/* Botões de navegação */}
          {[
            { name: 'RequestRegistration', label: 'Solicitar Serviço', icon: 'add-circle' },
            { name: 'EditProfile', label: 'Adicionar Perfil', icon: 'person-add' },
            { name: 'ContactScreen', label: 'Fale Conosco', icon: 'mail' },
            { name: 'GalleryScreen', label: 'Galeria', icon: 'photo' },
            { name: 'ProfileScreen', label: 'Perfil', icon: 'account-circle' },
            { name: 'ServicesScreen', label: 'Serviços', icon: 'build' },
            { name: 'FAQScreen', label: 'Dúvidas', icon: 'help-outline' },
            { name: 'MyRequests', label: 'Minhas Solicitações', icon: 'assignment' },
            { name: 'About', label: 'Sobre', icon: 'info' },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.gridItem}
              onPress={() => navigation.navigate(item.name)}
            >
              <MaterialIcons name={item.icon} size={40} color={colors.buttonBackground} />
              <Text style={[styles.gridText, { color: colors.text }]}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecione o Tipo de Daltonismo</Text>
            {['Deuteranopia', 'Protanopia', 'Tritanopia', 'Cores Padrão'].map((filter, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  applyColorblindFilter(filter === 'Cores Padrão' ? null : filter.toLowerCase());
                  setIsModalVisible(false);
                }}
              >
                <Text style={styles.modalOption}>{filter}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
              <Text style={styles.modalClose}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </DrawerLayoutAndroid>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  menuButton: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 50,
  },
  grid: {
    marginTop: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  gridItem: {
    alignItems: 'center',
    margin: 15,
    width: 100,
  },
  gridText: {
    marginTop: 10,
    textAlign: 'center',
  },
  drawerContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 15,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userDetails: {
    fontSize: 14,
    color: '#777',
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  drawerLabel: {
    fontSize: 16,
    marginLeft: 15,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semitransparente
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalOption: {
    fontSize: 16,
    color: '#007bff',
    paddingVertical: 10,
  },
  modalClose: {
    fontSize: 16,
    color: 'red',
    paddingVertical: 10,
    marginTop: 10,
  }
});

export default HomeScreen;
