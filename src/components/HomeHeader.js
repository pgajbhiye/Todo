import React from 'react';
import {Button, Icon} from 'native-base';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export const HomeHeader = () => {
    const navigation = useNavigation();

    return (
        <View style={{height: 40}}>
            <Button transparent onPress={() => {
                navigation.toggleDrawer();
            }}>
                <Icon name={'menu'}/>
            </Button>
        </View>
    );
};


