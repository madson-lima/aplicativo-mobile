import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  innerContainer: {
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
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  inputWithIcon: {
    flex: 1,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
  },
  eyeIcon: {
    paddingLeft: 10,
  },
  errorText: {
    fontSize: 14,
    marginBottom: 10,
  },
  button: {
    width: '100%',
    backgroundColor: '#F28A2E', // Cor sugerida pela paleta
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Sombra para destacar o botão
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  forgotPasswordText: {
    fontSize: 14,
    marginBottom: 20,
    textDecorationLine: 'underline',
  },
  orText: {
    fontSize: 14,
    marginBottom: 10,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    width: '100%',
    justifyContent: 'center',
    elevation: 4,
  },
  socialButtonText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#fff',
  },
});

export default styles;
