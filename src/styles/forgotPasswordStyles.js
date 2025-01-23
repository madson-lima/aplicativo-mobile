import { StyleSheet } from 'react-native';

const forgotPasswordStyles = StyleSheet.create({
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
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  errorText: {
    fontSize: 14,
    marginBottom: 10,
    color: 'red', // Cor de erro
  },
  successText: {
    fontSize: 14,
    marginBottom: 10,
    color: 'green', // Cor de sucesso
  },
  button: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  backToLoginText: {
    fontSize: 16,
    textDecorationLine: 'underline',
    marginTop: 10,
  },
});

export default forgotPasswordStyles;
