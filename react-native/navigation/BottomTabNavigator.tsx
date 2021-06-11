/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { Icon } from 'react-native-elements';
import { useDispatch } from 'react-redux';

import Colors, { primaryColor } from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { fetchUser } from '../redux/actions/UserActions';
import LogScreen from '../screens/LogScreen';
import { BottomTabParamList } from '../types';

// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
type BottomTabNavigatorProps = {
  navigation: any;
};

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator({
  navigation,
}: BottomTabNavigatorProps) {
  const colorScheme = useColorScheme();

  const dispatch = useDispatch();

  React.useEffect(() => {
    fetchUser(dispatch).then((user) => {
      if (!user) {
        navigation.navigate("Login");
      }
    });
  }, []);

  return (
    <BottomTab.Navigator
      initialRouteName="All"
      tabBarOptions={{
        activeTintColor: primaryColor,
        // inactiveBackgroundColor: primaryColor,
        // activeBackgroundColor: primaryColor,
      }}
      // barStyle={{ backgroundColor: "#3f50af" }}
    >
      <BottomTab.Screen
        name="All"
        component={LogScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="list-outline" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Notes"
        component={LogScreen}
        initialParams={{
          type: "note",
        }}
        options={{
          tabBarIcon: ({ color }) => <Icon name="remove" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Tasks"
        component={LogScreen}
        initialParams={{
          type: "task",
        }}
        options={{
          tabBarIcon: ({ color }) => <Icon name="check-box" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Events"
        component={LogScreen}
        initialParams={{
          type: "event",
        }}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="radio-button-unchecked" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}
