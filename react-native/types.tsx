/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  All: undefined;
  Notes: {
    type: "note"
  };
  Tasks: {
    type: "task"
  };
  Events: {
    type: "event"
  };
};

export type LogParamList = {
  LogScreen: undefined;
  NotesScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};
