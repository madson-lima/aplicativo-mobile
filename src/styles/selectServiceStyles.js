// selectServiceStyles.js
import { StyleSheet } from 'react-native';

export default (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    contentContainer: {
      padding: 16,
    },
    header: {
      marginBottom: 20,
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
    },
    description: {
      fontSize: 16,
      color: colors.text,
      textAlign: 'center',
      marginTop: 10,
    },
    serviceContainer: {
      marginBottom: 20,
    },
    serviceButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#E0F7FA',
      borderRadius: 8,
      padding: 12,
      marginVertical: 6,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    serviceText: {
      marginLeft: 12,
      fontSize: 16,
      color: colors.text,
    },
    optionButton: {
      backgroundColor: '#F0F4C3',
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 6,
      marginVertical: 4,
      marginLeft: 40,
    },
    optionText: {
      fontSize: 14,
      color: colors.text,
    },
    selectedOptionText: {
      fontWeight: 'bold',
      color: colors.primary,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    clearButton: {
      backgroundColor: '#FFCDD2',
      padding: 10,
      borderRadius: 8,
    },
    clearButtonText: {
      color: '#C62828',
      fontWeight: 'bold',
    },
    nextButton: {
      backgroundColor: colors.primary,
      padding: 10,
      borderRadius: 8,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });
