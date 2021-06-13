import { createDrawerNavigator } from '@react-navigation/drawer';
import { DarkTheme, DefaultTheme, Link, NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import { Image } from 'react-native-elements/dist/image/Image';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';

import { primaryColor } from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { fetchUser, logout } from '../redux/actions/UserActions';
import LoginScreen from '../screens/LoginScreen';
import LogScreen from '../screens/LogScreen';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';

const Logo = require("../assets/images/adaptive-icon.png");

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <>
      <NavigationContainer
        linking={LinkingConfiguration}
        theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      >
        <RootNavigator />
      </NavigationContainer>
    </>
  );
}

const Drawer = createDrawerNavigator();

function RootNavigator() {
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  React.useEffect(() => {
    fetchUser(dispatch);
  }, []);

  const headerProps = {
    headerStyle: {
      backgroundColor: primaryColor,
    },
    headerTitleAlign: "center",
    headerTitleStyle: { color: "white" },
    headerTintColor: "white",
  };

  return (
    <Drawer.Navigator screenOptions={{ headerShown: true }}>
      {user ? (
        <>
          <Drawer.Screen
            name="Daily"
            component={BottomTabNavigator}
            options={({ navigation }) => {
              return {
                ...headerProps,
                headerRight: () => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("Brain Dump");
                      }}
                      style={{
                        marginRight: 8,
                      }}
                    >
                      <Image style={{ width: 36, height: 36 }} source={Logo} />
                    </TouchableOpacity>
                  );
                },
              };
            }}
          />
          <Drawer.Screen
            name="Brain Dump"
            component={LogScreen}
            initialParams={{ brainDump: true }}
            options={({ navigation }) => {
              return {
                ...headerProps,
                unmountOnBlur: true,
                headerRight: () => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.goBack();
                      }}
                      style={{
                        marginRight: 8,
                      }}
                    >
                      <Image style={{ width: 36, height: 36 }} source={Logo} />
                    </TouchableOpacity>
                  );
                },
              };
            }}
          />
          <Drawer.Screen name="Logout" component={LogoutScreen} />
        </>
      ) : (
        <>
          <Drawer.Screen
            name="Login"
            component={LoginScreen}
            options={{
              ...headerProps,
              title: "Log In",
              headerTitle: "engram",
              headerLeft: () => {
                return null;
              },
            }}
          />
          <Drawer.Screen
            name="SignUp"
            component={LoginScreen}
            options={{
              ...headerProps,
              title: "Sign Up",
              headerTitle: "engram",
              headerLeft: () => {
                return null;
              },
            }}
            initialParams={{ isSignUp: true }}
          />
        </>
      )}
    </Drawer.Navigator>
  );
}

function LogoutScreen() {
  const theme = useColorScheme();
  const dispatch = useDispatch();

  React.useEffect(() => {
    logout(dispatch);
  }, []);
  return (
    <Link
      style={{
        fontSize: 24,
        textAlign: "center",
        color: theme === "light" ? "black" : "white",
      }}
      to="/login"
    >
      Return to login
    </Link>
  );
}
