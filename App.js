import 'react-native-gesture-handler';
import React from 'react';

import {Root} from 'native-base';
import {Home} from './src/components/Home';
import NavigationContainer from '@react-navigation/native/src/NavigationContainer';
import {createStackNavigator} from '@react-navigation/stack';
import {TaskList} from './src/components/TaskList';
import {AddTaskComponent} from './src/components/AddTask';
import {persistor, store} from './src/store/store';
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import {AddCategory} from './src/components/AddCategory';
import {ROUTE_ADD_CATEGORY, ROUTE_ADD_TASK, ROUTE_HOME, ROUTE_TASK_LIST} from './src/route.keys';

const Stack = createStackNavigator();

const App: () => React$Node = () => {
    return (
        <Root>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                <NavigationContainer>
                    <Stack.Navigator cardOverlayEnabled={true}
                                     headerMode={null} initialRouteName={ROUTE_HOME}>
                        <Stack.Screen name={ROUTE_HOME} component={Home}/>
                        <Stack.Screen name={ROUTE_TASK_LIST} component={TaskList}/>
                        <Stack.Screen name={ROUTE_ADD_TASK} component={AddTaskComponent}/>
                        <Stack.Screen name={ROUTE_ADD_CATEGORY} component={AddCategory}/>
                    </Stack.Navigator>
                </NavigationContainer>
                </PersistGate>
            </Provider>
        </Root>
    );
};

export default App;
