import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window'); // Obter a largura da tela para ajustes responsivos

const problemDetailsStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: 16,
      paddingVertical: 20,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      color: colors.text,
      textAlign: 'center',
      marginBottom: 16,
    },
    problemsContainer: {
      backgroundColor: colors.cardBackground,
      borderRadius: 10,
      padding: 16,
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 3,
    },
    problemsText: {
      color: colors.text,
      fontSize: 16,
      textAlign: 'left',
      lineHeight: 22,
    },
    subtitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 10,
      textAlign: 'center',
    },
    descriptionInput: {
      backgroundColor: colors.inputBackground,
      borderRadius: 8,
      padding: 12,
      height: 100,
      marginBottom: 20,
      fontSize: 16,
      borderWidth: 1,
      borderColor: colors.border,
      textAlignVertical: 'top',
      color: colors.text,
    },
    imagePreviewContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginBottom: 20,
    },
    imageContainer: {
      position: 'relative',
      marginRight: 10,
      marginBottom: 10,
    },
    imagePreview: {
      width: width * 0.4, // Responsivo: 40% da largura da tela
      height: width * 0.4, // Tornando o preview quadrado
      borderRadius: 8,
    },
    removeIcon: {
      position: 'absolute',
      top: -5,
      right: -5,
      backgroundColor: 'red',
      borderRadius: 12,
      padding: 4,
    },
    actionsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 20,
    },
    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.buttonBackground,
      borderRadius: 8,
      paddingVertical: 10,
      paddingHorizontal: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 3,
    },
    actionButtonText: {
      marginLeft: 8,
      fontSize: 14,
      color: colors.buttonText,
    },
    sendButton: {
      backgroundColor: colors.primary,
      paddingVertical: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 3,
    },
    sendButtonText: {
      color: colors.buttonText,
      fontSize: 16,
      fontWeight: 'bold',
    },
    placeholderText: {
      color: colors.placeholderText, // Garantir que o placeholder seja visível
    },
    locationPreview: {
      marginTop: 20,
      padding: 10,
      borderRadius: 8,
      backgroundColor: '#f9f9f9',
      alignItems: 'center',
    },
    locationText: {
      fontSize: 14,
      marginVertical: 2,
      fontWeight: 'bold',
    },
    
  });

export default problemDetailsStyles;
