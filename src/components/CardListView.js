import React, {useState, useRef,useCallback} from 'react';
import {Dimensions, FlatList, TouchableOpacity} from 'react-native';
import {Card, Text, View, Icon} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {
    ADD_CUSTOM_CATEGORY,
    COLOR_CODE_MAP,
    CUSTOM_CATEGORY_ID,
    CUSTOM_COLOR_CODE,
} from '../store/constants';
import {NO_TASK, TASK_1, TASKS_1} from '../utils/messages';

var _ = require('lodash');

const {width: screenW, height: screenH} = Dimensions.get('window');

export const CardListView = ({onChangeColor}) => {
    const navigation = useNavigation();
    const categories = useSelector(state => state.categories || {});
    let categoryInFocus = "category_personal";


    const getTaskTitle = (category, tasks) => {
        if (!category || category === CUSTOM_CATEGORY_ID) {
            return ' ';
        } else {
            const len = (tasks || []).length;
            const label = `${len} ${len === 1 ? TASK_1 : TASKS_1}`;

            if (len <= 0) {
                return NO_TASK;
            } else {
                return `You have ${label} today`;
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


/*
    const itemChange = ({viewableItems, changed}) => {
        console.log("Visible items are", viewableItems);
        console.log("Changed in this iteration", changed);
        if (viewableItems[0] && viewableItems[0].item) {
            const itemInFocus = viewableItems[0].item;
            //onViewChange(itemInFocus);
            if (itemInFocus === CUSTOM_CATEGORY_ID) {
                onChangeColor(COLOR_CODE_MAP[CUSTOM_COLOR_CODE]);
            } else {
                if (categories[itemInFocus]) {
                    //error was coming after clicking on "ADD_CATegory"
                    onChangeColor(COLOR_CODE_MAP[categories[itemInFocus].colorCode]);
                }
            }
            currentCategory = itemInFocus;
        }

    };
*/

    const viewabilityConfig = {
        viewAreaCoveragePercentThreshold: 95,
    };

    const onOpenCard = (categoryKey) => {
        if (categoryKey === CUSTOM_CATEGORY_ID) {
            navigation.push('AddCategory', {currentCategory:categoryKey});
        } else {
            navigation.push('TaskList', {currentCategory:categoryKey});
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
          <Text style={{color: 'white', opacity , fontSize: 16, paddingBottom: 6, paddingLeft:6}}>{taskTitle}</Text>

            <TouchableOpacity activeOpacity={0.8}
                              onPress={onOpenCard.bind(this, categoryKey)}>
                <Card style={{
                    borderRadius: 8,
                    elevation: 2,
                    backgroundColor: 'white',
                    marginRight: 6,
                    marginLeft:6,
                    width: screenW - 180,
                    height: screenH / 2,
                    flexDirection: 'column',
                    padding: 20,
                }}>
                    <View style={{
                        flex: 1,
                        justifyContent: isCustom ? 'center' : 'flex-end',
                        alignItems: isCustom ? 'center' : null,
                        marginBottom: isCustom ? 20 : 40,
                    }}>
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

/*    const onViewRef = React.useRef((value) => {
        if (value && value.viewableItems[0] && value.viewableItems[0].item) {
            const itemInFocus = value.viewableItems[0].item;
            onViewChange(itemInFocus);
        }
    });*/

/*const onViewRef = React.useRef((value) => {
    if (value && value.viewableItems[0] && value.viewableItems[0].item) {
        const itemInFocus = value.viewableItems[0].item;
        onViewChange(itemInFocus);
    }
});*/

/*
*  const todaysTaskLabel = () => {
        if (currentCategory === CUSTOM_CATEGORY_ID) {
            return ' ';
        } else {
            const todaysTasks = todaysTaskByCurCategory();

            const len = (todaysTasks || []).length;
            const label = `${len} ${len === 1 ? 'task' : 'tasks'}`;

            if (len <= 0) {
                return 'You have no task today';
            } else {
                return `You have ${label} today`;
            }
        }

          const todaysTaskByCurCategory = () => {
        const tasks = categories[currentCategory].tasks;
        if (!tasks) {
            return [];
        }
        return _.filter(tasks, (task) => {
            return moment(task.createdDate, 'YYYYMMDD').isSame(moment().format(dateFormat));
        });
    };

        const onViewChange = (itemInFocus)=>{
        console.log("going back one ",categories , itemInFocus);
        if (itemInFocus) {
            if (itemInFocus === CUSTOM_CATEGORY_ID) {
                onChangeColor(COLOR_CODE_MAP[CUSTOM_COLOR_CODE]);
            } else {
                console.log("going back ",categories , itemInFocus);
                if (categories[itemInFocus]) {
                    //error was coming after clicking on "ADD_CATegory"
                    onChangeColor(COLOR_CODE_MAP[categories[itemInFocus].colorCode]);
                }
            }
            currentCategory = itemInFocus;
        }
    };
    };*/
