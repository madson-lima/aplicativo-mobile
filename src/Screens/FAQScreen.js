import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useColorTheme } from '../context/ColorContext';
import faqStyles from '../styles/faqStyles';

const FAQScreen = ({ navigation }) => {
  const { colors } = useColorTheme();
  const styles = faqStyles(colors);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>DÚVIDAS</Text>

      <View style={styles.faqContainer}>
        <Text style={styles.question}>O que é o app 'Meu Bairro'?</Text>
        <Text style={styles.answer}>
          É uma plataforma digital para reportar problemas urbanos e solicitar serviços públicos.
        </Text>

        <Text style={styles.question}>Para que serve o app 'Meu Bairro'?</Text>
        <Text style={styles.answer}>
          Facilita a comunicação entre cidadãos e órgãos públicos para melhorar a gestão urbana.
        </Text>

        <Text style={styles.question}>Quais problemas posso reportar pelo app?</Text>
        <Text style={styles.answer}>
          Buracos nas ruas, iluminação deficiente, vazamentos de água, desmoronamentos e outros.
        </Text>

        <Text style={styles.question}>Como envio uma solicitação?</Text>
        <Text style={styles.answer}>
          Basta abrir o app, descrever o problema, enviar uma foto e a localização.
        </Text>

        <Text style={styles.question}>O app é gratuito?</Text>
        <Text style={styles.answer}>
          Sim, o uso do app é totalmente gratuito para os cidadãos.
        </Text>

        <Text style={styles.question}>Quem responde às minhas solicitações?</Text>
        <Text style={styles.answer}>
          As solicitações são encaminhadas aos órgãos públicos responsáveis.
        </Text>

        <Text style={styles.question}>Como acompanho o status da minha solicitação?</Text>
        <Text style={styles.answer}>
          Você pode acompanhar o status diretamente no app, na seção 'Minhas Solicitações'.
        </Text>

        <Text style={styles.question}>Preciso me registrar para usar o app?</Text>
        <Text style={styles.answer}>
          Sim, é necessário um breve registro para personalizar e acompanhar suas solicitações.
        </Text>

        <Text style={styles.question}>O app está disponível para todas as cidades?</Text>
        <Text style={styles.answer}>
          Inicialmente, o app será lançado em cidades específicas e gradualmente expandido.
        </Text>

        <Text style={styles.question}>Como o app garante a privacidade dos meus dados?</Text>
        <Text style={styles.answer}>
          O app utiliza criptografia e segue rigorosas políticas de proteção de dados para garantir sua privacidade.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('Home')}
      >
        <MaterialIcons name="home" size={24} color={colors.buttonText} />
        <Text style={styles.backButtonText}>Voltar ao Menu</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default FAQScreen;
