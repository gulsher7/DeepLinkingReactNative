import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Home, UserDetail } from "../Screens";
import NavigationService from './NavigationService';


const Stack = createNativeStackNavigator();

function Routes() {
    return (
        <NavigationContainer ref={ref => NavigationService.setTopLevelNavigator(ref)}>
            <Stack.Navigator screenOptions={{ headerShown: false }} >
                <Stack.Screen name={'Home'} component={Home} />
                <Stack.Screen name={'UserDetail'} component={UserDetail} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes