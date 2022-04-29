import React from 'react'
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import AudioList from '../screens/AudioList';
import Player from '../screens/Player';
import Playlist from '../screens/Playlist';
import { MaterialIcons, MaterialCommunityIcons, Ionicons} from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return <Tab.Navigator>
    <Tab.Screen name='AudioList' component={AudioList} options={{
      tabBarIcon: ({color, size}) => (<MaterialIcons name="library-music" size={size} color={color} />
      )}
    }/>
    <Tab.Screen name='Player' component={Player} options={{
      tabBarIcon: ({color, size}) => (<Ionicons name="md-musical-notes" size={size} color={color} />
      )}
    }/>
    <Tab.Screen name='Playlist' component={Playlist} options={{
      tabBarIcon: ({color, size}) => (<MaterialCommunityIcons name="playlist-music" size={size} color={color} />
      )}
    }/>
  </Tab.Navigator>
}
