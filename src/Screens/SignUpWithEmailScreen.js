import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { createUserWithEmailAndPassword } from "firebase/auth"; // Firebase Auth
import { auth } from "../config/firebaseConfig"; // Configuração do Firebase
import { useColorTheme } from "../context/ColorContext"; // Contexto de acessibilidade para temas

const SignUpWithEmailScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [termsModalVisible, setTermsModalVisible] = useState(false); // Modal para Termos e Condições
  const [privacyModalVisible, setPrivacyModalVisible] = useState(false); // Modal para Política de Privacidade
  const [termsAccepted, setTermsAccepted] = useState(false); // Controle para aceitar Termos e Política

  const { colors } = useColorTheme(); // Cores dinâmicas do tema

  // Validação de email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Função para registrar o usuário no Firebase
  const handleSignUp = async () => {
    setErrorMessage(""); // Limpa mensagens de erro anteriores
    if (!email || !password || !confirmPassword) {
      setErrorMessage("Por favor, preencha todos os campos.");
      return;
    }
  
    if (!validateEmail(email)) {
      setErrorMessage("Por favor, insira um e-mail válido.");
      return;
    }
  
    if (password !== confirmPassword) {
      setErrorMessage("As senhas não coincidem.");
      return;
    }
  
    if (!termsAccepted) {
      setErrorMessage("Você deve aceitar os Termos e a Política de Privacidade.");
      return;
    }
  
    try {
      // Registrar o usuário no Firebase
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Sucesso", "Conta criada com sucesso! Faça login para continuar.");
      navigation.navigate("Login"); // Redireciona para a tela de login
    } catch (error) {
      console.error("Erro ao registrar-se:", error.message);
      if (error.code === "auth/email-already-in-use") {
        Alert.alert(
          "E-mail já registrado",
          "Este e-mail já está associado a uma conta. Deseja fazer login?",
          [
            { text: "Cancelar", style: "cancel" },
            { text: "Fazer Login", onPress: () => navigation.navigate("Login") },
          ]
        );
      } else if (error.code === "auth/weak-password") {
        setErrorMessage("A senha deve ter pelo menos 6 caracteres.");
      } else {
        setErrorMessage("Ocorreu um erro. Tente novamente mais tarde.");
      }
    }
  };
  

  return (
    <ScrollView
      contentContainerStyle={[
        styles.scrollContainer,
        { backgroundColor: colors.background },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Icon
          name="user-plus"
          size={100}
          color={colors.iconColor}
          style={styles.icon}
        />
        <Text style={[styles.title, { color: colors.text }]}>Registrar-se</Text>

        <TextInput
          style={[
            styles.input,
            { color: colors.text, borderColor: colors.border },
          ]}
          placeholder="Digite seu e-mail"
          placeholderTextColor={colors.placeholderText}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={[
            styles.input,
            { color: colors.text, borderColor: colors.border },
          ]}
          placeholder="Digite sua senha"
          placeholderTextColor={colors.placeholderText}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TextInput
          style={[
            styles.input,
            { color: colors.text, borderColor: colors.border },
          ]}
          placeholder="Confirme sua senha"
          placeholderTextColor={colors.placeholderText}
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        {errorMessage ? (
          <Text style={[styles.errorText, { color: colors.error }]}>
            {errorMessage}
          </Text>
        ) : null}

        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            onPress={() => setTermsAccepted(!termsAccepted)}
            style={styles.checkbox}
          >
            <Icon
              name={termsAccepted ? "check-square" : "square-o"}
              size={24}
              color={colors.checkbox}
            />
          </TouchableOpacity>
          <Text style={[styles.checkboxText, { color: colors.text }]}>
            Eu aceito os{" "}
            <Text
              style={[
                styles.linkText,
                {
                  fontWeight: "bold",
                  color: "#FF4500", // Cor laranja vibrante para destaque
                  textDecorationLine: "underline",
                },
              ]}
              onPress={() => setTermsModalVisible(true)}
            >
              Termos e Condições
            </Text>{" "}
            e a{" "}
            <Text
              style={[
                styles.linkText,
                {
                  fontWeight: "bold",
                  color: "#FF4500", // Cor laranja vibrante para destaque
                  textDecorationLine: "underline",
                },
              ]}
              onPress={() => setPrivacyModalVisible(true)}
            >
              Política de Privacidade
            </Text>
            .
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.buttonBackground }]}
          onPress={handleSignUp}
        >
          <Text style={[styles.buttonText, { color: colors.buttonText }]}>
            Registrar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backToLoginButton} // Adicionado estilo para o botão
          onPress={() => navigation.navigate("Login")} // Navega para a tela de Login
        >
          <Text style={[styles.backToLoginText, { color: colors.link }]}>
            Já tem uma conta?{" "}
            <Text style={{ fontWeight: "bold" }}>Faça Login</Text>
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={termsModalVisible}
        animationType="slide"
        onRequestClose={() => setTermsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Termos e Condições</Text>
          <ScrollView contentContainerStyle={styles.modalScroll}>
            <Text style={styles.modalContent}>
              1. **Uso Permitido**: Este aplicativo é projetado para conectar
              usuários e serviços locais.{"\n\n"}
              2. **Responsabilidade do Usuário**: O usuário é responsável pelas
              informações inseridas no aplicativo e deve garantir sua
              veracidade.{"\n\n"}
              3. **Alterações nos Termos**: Reservamo-nos o direito de alterar
              os Termos e Condições a qualquer momento, com notificação prévia
              aos usuários.{"\n\n"}
              4. **Conexão com Terceiros**: Links para serviços de terceiros
              podem ser incluídos no aplicativo.{"\n\n"}
              5. **Desativação e Suspensão**: Contas podem ser suspensas em caso
              de uso indevido ou atividades proibidas.{"\n\n"}
            </Text>
          </ScrollView>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setTermsModalVisible(false)}
          >
            <Text style={styles.closeModalText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal
        visible={privacyModalVisible}
        animationType="slide"
        onRequestClose={() => setPrivacyModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Política de Privacidade</Text>
          <ScrollView contentContainerStyle={styles.modalScroll}>
            <Text style={styles.modalContent}>
              1. **Coleta de Dados**: Informações são coletadas para
              personalizar os serviços e melhorar a experiência do usuário.
              {"\n\n"}
              2. **Finalidade dos Dados**: Os dados coletados ajudam a processar
              solicitações, aprimorar serviços e criar relatórios de melhorias.
              {"\n\n"}
              3. **Compartilhamento de Dados**: Seus dados não serão
              compartilhados com terceiros sem autorização, exceto por
              exigências legais.{"\n\n"}
              4. **Segurança**: As informações são protegidas com criptografia e
              armazenadas em servidores seguros.{"\n\n"}
              5. **Direitos do Usuário**: Você pode acessar, corrigir ou excluir
              seus dados a qualquer momento, enviando uma solicitação para
              suporte@meubairro.com.{"\n\n"}
            </Text>
          </ScrollView>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setPrivacyModalVisible(false)}
          >
            <Text style={styles.closeModalText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: 20,
  },
  container: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  button: {
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
    backgroundColor: "#FF8C00",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  modalScroll: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  modalContent: {
    fontSize: 16,
    lineHeight: 24,
    color: "#555",
  },
  closeButton: {
    padding: 15,
    backgroundColor: "#FF8C00",
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  closeModalText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default SignUpWithEmailScreen;
