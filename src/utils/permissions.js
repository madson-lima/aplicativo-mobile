// src/utils/permissions.js
import { PermissionsAndroid, Platform } from 'react-native';

// Função para solicitar permissão de localização no Android
export const requestLocationPermission = async () => {
  try {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Permissão de Localização Necessária',
          message: 'Este aplicativo precisa acessar sua localização.',
          buttonNeutral: 'Pergunte-me depois',
          buttonNegative: 'Cancelar',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  } catch (err) {
    console.warn(err);
    return false;
  }
};
