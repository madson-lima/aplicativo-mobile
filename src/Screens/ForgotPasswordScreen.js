import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { sendPasswordResetEmail } from "firebase/auth"; // Firebase Auth
import { auth } from "../config/firebaseConfig"; // Configuração do Firebase
import forgotPasswordStyles from "../styles/forgotPasswordStyles"; // Estilos
import { useColorTheme } from "../context/ColorContext"; // Tema dinâmico para acessibilidade

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { colors } = useColorTheme(); // Tema dinâmico

  // Validações de e-mail
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expressão regular para validar o e-mail
    return emailRegex.test(email);
  };

  const handlePasswordReset = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    if (!email.trim()) {
      setErrorMessage("Por favor, preencha o campo de e-mail.");
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage("Por favor, insira um e-mail válido.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage(
        "Um link para redefinir sua senha foi enviado para o e-mail fornecido. Por favor, verifique sua caixa de entrada."
      );
    } catch (error) {
      console.error("Erro ao enviar e-mail de redefinição:", error);
      switch (error.code) {
        case "auth/user-not-found":
          setErrorMessage("Usuário não encontrado com o e-mail fornecido.");
          break;
        case "auth/invalid-email":
          setErrorMessage("O e-mail fornecido é inválido.");
          break;
        default:
          setErrorMessage(
            "Erro ao enviar e-mail de redefinição. Por favor, tente novamente."
          );
      }
    }
  };

  return (
    <ScrollView
      contentContainerStyle={[
        forgotPasswordStyles.scrollContainer,
        { backgroundColor: colors.background },
      ]}
    >
      <View
        style={[
          forgotPasswordStyles.container,
          { backgroundColor: colors.background },
        ]}
      >
        <Text
          style={[forgotPasswordStyles.title, { color: colors.text }]}
        >
          Redefinir Senha
        </Text>
        <Text
          style={[forgotPasswordStyles.description, { color: colors.text }]}
        >
          Por favor, insira seu e-mail para receber um link de redefinição de
          senha.
        </Text>

        <TextInput
          style={[
            forgotPasswordStyles.input,
            { borderColor: colors.border, color: colors.text },
          ]}
          placeholder="Digite seu e-mail"
          placeholderTextColor={colors.placeholderText}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        {/* Exibir mensagens de erro */}
        {errorMessage ? (
          <Text
            style={[
              forgotPasswordStyles.errorText,
              { color: colors.error },
            ]}
          >
            {errorMessage}
          </Text>
        ) : null}

        {/* Exibir mensagens de sucesso */}
        {successMessage ? (
          <Text
            style={[
              forgotPasswordStyles.successText,
              { color: colors.success },
            ]}
          >
            {successMessage}
          </Text>
        ) : null}

        <TouchableOpacity
          style={[
            forgotPasswordStyles.button,
            { backgroundColor: colors.buttonBackground },
          ]}
          onPress={handlePasswordReset}
        >
          <Text
            style={[
              forgotPasswordStyles.buttonText,
              { color: colors.buttonText },
            ]}
          >
            Enviar Link
          </Text>
        </TouchableOpacity>

        {/* Botão para voltar ao login */}
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text
            style={[
              forgotPasswordStyles.backToLoginText,
              { color: colors.link },
            ]}
          >
            Voltar para Login
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ForgotPasswordScreen;
