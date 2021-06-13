import { Link } from '@react-navigation/native';
import * as React from 'react';
import { Alert, Image, KeyboardAvoidingView, Linking, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { useDispatch } from 'react-redux';

import { Text, TextInput } from '../components/Themed';
import { getTextColor, primaryColor } from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { login, signup } from '../redux/actions/UserActions';

const Logo = require("../assets/images/adaptive-icon.png");

type LoginScreenProps = {
  navigation: any;
  route: {
    params?: {
      isSignUp?: boolean;
    };
  };
};

export default function LoginScreen({ navigation, route }: LoginScreenProps) {
  const dispatch = useDispatch();
  const theme = useColorScheme();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const emailRef = React.useRef<any>(null);
  const passwordRef = React.useRef<any>(null);

  const isSignUp = route.params?.isSignUp;

  async function handleSubmit() {
    try {
      if (isSignUp) {
        const data = await signup(dispatch, { email, password });
        if (data.errors) {
          throw new Error(data.errors.join(","));
        }
      } else {
        const data = await login(dispatch, { username: email, password });
        if (data.errors) {
          throw new Error(data.errors.join(","));
        }
      }
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
    },
    logo: {
      width: 128,
      height: 128,
      marginVertical: 8,
    },
    input: {
      fontSize: 24,
      width: 256,
      marginBottom: 8,
      color: getTextColor(theme),
    },
    primaryButton: {
      backgroundColor: primaryColor,
      width: 256,
    },
    link: {
      color: primaryColor,
      marginTop: 4,
    },
  });

  function handleSubmitEmail() {
    passwordRef.current?.focus();
  }

  function handleTermsOfServicePressed() {
    Linking.openURL("https://engram.xyzdigital.com/legal/terms-of-service");
  }

  function handlePrivacyPolicyPressed() {
    Linking.openURL("https://engram.xyzdigital.com/legal/privacy-policy");
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <Image style={styles.logo} source={Logo} />
      <Text style={{ width: 256, margin: 16, textAlign: "center" }}>
        By continuing, you are accepting the{" "}
        <TouchableOpacity onPress={handleTermsOfServicePressed}>
          <Text style={styles.link}>Terms of Service</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text> & </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePrivacyPolicyPressed}>
          <Text style={styles.link}>Privacy Policy</Text>
        </TouchableOpacity>
      </Text>
      <TextInput
        textInputRef={emailRef}
        onSubmitEditing={handleSubmitEmail}
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        autoCompleteType="off"
        keyboardType="email-address"
        autoCorrect={false}
        autoCapitalize={"none"}
        placeholder={"Email"}
        returnKeyType="next"
        autoFocus={true}
      />
      <TextInput
        textInputRef={passwordRef}
        style={styles.input}
        onChangeText={setPassword}
        onSubmitEditing={handleSubmit}
        value={password}
        autoCompleteType="off"
        autoCorrect={false}
        autoCapitalize={"none"}
        placeholder={"Password"}
        secureTextEntry={true}
        returnKeyType="done"
      />
      <Button
        buttonStyle={styles.primaryButton}
        title={isSignUp ? "Sign Up" : "Login"}
        onPress={handleSubmit}
      />
      {isSignUp ? (
        <Link style={styles.link} to="/login">
          Already have an account? Log in
        </Link>
      ) : (
        <Link style={styles.link} to="/signup">
          Don't have an account? Sign Up
        </Link>
      )}
    </KeyboardAvoidingView>
  );
}
