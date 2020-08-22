import React from 'react';
import {FlatList, Dimensions} from 'react-native';
import {View, Text, Body, CardItem, Card} from 'native-base';
import ViewPager from '@react-native-community/viewpager';

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
];

const {width: screenW, height: screenH} = Dimensions.get('window');

export const CardPager = () => {
    function Item({title}) {
        return (
            <Card style={{
                borderRadius: 5,
                elevation: 2,
                backgroundColor: 'white',
                marginLeft: 10,
                marginRight: 10,
                width: screenW - 100,
                height: screenH / 2,
                flexDirection: 'column',
                padding: 20,
            }}>
                <Body>
                    <Text>
                        {title}
                    </Text>
                </Body>
            </Card>
        );
    }

    return (
        <ViewPager showPageIndicator={true} style={{flex: 1}} initialPage={0}>
            <View style={{backgroundColor: 'transparent'}} key="1">
                <Card style={{
                    borderRadius: 5,
                    elevation: 2,
                    marginLeft:20,
                    marginRight:20,
                    backgroundColor: 'white',
                    height: screenH / 2,
                    flexDirection: 'column',
                    padding: 20,
                }}>
                    <Body>
                        <Text>
                            test
                        </Text>
                    </Body>
                </Card>
            </View>
            <View style={{backgroundColor: 'transparent'}} key="2">
                <Card style={{
                    borderRadius: 5,
                    elevation: 2,  marginLeft:20,
                    marginRight:20,
                    backgroundColor: 'white',
                    height: screenH / 2,
                    flexDirection: 'column',
                    padding: 20,
                }}>
                    <Body>
                        <Text>
                            test 2
                        </Text>
                    </Body>
                </Card>
            </View>
        </ViewPager>
    );
};

