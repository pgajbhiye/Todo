import React from 'react';
import {Container} from 'native-base';
import {HomeHeader} from './HomeHeader';
import {useNavigation} from '@react-navigation/native';

export const Notifications = () => {
    const navigation = useNavigation();

    return (
        <Container style={{flex: 1, backgroundColor: 'red', paddingTop: 50}}>
            <HomeHeader nav={navigation}/>
        </Container>
    );
};
