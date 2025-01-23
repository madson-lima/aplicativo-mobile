import { StyleSheet } from 'react-native';

export default (colors) =>
  StyleSheet.create({
    scrollContainer: {
      paddingVertical: 20,
      backgroundColor: colors.background,
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 20,
    },
    iconRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 20,
      width: '100%',
    },
    iconButton: {
      alignItems: 'center',
      backgroundColor: colors.buttonBackground,
      borderRadius: 10,
      paddingVertical: 15,
      paddingHorizontal: 10,
      width: 100,
      height: 100,
      justifyContent: 'center',
    },
    iconText: {
      color: colors.buttonText,
      fontSize: 12,
      marginTop: 5,
      textAlign: 'center',
    },
    logoutButton: {
      backgroundColor: '#ff4d4d', // Cor de destaque para o botão de sair
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderRadius: 10,
      marginTop: 20,
    },
    logoutText: {
      color: '#ffffff',
      fontWeight: 'bold',
      fontSize: 16,
      marginLeft: 10,
    },
    menuButton: {
      position: 'absolute',
      bottom: 20,
      left: 20,
      backgroundColor: colors.buttonBackground,
      padding: 10,
      borderRadius: 50,
    },
    sideMenu: {
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: 250,
      backgroundColor: colors.primary || '#007bff',
      paddingVertical: 20,
      paddingHorizontal: 15,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 15,
    },
    menuItemText: {
      color: '#ffffff',
      fontSize: 16,
      marginLeft: 10,
    },
  });
