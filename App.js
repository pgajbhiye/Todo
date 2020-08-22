import 'react-native-gesture-handler';
import React from 'react';

import {Root} from 'native-base';
import {Home} from './src/components/Home';
import {createDrawerNavigator} from '@react-navigation/drawer';
import NavigationContainer from '@react-navigation/native/src/NavigationContainer';
import {createStackNavigator} from '@react-navigation/stack';
import {TaskList} from './src/components/TaskList';
import {AddTaskComponent} from './src/components/AddTask';
import {persistor, store} from './src/store/store';
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import {AddCategory} from './src/components/AddCategory';

const Drawer = createDrawerNavigator();


/*const App: () => React$Node = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="Home" component={Home} />
                <Drawer.Screen name="Notifications" component={Notifications} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
};*/
const Stack = createStackNavigator();

const initializeDefaultStore = () => {

};

const App: () => React$Node = () => {
    return (
        <Root>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                <NavigationContainer>
                    <Stack.Navigator cardOverlayEnabled={true}
                                     headerMode={null} initialRouteName="Home">
                        <Stack.Screen name="Home" component={Home}/>
                        <Stack.Screen name="TaskList" component={TaskList}/>
                        <Stack.Screen name="AddTask" component={AddTaskComponent}/>
                        <Stack.Screen name="AddCategory" component={AddCategory}/>
                    </Stack.Navigator>
                </NavigationContainer>
                </PersistGate>
            </Provider>
        </Root>
    );
};

export default App;
