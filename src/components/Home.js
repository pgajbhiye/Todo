import React from 'react';
import {Container, H1, Text, View} from 'native-base';
import {CardListView} from './CardListView';
import {HomeGradientBg} from './HomeGradientBg';

var moment = require('moment');
export const Home = ({navigation}) => {
    let gradientRef;

    function onClickHandler(colorCode) {
        if(gradientRef){
            gradientRef.setColor(colorCode);
        }
    }

    return (
        <View style={{height:"100%"}}>
            <HomeGradientBg ref={r=>gradientRef=r}/>
            <Container style={{paddingTop: 50, backgroundColor: 'transparent'}}>
                <View style={{paddingTop: 40, paddingLeft: 16}}>
                    <H1 style={{color: '#FFFFFF', fontSize: 34}}>{moment().format('dddd')}</H1>
                    <Text style={{color: '#FFFFFF', fontSize: 21}}>{moment().format('MMM DD')}</Text>
                </View>
                <View style={{paddingTop: 100, flex: 1}}>
                    <CardListView onChangeColor={onClickHandler}/>
                </View>
            </Container>
        </View>
    );
};
