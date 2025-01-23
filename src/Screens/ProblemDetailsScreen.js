import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  Platform,
  Linking,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorTheme } from '../context/ColorContext';
import problemDetailsStyles from '../styles/problemDetailsStyles';

const ProblemDetailsScreen = ({ navigation, route }) => {
  const { colors } = useColorTheme();
  const styles = problemDetailsStyles(colors);

  const { selectedProblems = [] } = route.params || {};
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState(null);
  const [tempImages, setTempImages] = useState([]);

  const handleGenerateLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão Negada', 'Precisamos da sua permissão para acessar a localização.');
      return;
    }
  
    try {
      const userLocation = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = userLocation.coords;
  
      // Salva a localização no estado
      setLocation({ latitude, longitude });
  
      // Gera a URL para o mapa
      const url = Platform.select({
        ios: `maps://app?saddr=${latitude},${longitude}`,
        android: `geo:${latitude},${longitude}?q=${latitude},${longitude}`,
        default: `https://www.google.com/maps?q=${latitude},${longitude}`,
      });
  
      // Abre o mapa automaticamente
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Erro', 'Não foi possível abrir o mapa.');
      }
    } catch (error) {
      Alert.alert('Erro ao obter localização', error.message);
    }
  };
  

  const handleAttachImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      const selectedImage = result.assets[0];
      setTempImages((prevImages) => [...prevImages, { uri: selectedImage.uri }]);
    }
  };

  const handleSend = async () => {
    if (description.trim() === '' || !location) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos antes de enviar.');
      return;
    }

    const newRequest = {
      id: Date.now().toString(),
      selectedProblems,
      description,
      location,
      images: tempImages,
      date: new Date().toLocaleDateString(),
      status: 'sent',
    };

    try {
      const storedRequests = await AsyncStorage.getItem('requests');
      const existingRequests = storedRequests ? JSON.parse(storedRequests) : [];
      const updatedRequests = [...existingRequests, newRequest];
      await AsyncStorage.setItem('requests', JSON.stringify(updatedRequests));

      const storedGalleryImages = await AsyncStorage.getItem('galleryImages');
      const existingGalleryImages = storedGalleryImages ? JSON.parse(storedGalleryImages) : [];
      const updatedGalleryImages = [...existingGalleryImages, ...tempImages];
      await AsyncStorage.setItem('galleryImages', JSON.stringify(updatedGalleryImages));

      setTempImages([]);
      setDescription('');
      setLocation(null);

      Alert.alert('Sucesso', 'Sua solicitação foi enviada com sucesso!');
      navigation.navigate('MyRequests');
    } catch (error) {
      console.error('Erro ao enviar solicitação:', error);
      Alert.alert('Erro', 'Não foi possível enviar a solicitação. Tente novamente.');
    }
  };

  return (
    <ScrollView
  style={[styles.container, { backgroundColor: colors.background }]}
  contentContainerStyle={{ paddingBottom: 20 }}
  keyboardShouldPersistTaps="handled"
>
  <View style={{ flex: 1 }}>
    <Text style={[styles.title, { color: colors.text }]}>PROBLEMAS SELECIONADOS</Text>
    <View style={styles.problemsContainer}>
      {selectedProblems.length > 0 ? (
        <Text style={[styles.problemsText, { color: colors.text }]}>
          {selectedProblems.map((problem, index) => (
            <Text key={index}>• {problem} {'\n'}</Text>
          ))}
        </Text>
      ) : (
        <Text style={[styles.problemsText, { color: colors.text }]}>Nenhum problema selecionado.</Text>
      )}
    </View>

    <Text style={[styles.subtitle, { color: colors.text }]}>DESCREVA O PROBLEMA</Text>
    <TextInput
      style={[styles.descriptionInput, { color: colors.text, backgroundColor: colors.inputBackground }]}
      multiline
      placeholder="Descreva o problema"
      placeholderTextColor={colors.placeholderText}
      value={description}
      onChangeText={setDescription}
    />

    <View style={styles.imagePreviewContainer}>
      {tempImages.map((image, index) => (
        <View key={index} style={styles.imageContainer}>
          <Image source={{ uri: image.uri }} style={styles.imagePreview} />
          <TouchableOpacity onPress={() => setTempImages((prev) => prev.filter((_, i) => i !== index))}>
            <FontAwesome name="trash" size={24} color="red" />
          </TouchableOpacity>
        </View>
      ))}
    </View>

    {location && (
      <View style={styles.locationPreview}>
        <Text style={[styles.locationText, { color: colors.text }]}>Localização Gerada:</Text>
        <Text style={[styles.locationText, { color: colors.text }]}>Latitude: {location.latitude}</Text>
        <Text style={[styles.locationText, { color: colors.text }]}>Longitude: {location.longitude}</Text>
      </View>
    )}

    <View style={styles.actionsContainer}>
      <TouchableOpacity style={styles.actionButton} onPress={handleAttachImage}>
        <FontAwesome name="camera" size={24} color={colors.icon} />
        <Text style={[styles.actionButtonText, { color: colors.text }]}>Anexar imagens</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton} onPress={handleGenerateLocation}>
        <MaterialIcons name="location-on" size={24} color={colors.icon} />
        <Text style={[styles.actionButtonText, { color: colors.text }]}>Gerar Geolocalização</Text>
      </TouchableOpacity>
    </View>

    <TouchableOpacity
      style={[styles.sendButton, { backgroundColor: colors.buttonBackground }]}
      onPress={handleSend}
    >
      <Text style={[styles.sendButtonText, { color: colors.buttonText }]}>ENVIAR</Text>
    </TouchableOpacity>
  </View>
</ScrollView>

  );
};

export default ProblemDetailsScreen;
