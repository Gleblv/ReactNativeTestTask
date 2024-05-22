import React from 'react';
import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import Home from './Home';
import Timer from './Timer';
import ModalView from '../components/ModalView';

type RootTabParamList = {
  Home: undefined;
  Timer: undefined;
};

export type HomeProps = NativeStackScreenProps<RootTabParamList, 'Home'>;

const Tab = createBottomTabNavigator<RootTabParamList>();

const Navigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{ headerRight: () => <Button title="Add" /> }}
        />
        <Tab.Screen name="Timer" component={Timer} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
