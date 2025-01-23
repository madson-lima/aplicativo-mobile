// src/styles/servicesStyles.js
import { StyleSheet } from 'react-native';

const servicesStyles = (colors) =>
  StyleSheet.create({
    scrollContainer: {
      flexGrow: 1,
      alignItems: 'center',
      paddingVertical: 20,
      backgroundColor: colors.background || '#f0f4f7', // Fundo claro, com opção de cores dinâmicas
    },
    container: {
      width: '90%',
      backgroundColor: colors.cardBackground || '#ffffff',
      borderRadius: 15,
      padding: 20,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 6,
      elevation: 5,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text || '#333333',
      textAlign: 'center',
      marginBottom: 15,
    },
    description: {
      fontSize: 16,
      color: colors.subtext || '#555555',
      textAlign: 'center',
      marginBottom: 20,
    },
    serviceList: {
      width: '100%',
    },
    serviceItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 15,
      backgroundColor: colors.serviceItemBackground || '#e6f2ff',
      borderRadius: 10,
      marginBottom: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    serviceText: {
      flex: 1,
      marginLeft: 15,
      fontSize: 16,
      color: colors.text || '#333333',
    },
    homeButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: '60%',
      paddingVertical: 12,
      borderRadius: 25,
      marginTop: 25,
      backgroundColor: colors.buttonBackground || '#007bff',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
    },
    homeButtonText: {
      color: colors.buttonText || '#ffffff',
      fontSize: 16,
      fontWeight: '600',
      marginLeft: 8,
    },
  });

export default servicesStyles;
