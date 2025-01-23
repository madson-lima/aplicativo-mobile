import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Animated,
  Image,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles/editProfileStyles";
import { useColorTheme } from "../context/ColorContext";
import MaskInput, { Masks } from "react-native-mask-input";

const EditProfileScreen = ({ navigation }) => {
  const { colors } = useColorTheme();
  const profileImageScale = useState(new Animated.Value(1))[0];

  // Inicializa os dados do perfil com valores padrão
  const [profileData, setProfileData] = useState({
    name: "",
    username: "",
    bio: "",
    birthdate: "",
    email: "",
    phone: "",
    rg: "",
    cpf: "",
    address: {
      cep: "",
      street: "",
      number: "",
      neighborhood: "",
      city: "",
    },
    profileImage: null,
  });

  const maxLength = 120;

  // Carrega os dados do AsyncStorage, se existirem
  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const storedProfileData = await AsyncStorage.getItem("profileData");
        if (storedProfileData) {
          setProfileData(JSON.parse(storedProfileData));
        }
      } catch (error) {
        console.error("Erro ao carregar os dados do perfil:", error);
      }
    };
    loadProfileData();
  }, []);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setProfileData((prev) => ({
          ...prev,
          profileImage: result.assets[0].uri,
        }));
        animateImage();
      }
    } catch (error) {
      console.error("Erro ao selecionar a imagem:", error);
      Alert.alert("Erro", "Ocorreu um erro ao selecionar a imagem.");
    }
  };

  const animateImage = () => {
    Animated.sequence([
      Animated.timing(profileImageScale, {
        toValue: 1.1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(profileImageScale, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const validateFields = () => {
    const {
      name,
      username,
      bio,
      birthdate,
      email,
      phone,
      rg,
      cpf,
      address: { cep, street, number, neighborhood, city },
    } = profileData;

    if (
      !name ||
      !username ||
      !bio ||
      !birthdate ||
      !email ||
      !phone ||
      !rg ||
      !cpf ||
      !cep ||
      !street ||
      !number ||
      !neighborhood ||
      !city
    ) {
      Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios.");
      return false;
    }
    return true;
  };

  const handleSaveProfile = async () => {
    if (!validateFields()) return;

    try {
      await AsyncStorage.setItem("profileData", JSON.stringify(profileData));
      Alert.alert("Sucesso", "Perfil salvo com sucesso!");

      // Navega para a tela de Perfil após salvar
      navigation.navigate("ProfileScreen");
    } catch (error) {
      console.error("Erro ao salvar os dados do perfil:", error);
      Alert.alert("Erro", "Não foi possível salvar os dados do perfil.");
    }
  };

  const handleClearFields = () => {
    setProfileData({
      name: "",
      username: "",
      bio: "",
      birthdate: "",
      email: "",
      phone: "",
      rg: "",
      cpf: "",
      address: {
        cep: "",
        street: "",
        number: "",
        neighborhood: "",
        city: "",
      },
      profileImage: null,
    });
    Alert.alert("Campos Limpos", "Todos os campos foram limpos!");
  };

  return (
    <View
      style={[styles.fullContainer, { backgroundColor: colors.background }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View
          style={[styles.container, { backgroundColor: colors.background }]}
        >
          <Text style={[styles.title, { color: colors.text }]}>
            EDITAR PERFIL
          </Text>

          {/* Mostra a imagem selecionada */}
          <View style={styles.photoContainer}>
            {profileData.profileImage ? (
              <Animated.Image
                source={{ uri: profileData.profileImage }}
                style={[
                  styles.profileImage,
                  { transform: [{ scale: profileImageScale }] },
                ]}
              />
            ) : (
              <View style={styles.placeholderImage}>
                <Feather name="user" size={50} color="#ccc" />
              </View>
            )}
            <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
              <Feather name="camera" size={30} color={colors.icon} />
            </TouchableOpacity>
            <Text style={[styles.uploadText, { color: colors.text }]}>
              Carregar Foto
            </Text>
          </View>

          {/* Formulário de Edição */}
          <TextInput
            style={[
              styles.input,
              { color: colors.text, borderColor: colors.border },
            ]}
            placeholder="Digite seu nome"
            placeholderTextColor={colors.placeholder}
            value={profileData.name}
            onChangeText={(text) =>
              setProfileData({ ...profileData, name: text })
            }
          />
          <TextInput
            style={[
              styles.input,
              { color: colors.text, borderColor: colors.border },
            ]}
            placeholder="Digite o nome de usuário"
            placeholderTextColor={colors.placeholder}
            value={profileData.username}
            onChangeText={(text) =>
              setProfileData({ ...profileData, username: text })
            }
          />
          <TextInput
            style={[
              styles.input,
              { color: colors.text, borderColor: colors.border },
            ]}
            placeholder="Escreva sobre você"
            placeholderTextColor={colors.placeholder}
            value={profileData.bio}
            onChangeText={(text) =>
              setProfileData({ ...profileData, bio: text })
            }
            multiline
          />
          <MaskInput
            style={[
              styles.input,
              { color: colors.text, borderColor: colors.border },
            ]}
            placeholder="Data de Nascimento (DD/MM/AAAA)"
            placeholderTextColor={colors.placeholder}
            value={profileData.birthdate}
            onChangeText={(text) =>
              setProfileData({ ...profileData, birthdate: text })
            }
            mask={Masks.DATE_DDMMYYYY}
            keyboardType="numeric"
          />
          <TextInput
            style={[
              styles.input,
              { color: colors.text, borderColor: colors.border },
            ]}
            placeholder="Digite seu e-mail"
            placeholderTextColor={colors.placeholder}
            value={profileData.email}
            onChangeText={(text) =>
              setProfileData({ ...profileData, email: text })
            }
            keyboardType="email-address"
          />
          <MaskInput
            style={[
              styles.input,
              { color: colors.text, borderColor: colors.border },
            ]}
            placeholder="Digite seu telefone (WhatsApp)"
            placeholderTextColor={colors.placeholder}
            value={profileData.phone}
            onChangeText={(text) =>
              setProfileData({ ...profileData, phone: text })
            }
            mask={Masks.BRL_PHONE}
            keyboardType="phone-pad"
          />
          <MaskInput
            style={[
              styles.input,
              { color: colors.text, borderColor: colors.border },
            ]}
            placeholder="Digite seu RG"
            placeholderTextColor={colors.placeholder}
            value={profileData.rg}
            onChangeText={(text) =>
              setProfileData({ ...profileData, rg: text })
            }
            mask={[
              /\d/,
              /\d/,
              ".",
              /\d/,
              /\d/,
              /\d/,
              ".",
              /\d/,
              /\d/,
              /\d/,
              "-",
              /\d/,
            ]}
            keyboardType="numeric"
          />
          <MaskInput
            style={[
              styles.input,
              { color: colors.text, borderColor: colors.border },
            ]}
            placeholder="Digite seu CPF"
            placeholderTextColor={colors.placeholder}
            value={profileData.cpf}
            onChangeText={(text) =>
              setProfileData({ ...profileData, cpf: text })
            }
            mask={Masks.BRL_CPF}
            keyboardType="numeric"
          />
          {/* Campos de Endereço */}
          <TextInput
            style={[
              styles.input,
              { color: colors.text, borderColor: colors.border },
            ]}
            placeholder="CEP"
            placeholderTextColor={colors.placeholder}
            value={profileData.address.cep}
            onChangeText={(text) =>
              setProfileData((prev) => ({
                ...prev,
                address: { ...prev.address, cep: text },
              }))
            }
          />
          <TextInput
            style={[
              styles.input,
              { color: colors.text, borderColor: colors.border },
            ]}
            placeholder="Rua"
            placeholderTextColor={colors.placeholder}
            value={profileData.address.street}
            onChangeText={(text) =>
              setProfileData((prev) => ({
                ...prev,
                address: { ...prev.address, street: text },
              }))
            }
          />
          <TextInput
            style={[
              styles.input,
              { color: colors.text, borderColor: colors.border },
            ]}
            placeholder="Número"
            placeholderTextColor={colors.placeholder}
            value={profileData.address.number}
            onChangeText={(text) =>
              setProfileData((prev) => ({
                ...prev,
                address: { ...prev.address, number: text },
              }))
            }
          />
          <TextInput
            style={[
              styles.input,
              { color: colors.text, borderColor: colors.border },
            ]}
            placeholder="Bairro"
            placeholderTextColor={colors.placeholder}
            value={profileData.address.neighborhood}
            onChangeText={(text) =>
              setProfileData((prev) => ({
                ...prev,
                address: { ...prev.address, neighborhood: text },
              }))
            }
          />
          <TextInput
            style={[
              styles.input,
              { color: colors.text, borderColor: colors.border },
            ]}
            placeholder="Cidade"
            placeholderTextColor={colors.placeholder}
            value={profileData.address.city}
            onChangeText={(text) =>
              setProfileData((prev) => ({
                ...prev,
                address: { ...prev.address, city: text },
              }))
            }
          />
          {/* Botões de Salvar e Limpar */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.saveButton,
                { backgroundColor: colors.buttonBackground },
              ]}
              onPress={handleSaveProfile}
            >
              <Text style={[styles.buttonText, { color: colors.buttonText }]}>
                SALVAR PERFIL
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.clearButton,
                { backgroundColor: colors.buttonBackground },
              ]}
              onPress={handleClearFields}
            >
              <Text style={[styles.buttonText, { color: colors.buttonText }]}>
                LIMPAR CAMPOS
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProfileScreen;
