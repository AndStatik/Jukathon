import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Library from "../screens/Library";
import Player from "../screens/Player";
import Playlist from "../screens/Playlist";
import {Text} from 'react-native'
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarStyle: {
    backgroundColor: "#343434",
  },
};

export default function AppNavigator() {
  return (
    <Tab.Navigator {...{ screenOptions }}>
      <Tab.Screen
        name="Library"
        component={Library}
        options={{
          tabBarLabel:({ focused })=>(<Text style={{color:focused?"orange":'#898a8b'}}>Library</Text>),
          tabBarIcon: ({ focused, size }) => (
            <MaterialIcons name="library-music" size={size} color={focused?"orange":'#898a8b'} />
          ),
        }}
      />
      <Tab.Screen
        name="Player"
        component={Player}
        options={{
          tabBarLabel:({ focused })=>(<Text style={{color:focused?"orange":'#898a8b'}}>Player</Text>),
          tabBarIcon: ({ focused, size }) => (
            <Ionicons name="md-musical-notes" size={size} color={focused?"orange":'#898a8b'} />
          ),
        }}
      />
      <Tab.Screen
        name="Playlist"
        component={Playlist}
        options={{
          tabBarLabel:({ focused })=>(<Text style={{color:focused?"orange":'#898a8b'}}>Playlist</Text>),
          tabBarIcon: ({ focused, size }) => (
            <MaterialCommunityIcons
              name="playlist-music"
              size={size}
              color={focused?"orange":'#898a8b'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
