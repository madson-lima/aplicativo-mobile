import { StyleSheet } from 'react-native';

const faqStyles = (colors) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: colors.background,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 20,
      textAlign: 'center',
    },
    faqContainer: {
      width: '100%',
      backgroundColor: colors.cardBackground || '#f5f5f5',
      borderRadius: 15,
      padding: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 4,
    },
    question: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.primary || '#333',
      marginBottom: 8,
    },
    answer: {
      fontSize: 14,
      color: colors.text,
      marginBottom: 15,
      lineHeight: 20,
    },
    backButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.buttonBackground || '#007bff',
      borderRadius: 25,
      paddingVertical: 12,
      paddingHorizontal: 20,
      marginTop: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 8,
    },
    backButtonText: {
      color: colors.buttonText || '#fff',
      fontSize: 16,
      fontWeight: 'bold',
      marginLeft: 10,
    },
  });

export default faqStyles;
