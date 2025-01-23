import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import myRequestsStyles from "../styles/myRequestsStyles"; // Importando os estilos
import { useColorTheme } from "../context/ColorContext";
import { Linking } from "react-native";

const MyRequestsScreen = ({ navigation }) => {
  const { colors } = useColorTheme();
  const styles = myRequestsStyles(colors); // Aplicação dinâmica do tema
  const [requests, setRequests] = useState([]);

  // Função para carregar as solicitações do AsyncStorage
  useEffect(() => {
    const loadRequests = async () => {
      try {
        const storedRequests = await AsyncStorage.getItem("requests");
        if (storedRequests) {
          setRequests(JSON.parse(storedRequests));
        }
      } catch (error) {
        console.error("Erro ao carregar solicitações:", error);
      }
    };

    const unsubscribe = navigation.addListener("focus", loadRequests);
    loadRequests();

    return unsubscribe;
  }, [navigation]);

  // Função para excluir uma solicitação
  const deleteRequest = async (id) => {
    Alert.alert(
      "Confirmar Exclusão",
      "Tem certeza de que deseja excluir esta solicitação?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          onPress: async () => {
            const updatedRequests = requests.filter(
              (request) => request.id !== id
            );
            setRequests(updatedRequests);

            try {
              await AsyncStorage.setItem(
                "requests",
                JSON.stringify(updatedRequests)
              );
              Alert.alert("Solicitação excluída com sucesso!");
            } catch (error) {
              console.error("Erro ao excluir solicitação:", error);
              Alert.alert("Erro", "Não foi possível excluir a solicitação.");
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  // Função para abrir o mapa com a localização fornecida
  const openMap = (location) => {
    if (!location) {
      Alert.alert(
        "Erro",
        "Nenhuma localização fornecida para esta solicitação."
      );
      return;
    }

    const { latitude, longitude } = location;
    const url = Platform.select({
      ios: `maps://app?saddr=${latitude},${longitude}`,
      android: `geo:${latitude},${longitude}?q=${latitude},${longitude}`,
      default: `https://www.google.com/maps?q=${latitude},${longitude}`,
    });

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert("Erro", "Não foi possível abrir o mapa.");
        }
      })
      .catch((error) => {
        console.error("Erro ao abrir o mapa:", error);
        Alert.alert("Erro", "Ocorreu um erro ao tentar abrir o mapa.");
      });
  };

  // Função para obter o rótulo do status
  const getRequestStatusLabel = (status) => {
    switch (status) {
      case "sent":
        return "Enviada";
      case "in_progress":
        return "Em andamento";
      case "completed":
        return "Concluída";
      default:
        return "Desconhecido";
    }
  };

  // Função para obter a cor do status
  const getStatusColor = (status) => {
    switch (status) {
      case "sent":
        return "orange";
      case "in_progress":
        return "blue";
      case "completed":
        return "green";
      default:
        return "gray";
    }
  };

  // Renderizar cada solicitação
  const renderItem = ({ item }) => (
    <View style={styles.requestCard}>
      <Text style={styles.requestTitle}>
        {item.selectedProblems.join(", ")}
      </Text>
      <Text style={styles.requestDescription}>{item.description}</Text>

      {item.images?.length > 0 && (
        <FlatList
          data={item.images}
          horizontal
          keyExtractor={(image, index) => index.toString()}
          renderItem={({ item: image }) => (
            <Image source={{ uri: image.uri }} style={styles.requestImage} />
          )}
        />
      )}

      {item.location && (
        <TouchableOpacity
          style={styles.mapButton}
          onPress={() => openMap(item.location)}
        >
          <Text style={styles.mapButtonText}>Abrir no mapa</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.requestDate}>Data: {item.date}</Text>
      <Text
        style={[
          styles.requestStatus,
          { color: getStatusColor(item.status) }, // Cor do status
        ]}
      >
        Status: {getRequestStatusLabel(item.status)}
      </Text>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteRequest(item.id)}
      >
        <MaterialIcons name="delete" size={20} color="red" />
        <Text style={styles.deleteButtonText}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Solicitações</Text>

      {requests.length === 0 ? (
        <Text style={styles.noRequestsText}>
          Nenhuma solicitação disponível.
        </Text>
      ) : (
        <FlatList
          data={requests}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}

      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => navigation.navigate("Home")}
      >
        <MaterialIcons name="home" size={24} color={colors.white} />
        <Text style={styles.homeButtonText}>Voltar ao Menu</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MyRequestsScreen;
