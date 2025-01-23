// src/styles/settingsStyles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    width: '100%',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    width: '80%',
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 16,
  },
  currentModeText: {
    fontSize: 16,
    marginVertical: 20,
  },
  homeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    width: '80%',
  },
  homeButtonText: {
    marginLeft: 10,
    fontSize: 16,
  },
});
