import React from 'react';
import {Dimensions, FlatList, TouchableOpacity} from 'react-native';
import {Card, Icon, Text, View} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {
    ADD_CUSTOM_CATEGORY,
    COLOR_CODE_MAP,
    CUSTOM_CATEGORY_ID,
    CUSTOM_COLOR_CODE,
    INITIAL_CATEGORY_ID,
} from '../store/constants';
import {NO_TASK, TASK_1, TASKS_1, TASKS_INFO} from '../utils/messages';
import {ROUTE_ADD_CATEGORY, ROUTE_TASK_LIST} from '../route.keys';
import {cardViewStyle, customCardViewStyle, HomeCardStyle, labelStyle} from '../styles/CardListView.styles';

var _ = require('lodash');

const {width: screenW, height: screenH} = Dimensions.get('window');

export const CardListView = ({onChangeColor}) => {
    const navigation = useNavigation();
    const categories = useSelector(state => state.categories || {});
    let categoryInFocus = INITIAL_CATEGORY_ID;


    const getTaskTitle = (category, tasks) => {
        if (!category || category === CUSTOM_CATEGORY_ID) {
            return ' ';
        } else {
            const len = (tasks || []).length;
            const label = `${len} ${len === 1 ? TASK_1 : TASKS_1}`;

            if (len <= 0) {
                return NO_TASK;
            } else {
                return TASKS_INFO(label);
            }
        }
    };

    const onViewRef = React.useRef((value) => {
        if (value && value.viewableItems[0] && value.viewableItems[0].item) {
            const itemInFocus = value.viewableItems[0].item;
            if (itemInFocus) {
                categoryInFocus = itemInFocus.categoryId;
                if (itemInFocus.categoryId === CUSTOM_CATEGORY_ID) {
                    onChangeColor(COLOR_CODE_MAP[CUSTOM_COLOR_CODE]);
                } else {
                    onChangeColor(COLOR_CODE_MAP[itemInFocus.colorCode]);
                }
            }
        }
    });

    const viewabilityConfig = {
        viewAreaCoveragePercentThreshold: 95,
    };

    const onOpenCard = (categoryKey) => {
        if (categoryKey === CUSTOM_CATEGORY_ID) {
            navigation.push(ROUTE_ADD_CATEGORY, {currentCategory:categoryKey});
        } else {
            navigation.push(ROUTE_TASK_LIST, {currentCategory:categoryKey});
        }
    };

    function Item({categoryKey}) {
        const isCustom = categoryKey === CUSTOM_CATEGORY_ID;

        const item = isCustom ? ADD_CUSTOM_CATEGORY : categories[categoryKey];
        const len = (item.tasks || []).length;
        const label = `${len} ${len === 1 ? TASK_1 : TASKS_1}`;
        const taskTitle = getTaskTitle(categories[categoryKey], item.tasks);

        let cardContent;
        if (isCustom) {
            cardContent = <>
                <Icon style={{fontSize: 35, opacity: 0.5}} name={'md-add'}/>
            </>;
        } else {
            cardContent = <>
                <Text style={{fontSize: 16, color: 'grey'}}>
                    {label}
                </Text>
                <Text style={{fontSize: 28, marginTop: 6}}>
                    {item.name}
                </Text>
            </>;
        }

        const opacity = categoryInFocus === categoryKey?  1 : 0;
        return (
            <View>
          <Text style={[labelStyle, {opacity}]}>{taskTitle}</Text>

            <TouchableOpacity activeOpacity={0.8}
                              onPress={onOpenCard.bind(this, categoryKey)}>
                <Card style={[HomeCardStyle, {height: screenH/2}]}>
                    <View style={isCustom? customCardViewStyle : cardViewStyle}>
                        {cardContent}
                    </View>
                </Card>
            </TouchableOpacity>
            </View>
        );
    }

    if (!categories) {
        return null;
    }

    const data = Object.values(categories);
    data.push(ADD_CUSTOM_CATEGORY);

    return (
        <>
            <FlatList
                showsHorizontalScrollIndicator={false}
                pagingEnabled={true}
                snapToAlignment={'start'}
                durationRate={'fast'}
                snapToInterval={screenW - 200}
                style={{flex: 1, flexDirection: 'row'}}
                contentContainerStyle={{padding:10}}
                horizontal={true}
                data={data}
                renderItem={({item}) => <Item categoryKey={item.categoryId}/>}
                keyExtractor={item => item.categoryId}
                onViewableItemsChanged={onViewRef.current}
                viewabilityConfig={viewabilityConfig}
            />
        </>
    );
};
