import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useColorTheme } from '../context/ColorContext';
import requestDetailsStyles from '../styles/requestDetailsStyles';

const RequestDetailsScreen = ({ navigation }) => {
  const { colors } = useColorTheme();
  const styles = requestDetailsStyles(colors);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>SOLICITAÇÃO</Text>
        <Text style={styles.requestStatus}>N/A</Text>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>PROTOCOLO N°</Text>
          <TextInput style={styles.input} value="N/A" editable={false} />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>DATA</Text>
          <TextInput style={styles.input} value="N/A" editable={false} />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>HORA</Text>
          <TextInput style={styles.input} value="N/A" editable={false} />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>LOCAL</Text>
          <TextInput style={styles.input} value="N/A" editable={false} />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>PRAZO</Text>
          <TextInput style={styles.input} value="N/A" editable={false} />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>PROVIDÊNCIAS</Text>
          <TextInput
            style={styles.textArea}
            value="N/A"
            multiline
            numberOfLines={4}
            editable={false}
          />
        </View>
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

export default RequestDetailsScreen;
