import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import { useColorTheme } from '../context/ColorContext';

const CustomDrawer = ({ navigation }) => {
  const { colors, toggleColorblindMode, isColorblind } = useColorTheme();
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/100'); // Estado inicial para a imagem de perfil

  // Função para selecionar imagem
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos de permissão para acessar suas fotos.');
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
  };

  return (
    <View style={[styles.drawerContainer, { backgroundColor: colors.background }]}>
      {/* Cabeçalho do Perfil */}
      <View style={styles.profileContainer}>
        <TouchableOpacity style={styles.profileImageContainer} onPress={pickImage}>
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
          <View style={styles.cameraIconContainer}>
            <MaterialIcons name="camera-alt" size={20} color="#fff" />
          </View>
        </TouchableOpacity>
        <Text style={[styles.userName, { color: colors.text }]}>Nome do Aluno</Text>
        <Text style={[styles.userDetails, { color: colors.text }]}>Turma: 3º Ano</Text>
        <Text style={[styles.userDetails, { color: colors.text }]}>Curso: Informática</Text>
      </View>

      {/* Itens do Menu */}
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => navigation.navigate('RequestRegistration')}
      >
        <MaterialIcons name="post-add" size={24} color={colors.text} />
        <Text style={[styles.drawerLabel, { color: colors.text }]}>Solicitar Serviço</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => navigation.navigate('ProfileScreen')}
      >
        <MaterialIcons name="person" size={24} color={colors.text} />
        <Text style={[styles.drawerLabel, { color: colors.text }]}>Perfil</Text>
      </TouchableOpacity>

      {/* Alternar Daltonismo */}
      <TouchableOpacity style={styles.drawerItem} onPress={toggleColorblindMode}>
        <MaterialIcons name="visibility" size={24} color={colors.text} />
        <Text style={[styles.drawerLabel, { color: colors.text }]}>
          {isColorblind ? 'Desativar Daltonismo' : 'Ativar Daltonismo'}
        </Text>
      </TouchableOpacity>

      {/* Fechar Menu */}
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => navigation.closeDrawer()}
      >
        <MaterialIcons name="close" size={24} color={colors.text} />
        <Text style={[styles.drawerLabel, { color: colors.text }]}>Fechar Menu</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#007bff',
    borderRadius: 15,
    padding: 2,
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
});

export default CustomDrawer;
