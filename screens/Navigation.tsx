import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './Home';
import Timer from './Timer';

type RootTabParamList = {
  Home: undefined;
  Timer: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const Navigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{ headerRight: () => <Text style={{ marginRight: 20 }}>Add</Text> }}
        />
        <Tab.Screen name="Timer" component={Timer} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
