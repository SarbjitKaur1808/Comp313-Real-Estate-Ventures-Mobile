import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Loading from '../components/Loading';

export const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const handleChange = (key: string, value: string) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleSubmit = async () => {};

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=3473&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        }}
        style={styles.backgroundImage}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Create a new account</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your username"
            onChangeText={value => handleChange('username', value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            keyboardType="email-address"
            onChangeText={value => handleChange('email', value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry
            onChangeText={value => handleChange('password', value)}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit}
            disabled={loading}>
            {loading ? (
              <Loading />
            ) : (
              <Text style={styles.buttonText}>Sign Up</Text>
            )}
          </TouchableOpacity>
          <View style={styles.divider}>
            <View style={styles.line} />
            <Text style={styles.orText}>Or continue with</Text>
            <View style={styles.line} />
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.signInText}>
              Already have an account? Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  line: {
    height: 1,
    flex: 1,
    backgroundColor: 'gray',
  },
  orText: {
    marginHorizontal: 10,
    color: 'gray',
  },
  signInText: {
    color: '#007bff',
    marginTop: 10,
  },
});
