import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Configuração da baseURL usando variáveis de ambiente ou endereço local
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://192.168.0.18:5000/api', // Certifique-se de que o IP está correto
});

// Interceptor para adicionar o token de autenticação em cada requisição
api.interceptors.request.use(
  async (config) => {
    try {
      // Busca o token no AsyncStorage
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Adiciona o token no cabeçalho Authorization
      }
    } catch (error) {
      console.error('Erro ao acessar AsyncStorage:', error);
    }
    return config;
  },
  (error) => {
    // Lida com erros ao configurar a requisição
    return Promise.reject(error);
  }
);

// Interceptor para lidar com erros nas respostas
api.interceptors.response.use(
  (response) => {
    // Retorna a resposta normalmente se não houver erros
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      console.warn('Token expirado ou inválido. Redirecionando para login...');
      try {
        // Remove o token inválido do AsyncStorage
        await AsyncStorage.removeItem('authToken');
        // Aqui você pode implementar redirecionamento para a tela de login
        // Exemplo: NavigationService.navigate('Login');
      } catch (storageError) {
        console.error('Erro ao remover token:', storageError);
      }
    } else {
      console.error('Erro na resposta da API:', error);
    }
    // Retorna o erro para que ele possa ser tratado onde a requisição foi feita
    return Promise.reject(error);
  }
);

// Função para salvar o token de autenticação no AsyncStorage
export const saveAuthToken = async (token) => {
  try {
    await AsyncStorage.setItem('authToken', token);
    console.log('Token de autenticação salvo com sucesso!');
  } catch (error) {
    console.error('Erro ao salvar o token no AsyncStorage:', error);
  }
};

// Função para remover o token de autenticação
export const removeAuthToken = async () => {
  try {
    await AsyncStorage.removeItem('authToken');
    console.log('Token de autenticação removido com sucesso!');
  } catch (error) {
    console.error('Erro ao remover o token do AsyncStorage:', error);
  }
};

// Função para obter o token de autenticação
export const getAuthToken = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    return token;
  } catch (error) {
    console.error('Erro ao obter o token do AsyncStorage:', error);
    return null;
  }
};

// Função para realizar logout
export const logout = async () => {
  try {
    await removeAuthToken();
    console.log('Logout realizado com sucesso.');
  } catch (error) {
    console.error('Erro ao realizar logout:', error);
  }
};

// Função para fazer login com Firebase
export const loginWithFirebase = async (email, password) => {
  try {
    const response = await api.post('/login', { email, password });
    const { token } = response.data;
    await saveAuthToken(token); // Salva o token no AsyncStorage
    return token;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error;
  }
};

// Função para registrar com Firebase
export const registerWithFirebase = async (email, password) => {
  try {
    const response = await api.post('/register', { email, password });
    return response.data;
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    throw error;
  }
};

export default api;
