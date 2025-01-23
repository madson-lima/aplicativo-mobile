// src/styles/signUpStyles.js
import { StyleSheet } from 'react-native';

const signUpStyles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: '#f0f4f7',
  },
  container: {
    width: '90%',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    color: '#333333',
    fontSize: 22,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderColor: '#d1d9e6',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    color: '#333333',
    backgroundColor: '#f7f9fc',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#ff4d4d',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  backToLoginText: {
    color: '#007bff',
    marginTop: 20,
    textDecorationLine: 'underline',
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxText: {
    color: '#555555',
    fontSize: 14,
  },
  linkText: {
    color: '#007bff',
    textDecorationLine: 'underline',
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333333',
    textAlign: 'center',
  },
  modalContent: {
    flexGrow: 1,
    marginBottom: 20,
  },
  modalText: {
    fontSize: 16,
    color: '#333333',
    lineHeight: 24,
  },
});

export default signUpStyles;
