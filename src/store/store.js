import {categoryReducer} from './categoryReducer';
import {combineReducers, createStore, applyMiddleware} from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import {persistReducer, persistStore} from 'redux-persist';
import {composeWithDevTools} from 'redux-devtools-extension';
import {intialState} from './constants';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const allReducers = combineReducers({
    categories: categoryReducer,
});

const persistedReducer = persistReducer(persistConfig, allReducers);

const composeEnhancers = composeWithDevTools({
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

export const store = createStore(persistedReducer, intialState, composeEnhancers(
    applyMiddleware(...[]),
));
export const persistor = persistStore(store);


