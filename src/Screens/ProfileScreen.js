import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import profileStyles from "../styles/profileStyles";
import { useColorTheme } from "../context/ColorContext";

const MAX_IMAGES = 5; // Limite de imagens na galeria

const ProfileScreen = ({ navigation }) => {
  const { colors } = useColorTheme();
  const styles = profileStyles(colors);

  const [profileData, setProfileData] = useState({
    name: "Nome não definido",
    username: "Usuário não definido",
    bio: "Nenhuma biografia fornecida.",
    email: "Não fornecido",
    phone: "Não fornecido",
    address: {
      street: "",
      number: "",
      neighborhood: "",
      city: "",
    },
    images: [], // Garantir que imagens comece como um array vazio
    profileImage: null,
  });

  const [loading, setLoading] = useState(true);

  // Carrega os dados do perfil do AsyncStorage
  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const storedProfileData = await AsyncStorage.getItem("profileData");
        if (storedProfileData) {
          const parsedData = JSON.parse(storedProfileData);
          setProfileData((prev) => ({
            ...prev,
            ...parsedData,
            images: Array.isArray(parsedData.images) ? parsedData.images : [], // Garantir que imagens seja um array
          }));
        }
      } catch (error) {
        console.error("Erro ao carregar os dados do perfil:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProfileData();
  }, []);

  // Adiciona uma imagem à galeria
  const handleAddImage = async () => {
    if (profileData.images.length >= MAX_IMAGES) {
      Alert.alert(
        "Limite de Imagens",
        `Você só pode adicionar até ${MAX_IMAGES} imagens.`
      );
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const newImageUri = result.assets[0].uri;

        setProfileData((prev) => {
          const updatedImages = [...prev.images, newImageUri];
          const updatedProfileData = { ...prev, images: updatedImages };
          AsyncStorage.setItem(
            "profileData",
            JSON.stringify(updatedProfileData)
          );
          return updatedProfileData;
        });

        Alert.alert("Sucesso", "Imagem adicionada com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao adicionar imagem:", error);
      Alert.alert("Erro", "Ocorreu um erro ao adicionar a imagem.");
    }
  };

  // Remove uma imagem da galeria
  const handleRemoveImage = (index) => {
    Alert.alert(
      "Remover Imagem",
      "Você tem certeza que deseja remover esta imagem?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Remover",
          style: "destructive",
          onPress: () => {
            setProfileData((prev) => {
              const updatedImages = prev.images.filter((_, i) => i !== index);
              const updatedProfileData = { ...prev, images: updatedImages };
              AsyncStorage.setItem(
                "profileData",
                JSON.stringify(updatedProfileData)
              );
              return updatedProfileData;
            });
          },
        },
      ],
      { cancelable: true }
    );
  };

  if (loading) {
    return (
      <View style={[styles.scrollContainer, { justifyContent: "center" }]}>
        <ActivityIndicator size="large" color={colors.primary || "#000"} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Foto de Perfil */}
        <Image
          style={styles.profileImage}
          source={
            profileData.profileImage
              ? { uri: profileData.profileImage }
              : require("../../assets/profile-placeholder.png")
          }
        />
        <Text style={styles.headerText}>
          {profileData.name || "Nome não definido"}
        </Text>
        <Text style={styles.profileName}>
          {profileData.username || "Usuário não definido"}
        </Text>

        {/* Informações do Perfil */}
        <Text style={styles.sectionTitle}>BIOGRAFIA</Text>
        <Text style={styles.bioText}>
          {profileData.bio || "Nenhuma biografia fornecida."}
        </Text>

        <Text style={styles.sectionTitle}>ENDEREÇO</Text>
        <Text style={styles.bioText}>
          {profileData.address.street
            ? `${profileData.address.street}, ${profileData.address.number}, ${profileData.address.neighborhood}, ${profileData.address.city}`
            : "Endereço não definido"}
        </Text>

        <Text style={styles.sectionTitle}>CONTATO</Text>
        <Text style={styles.bioText}>
          Email: {profileData.email || "Não fornecido"}
        </Text>
        <Text style={styles.bioText}>
          Telefone: {profileData.phone || "Não fornecido"}
        </Text>

        {/* Botão de Editar Perfil */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.buttonBackground }]}
            onPress={() => navigation.navigate("EditProfile")}
          >
            <Text style={styles.buttonText}>Editar Perfil</Text>
          </TouchableOpacity>
        </View>

        {/* Galeria de Imagens */}
        <Text style={styles.sectionTitle}>Minhas Imagens</Text>
        <View style={styles.imageGallery}>
          {profileData.images.length > 0 ? (
            profileData.images.map((uri, index) => (
              <View key={index} style={styles.galleryItem}>
                <Image source={{ uri }} style={styles.galleryImage} />
                <TouchableOpacity
                  style={styles.removeImageButton}
                  onPress={() => handleRemoveImage(index)}
                >
                  <Text style={styles.removeImageButtonText}>X</Text>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text style={styles.noImagesText}>Nenhuma imagem disponível.</Text>
          )}
        </View>

        {/* Botão para Adicionar Imagem */}
        <TouchableOpacity
          style={[styles.addImageButton, { backgroundColor: colors.buttonBackground }]}
          onPress={handleAddImage}
        >
          <Text style={styles.addImageButtonText}>Adicionar Imagem</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
