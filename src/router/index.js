import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Register,
  Login,
  Splash,
  History,
  Form,
  Dashboard,
  CameraCheck,
  CheckSuccess,
  Welcome,
} from '../pages';

const Stack = createStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Register"
        component={Register}
        options={{title: 'Register'}}
      />
      <Stack.Screen name="Login" component={Login} options={{title: 'Login'}} />
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Form" component={Form} options={{title: 'Form'}} />
      <Stack.Screen
        name="History"
        component={History}
        options={{title: 'History'}}
      />

      <Stack.Screen
        name="CameraCheck"
        component={CameraCheck}
        options={{title: 'Check-in'}}
      />
      <Stack.Screen
        name="CheckSuccess"
        component={CheckSuccess}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;
