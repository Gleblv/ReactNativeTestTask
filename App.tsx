import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';

import { store } from './redux/store';

import Navigation from './screens/Navigation';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Navigation />
      <StatusBar />
    </Provider>
  );
};

export default App;
