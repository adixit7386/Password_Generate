import {
  StyleSheet,
  Text,
  View,
  input,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {Formik} from 'formik';
import * as yup from 'yup';
const PasswordSchema = yup.object().shape({
  passwordLength: yup
    .number()
    .required('password is required')
    .min(4, 'minimum 4 characters')
    .max(50, 'maximum 50 characters'),
});

export default function App() {
  const [password, setPassword] = useState('');
  const [isPassGenerated, setIsPassGenerated] = useState(false);
  const [lowercase, setLowercase] = useState(true);
  const [uppercase, setUppercase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);
  const generatePasswordString = (passwordLength: number) => {
    let characters = '';
    const upperCaseCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseCharacters = 'abcdefghijklmnopqrstuvwxyz';
    const numbersCharacters = '0123456789';
    const symbolsCharacters = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    if (lowercase) {
      characters += lowerCaseCharacters;
    }
    if (uppercase) {
      characters += upperCaseCharacters;
    }
    if (numbers) {
      characters += numbersCharacters;
    }
    if (symbols) {
      characters += symbolsCharacters;
    }
    const passwordCharacters = createPassword(characters, passwordLength);
    setIsPassGenerated(true);
    setPassword(passwordCharacters);
  };
  const createPassword = (characters: string, passwordLength: number) => {
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }
    return result;
  };
  const resetPasswordState = () => {};
  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>
          <Formik
            initialValues={{passwordLength: ''}}
            validationSchema={PasswordSchema}
            onSubmit={values =>
              generatePasswordString(Number(values.passwordLength))
            }>
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              handleReset,
              /* and other goodies */
            }) => (
              <>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputColumn}>
                    <Text style={styles.label}>Password Length</Text>
                    {touched.passwordLength && errors.passwordLength && (
                      <Text style={styles.errorText}>
                        {errors.passwordLength}
                      </Text>
                    )}
                  </View>
                  <TextInput
                    style={styles.inputStyle}
                    value={values.passwordLength}
                    onChangeText={handleChange('passwordLength')}
                    placeholder="Ex. 8"
                    keyboardType="numeric"></TextInput>
                </View>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputColumn}>
                    <Text style={styles.label}>Include Lowercase</Text>
                  </View>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={lowercase}
                    onPress={() => setLowercase(state => !state)}
                    fillColor="#29AB27"></BouncyCheckbox>
                </View>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputColumn}>
                    <Text style={styles.label}>Include Uppercase</Text>
                  </View>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={uppercase}
                    onPress={() => setUppercase(state => !state)}
                    fillColor="#7627ab"></BouncyCheckbox>
                </View>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputColumn}>
                    <Text style={styles.label}>Include Numbers</Text>
                  </View>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={numbers}
                    onPress={() => setNumbers(state => !state)}
                    fillColor="#ab2778"></BouncyCheckbox>
                </View>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputColumn}>
                    <Text style={styles.label}>Include Symbols</Text>
                  </View>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={symbols}
                    onPress={() => setSymbols(state => !state)}
                    fillColor="#ab9e27"></BouncyCheckbox>
                </View>
                <View style={styles.formActions}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit}
                    disabled={!isValid}>
                    <Text style={styles.buttonText}>Generate Password</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      handleReset();
                      resetPasswordState();
                    }}>
                    <Text style={styles.buttonText}>Reset</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
        {console.log(password)}
        {isPassGenerated && (
          <View>
            <Text style={styles.title}>Generated Password</Text>
            <Text selectable={true} style={styles.ans}>
              {password}
            </Text>
          </View>
        )}
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'space-between',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    color: '#000',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  inputStyle: {
    flex: 1,
    fontSize: 20,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#000',
    marginBottom: 20,
  },
  inputColumn: {
    flex: 1,
    flexDirection: 'column',
  },
  formContainer: {
    flex: 1,
    padding: 20,
  },
  appContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formActions: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
  errorText: {
    fontSize: 10,
    color: 'red',
  },
  ans: {
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
});
