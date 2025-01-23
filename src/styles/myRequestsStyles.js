import { StyleSheet } from 'react-native';

const myRequestsStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: colors.background,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
      color: colors.text,
    },
    noRequestsText: {
      fontSize: 16,
      textAlign: 'center',
      marginTop: 32,
      color: colors.text,
    },
    emptyStateContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 100,
    },
    requestCard: {
      backgroundColor: colors.cardBackground,
      borderRadius: 10,
      padding: 16,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    },
    requestTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
    },
    requestDescription: {
      fontSize: 14,
      marginVertical: 8,
      color: colors.text,
    },
    requestImage: {
      width: 100,
      height: 100,
      borderRadius: 8,
      marginRight: 8,
    },
    
    requestDate: {
      fontSize: 12,
      color: colors.subText,
    },
    requestStatus: {
      fontSize: 14,
      fontWeight: 'bold',
      color: colors.statusText,
      marginTop: 5,
    },
    deleteButton: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 8,
    },
    deleteButtonText: {
      fontSize: 14,
      marginLeft: 4,
      color: 'red',
    },
    listContainer: {
      paddingBottom: 16,
    },
    requestLocation: {
      fontSize: 14,
      color: colors.text,
      marginVertical: 5,
    },
    mapButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      marginTop: 5,
      borderRadius: 5,
      backgroundColor: colors.buttonBackground,
      alignSelf: 'flex-start', // Para que o botão não ocupe toda a largura
    },
    mapButtonText: {
      fontSize: 14,
      color: colors.buttonText,
      fontWeight: 'bold',
    },
    homeButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 12,
      marginVertical: 20,
      borderRadius: 8,
      backgroundColor: colors.buttonBackground, // Destaque para o botão
    },
    homeButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.white,
      marginLeft: 8,
    },    

  });

export default myRequestsStyles;
