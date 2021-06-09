/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { useDispatch } from 'react-redux';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { fetchUser } from '../redux/actions/UserActions';
import LogScreen from '../screens/LogScreen';
import { BottomTabParamList, LogParamList } from '../types';

type BottomTabNavigatorProps = {
  navigation: any;
}

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator({navigation}: BottomTabNavigatorProps) {
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
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="All"
        component={LogScreen}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="list-outline" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Notes"
        component={LogScreen}
        initialParams={{
          type: "note"
        }}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="remove" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Tasks"
        component={LogScreen}
        initialParams={{
          type: "task"
        }}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ellipse" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Events"
        component={LogScreen}
        initialParams={{
          type: "event"
        }}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ellipse-outline" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const LogStack = createStackNavigator<LogParamList>();

function LogNavigator() {
  return (
    <LogStack.Navigator headerMode="none">
      <LogStack.Screen
        name="LogScreen"
        component={LogScreen}
        options={{ headerTitle: 'Log' }}
      />
      <LogStack.Screen
        name="NotesScreen"
        component={LogScreen}
        options={{ headerTitle: 'Notes' }}
      />
    </LogStack.Navigator>
  );
}
