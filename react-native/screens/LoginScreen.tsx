import { Link } from '@react-navigation/native';
import * as React from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, StyleSheet, TextInput as DefaultTextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { useDispatch } from 'react-redux';

import { TextInput } from '../components/Themed';
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
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const emailRef = React.useRef<typeof DefaultTextInput | null>(null);
  const passwordRef = React.useRef<typeof DefaultTextInput | null>(null);

  const isSignUp = route.params?.isSignUp;

  async function handleSubmit() {
    try {
      if (isSignUp) {
        const data = await signup(dispatch, { username, email, password });
        if (data.errors) {
          throw new Error(data.errors.join(","));
        }
      } else {
        const data = await login(dispatch, { username, password });
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
      marginVertical: 32,
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
      marginVertical: 8,
      color: getTextColor(theme),
    },
  });

  function handleSubmitUsername() {
    if (isSignUp) {
      emailRef.current?.focus();
    } else {
      passwordRef.current?.focus();
    }
  }

  function handleSubmitEmail() {
    passwordRef.current?.focus();
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <Image style={styles.logo} source={Logo} />
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        onSubmitEditing={handleSubmitUsername}
        value={username}
        autoCompleteType="off"
        autoCorrect={false}
        autoCapitalize={"none"}
        placeholder={"Username"}
        returnKeyType="next"
        autoFocus={true}
      />
      {isSignUp ? (
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
        />
      ) : null}
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
