import { StyleSheet } from 'react-native';

const galleryStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: colors.background,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 10,
      color: colors.text,
    },
    grid: {
      justifyContent: 'space-between',
    },
    imageContainer: {
      position: 'relative',
      margin: 5,
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 8,
    },
    deleteButton: {
      position: 'absolute',
      top: 5,
      right: 5,
      backgroundColor: 'rgba(0,0,0,0.5)',
      padding: 5,
      borderRadius: 15,
    },
    emptyText: {
      textAlign: 'center',
      marginTop: 20,
      fontSize: 16,
      color: colors.placeholderText,
    },
    homeButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      marginTop: 20,
      borderRadius: 8,
      backgroundColor: colors.buttonBackground,
    },
    homeButtonText: {
      marginLeft: 5,
      fontSize: 16,
      color: colors.buttonText,
    },
  });

export default galleryStyles;
