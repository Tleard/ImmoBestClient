import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PostsScreen from '../screens/PostsScreen';
import { FontAwesome } from '@expo/vector-icons';
import createAdvertisementScreen from "../screens/createAdvertisementScreen";


const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerShown: false, tabBarVisible: false });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarVisible : false,
          title: 'Déconnexion',
          tabBarIcon: ({ focused }) => <FontAwesome focused={focused} name="power-off" size={30} color="black"/>,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => <FontAwesome focused={focused} name="user" size={30} color="black"/>,
        }}
      />
        <BottomTab.Screen
            name="Posts"
            component={PostsScreen}
            options={{
                title: 'Posts',
                tabBarIcon: ({ focused }) => <FontAwesome focused={focused} name="key" size={30} color="black"/>,
            }}
        />
        <BottomTab.Screen
            name="createAdvertisement"
            component={createAdvertisementScreen}
            options={{
                title: 'Créer une Annonce',
                tabBarIcon: ({ focused }) => <FontAwesome focused={focused} name="pencil-square-o" size={30} color="black"/>,
            }}
        />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'How to get started';
    case 'Profile':
      return 'Profile';
  }
}
