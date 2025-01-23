import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import galleryStyles from '../styles/galleryStyles';
import { ImageContext } from '../context/ImageContext';
import { useColorTheme } from '../context/ColorContext';

const GalleryScreen = ({ navigation }) => {
  const { images, setImages } = useContext(ImageContext);
  const { colors } = useColorTheme();
  const styles = galleryStyles(colors); // Estilos dinâmicos baseados no tema
  const [isLoading, setIsLoading] = useState(true);

  // Carregar as imagens salvas no AsyncStorage quando a tela é aberta
  useEffect(() => {
    const loadGalleryImages = async () => {
      try {
        const savedGalleryImages = await AsyncStorage.getItem('galleryImages');
        if (savedGalleryImages) {
          setImages(JSON.parse(savedGalleryImages));
        }
      } catch (error) {
        console.error('Erro ao carregar imagens da galeria:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadGalleryImages();
  }, []);

  // Função para excluir uma imagem
  const handleDeleteImage = async (imageUri) => {
    Alert.alert(
      'Excluir imagem',
      'Tem certeza de que deseja excluir esta imagem?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          onPress: async () => {
            const updatedImages = images.filter((img) => img.uri !== imageUri);
            setImages(updatedImages);

            try {
              await AsyncStorage.setItem('galleryImages', JSON.stringify(updatedImages));
              Alert.alert('Imagem excluída com sucesso.');
            } catch (error) {
              console.error('Erro ao atualizar imagens no AsyncStorage:', error);
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  // Renderizar cada imagem na galeria
  const renderItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate('ImageView', { imageUri: item.uri })}
      >
        <Image source={{ uri: item.uri }} style={styles.image} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteImage(item.uri)}
      >
        <MaterialIcons name="delete" size={20} color={colors.deleteIcon} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GALERIA DE IMAGENS</Text>

      {isLoading ? (
        <ActivityIndicator size="large" color={colors.loadingIndicator} />
      ) : images.length > 0 ? (
        <FlatList
          data={images}
          renderItem={renderItem}
          keyExtractor={(item) => item.uri}
          numColumns={3}
          contentContainerStyle={styles.grid}
        />
      ) : (
        <Text style={styles.emptyText}>Nenhuma imagem disponível.</Text>
      )}

      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => navigation.navigate('Home')}
      >
        <MaterialIcons name="home" size={30} color={colors.buttonText} />
        <Text style={styles.homeButtonText}>Voltar ao Menu</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GalleryScreen;
