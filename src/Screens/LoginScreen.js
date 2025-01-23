import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import styles from '../styles/loginStyles'; // Estilos personalizados
import { useColorTheme } from '../context/ColorContext'; // Contexto de cores

const LoginScreen = ({ navigation }) => {
  const { colors } = useColorTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Função para validar email
  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  // Função para login com email e senha
  const handleEmailLogin = async () => {
    setError('');
    setLoading(true);

    if (!email.trim() || !password.trim()) {
      setError('Por favor, preencha todos os campos.');
      setLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setError('Por favor, insira um e-mail válido.');
      setLoading(false);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Login bem-sucedido:', userCredential.user);
      Alert.alert('Login realizado com sucesso!', 'Bem-vindo ao Meu Bairro!');
      navigation.navigate('Home'); // Redireciona para a tela inicial
    } catch (error) {
      console.error('Erro ao fazer login:', error.message);
      setError('Credenciais inválidas. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={[styles.scrollContainer, { backgroundColor: colors.background }]}
    >
      <View style={[styles.innerContainer, { backgroundColor: colors.inputBackground }]}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />

        <Text style={[styles.title, { color: colors.text }]}>Bem-vindo</Text>

        {/* Campo de e-mail */}
        <View style={[styles.inputIconContainer, { borderColor: colors.border }]}>
          <FontAwesome5 name="envelope" size={20} color={colors.placeholderText} style={styles.icon} />
          <TextInput
            style={[styles.inputWithIcon, { color: colors.text }]}
            placeholder="Digite seu e-mail"
            placeholderTextColor={colors.placeholderText}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Campo de senha */}
        <View style={[styles.passwordContainer, { borderColor: colors.border }]}>
          <FontAwesome5 name="lock" size={20} color={colors.placeholderText} style={styles.icon} />
          <TextInput
            style={[styles.passwordInput, { color: colors.text }]}
            placeholder="Digite sua senha"
            secureTextEntry={!showPassword}
            placeholderTextColor={colors.placeholderText}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Feather name={showPassword ? 'eye-off' : 'eye'} size={20} color={colors.placeholderText} />
          </TouchableOpacity>
        </View>

        {/* Mensagem de erro */}
        {error ? <Text style={[styles.errorText, { color: colors.buttonBackground }]}>{error}</Text> : null}

        {/* Indicador de carregamento */}
        {loading ? <ActivityIndicator size="large" color={colors.buttonBackground} /> : null}

        {/* Botões */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.buttonBackground }]}
          onPress={handleEmailLogin}
          disabled={loading}
        >
          <Text style={[styles.buttonText, { color: colors.buttonText }]}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
  style={[styles.button, { backgroundColor: '#F28A2E' }]}
  onPress={() => navigation.navigate('SignUpWithEmailScreen')}
>
  <Text style={styles.buttonText}>Registrar-se</Text>
</TouchableOpacity>


        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPassword')}
        >
          <Text style={[styles.forgotPasswordText, { color: colors.buttonBackground }]}>
            Esqueceu a senha?
          </Text>
        </TouchableOpacity>

        <Text style={[styles.orText, { color: colors.text }]}>OU</Text>

        <TouchableOpacity
          style={[styles.socialButton, { backgroundColor: '#DB4437' }]}
          onPress={() => Alert.alert('Login com Google em breve!')}
          disabled={loading}
        >
          <FontAwesome5 name="google" size={20} color="#ffffff" />
          <Text style={styles.socialButtonText}>Entrar com o Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.socialButton, { backgroundColor: '#3b5998' }]}
          onPress={() => Alert.alert('Login com Facebook em breve!')}
          disabled={loading}
        >
          <FontAwesome5 name="facebook" size={20} color="#ffffff" />
          <Text style={styles.socialButtonText}>Entrar com o Facebook</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
