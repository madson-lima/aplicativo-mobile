import { StyleSheet } from 'react-native';

export default (colors) =>
  StyleSheet.create({
    drawerContainer: {
      flex: 1,
      backgroundColor: colors.primary || '#007bff',
      paddingTop: 20,
    },
    drawerItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: colors.border || '#cccccc',
    },
    drawerIcon: {
      marginRight: 15,
      color: colors.icon || '#ffffff',
    },
    drawerLabel: {
      fontSize: 16,
      color: colors.text || '#ffffff',
      fontWeight: 'bold',
    },
    drawerFooter: {
      marginTop: 'auto',
      padding: 20,
      borderTopWidth: 1,
      borderTopColor: colors.border || '#cccccc',
    },
    footerText: {
      color: colors.text || '#ffffff',
      fontSize: 14,
      textAlign: 'center',
    },
  });
