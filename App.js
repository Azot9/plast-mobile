// import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegistrationPage from './pages/RegistrationPage';
import MemberList from './pages/MemberList';
import OneMember from './pages/OneMember';
import OneCheckList from './pages/OneCheckList';



const Stack = createStackNavigator();


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen
          name="RegistrationPage"
          component={RegistrationPage}
          options={{ headerTitle: null, headerStyle: { height: 0 } }}
        />
        <Stack.Screen 
        name="MemberList" 
        component={MemberList} 
        options={{ headerTitle: "Мій гурток" }} />
        <Stack.Screen name="OneMember" 
          component={OneMember} 
          options={({ route }) => ({ title: route.params ? route.params.member.name : "Мої проби" })}
         />
        <Stack.Screen 
          name="OneCheckList" component={OneCheckList}
          options={({ route }) => ({ title: route.params.current_list.name || "fsdf" })}
        />
      </Stack.Navigator>
    </NavigationContainer>);
};


export default App;
