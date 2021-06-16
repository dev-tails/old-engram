import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import moment from 'moment';
import * as React from 'react';
import { Alert, AppState } from 'react-native';
import { Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';

import { primaryColor } from '../constants/Colors';
import { fetchNotes } from '../redux/actions/NotesActions';
import LogScreen from '../screens/LogScreen';
import { BottomTabParamList } from '../types';

type BottomTabNavigatorProps = {};

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const selectDate = (state: any) => {
  return state.date;
};

export default function BottomTabNavigator({}: BottomTabNavigatorProps) {
  const dispatch = useDispatch();
  const date = useSelector(selectDate);

  React.useEffect(() => {
    if (AppState.currentState === "active") {
      fetchNotes(dispatch, {
        date: moment(date).format("YYYY-MM-DD"),
      }).catch((err) => {
        Alert.alert("Error", err.message);
      });
    }
  }, [date]);

  return (
    <BottomTab.Navigator
      initialRouteName="All"
      tabBarOptions={{
        activeTintColor: primaryColor,
      }}
    >
      <BottomTab.Screen
        name="All"
        component={LogScreen}
        options={{
          tabBarIcon: ({ color }) => <Icon name="list" color={color} />,
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
