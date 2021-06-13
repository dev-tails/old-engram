import 'react-native-gesture-handler';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer, persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import thunkMiddleware from 'redux-thunk';

import { primaryColor } from './constants/Colors';
import GlobalStyle from './GlobalStyle';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import rootReducer from './redux/reducers';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const composedEnhancer = composeWithDevTools(
    applyMiddleware(thunkMiddleware)
  );

  const persistedReducer = persistReducer(
    {
      key: "root",
      storage: AsyncStorage,
      whitelist: ["user", "date"],
    },
    rootReducer
  );

  const store = createStore(persistedReducer, composedEnhancer);
  let persistor = persistStore(store);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaProvider>
            <GlobalStyle css="input {outline: none;}" />
            <Navigation colorScheme={colorScheme} />
            <StatusBar style={"light"} backgroundColor={primaryColor} />
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    );
  }
}
