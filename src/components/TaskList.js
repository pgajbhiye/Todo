import React from 'react';
import {
    ActionSheet,
    Body,
    Button,
    CheckBox,
    Container,
    Fab,
    Header,
    Icon,
    Left,
    ListItem,
    Text,
    View,
} from 'native-base';

import {SectionList, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {dateFormat} from '../store/constants';
import {deleteTask, updateTask} from '../store/actions';
import {store} from '../store/store';
import {ROUTE_ADD_TASK} from '../route.keys';


const OPTIONS = ['Edit', 'Delete', 'Cancel'];
const DESTRUCTIVE_INDEX = 1;
const CANCEL_INDEX = 2;

var _ = require('lodash');
var moment = require('moment');

const formatDate = (dateKey) => {
    const dateObj = moment(dateKey, dateFormat);
    return dateObj.calendar(moment(), {
        sameDay: '[Today]',
        nextDay: '[Tomorrow]',
        nextWeek: 'dddd',
        lastDay: '[Yesterday]',
        lastWeek: '[Last] dddd',
        sameElse: 'DD/MM/YYYY',
    });
};

export const TaskList = ({route, navigation}) => {
        const categoryParam = route.params.currentCategory;
        const categoryObj = useSelector(state => state.categories[categoryParam] || {});

        const prepareData = () => {
            var timedata = _.groupBy(categoryObj.tasks, (task) => {
                return task.createdDate;
            });
            return Object.keys(timedata).map((key) => {
                return {
                    id: key,
                    title: formatDate(key),
                    color: 'red',
                    data: timedata[key],
                };
            });
        };

        const showOptions = (item) => {
            ActionSheet.show(
                {
                    options: OPTIONS,
                    cancelButtonIndex: CANCEL_INDEX,
                    destructiveButtonIndex: DESTRUCTIVE_INDEX,
                    title: 'Choose an action',
                },
                buttonIndex => {
                    if (OPTIONS[buttonIndex] === 'Delete') {
                        store.dispatch(deleteTask(categoryParam, item.id));
                    } else if (OPTIONS[buttonIndex] === 'Edit') {
                        navigation.push(ROUTE_ADD_TASK, {currentCategory: categoryParam, editItem:item});
                        // store.dispatch(updateTask(categoryParam, item.id, item.name, item.createdDate, item.completed));
                    }
                },
            );
        };

        function Item({item}) {
            const styles = item.completed ? {
                textDecorationLine: 'line-through',
                fontStyle: 'italic',
                textDecorationStyle: 'solid',
            } : {};
            return (
                <ListItem noIndent>
                    <CheckBox checked={item.completed} onPress={() => {
                        store.dispatch(updateTask(categoryParam, item.id, item.name, item.createdDate, !item.completed));
                    }}/>
                    <Body>
                        <Text style={styles}>{item.name}</Text>
                    </Body>
                    <TouchableOpacity onPress={showOptions.bind(this, item)}>
                        <Icon type="MaterialCommunityIcons" name={'dots-vertical'}
                              style={{fontSize: 16, color: '#808080'}}/>
                    </TouchableOpacity>
                </ListItem>
            );
        }

        const TEST_DATA = prepareData();
        const len = (categoryObj.tasks || []).length;
        const label = `${len} ${len === 1 ? 'Task' : 'Tasks'}`;
        return (
            <Container style={{backgroundColor: '#FFFFFF'}}>
                <Header transparent>
                    <Left>
                        <Button style={{paddingLeft: 20}} transparent onPress={() => navigation.goBack()}>
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                </Header>
                <View style={{flex: 1, paddingLeft: 30, paddingRight: 30}}>
                    <View style={{paddingTop: 30}}>
                        <Text style={{fontSize: 17, color: 'grey'}}>{label}</Text>
                        <Text style={{fontSize: 34, paddingTop: 2}}>{categoryObj.name}</Text>
                    </View>
                    <View style={{marginTop: 30, paddingBottom: 60}}>
                        <SectionList
                            sections={TEST_DATA}
                            keyExtractor={(item) => item.id}
                            renderItem={({item}) => <Item item={item}/>}
                            renderSectionHeader={({section: {title}}) => (
                                <Text
                                    style={{fontSize: 12, color: 'grey', paddingBottom: 10, paddingTop: 20}}>{title}</Text>
                            )}
                        />
                    </View>
                </View>
                <Fab
                    active={true}
                    direction="up"
                    containerStyle={{}}
                    style={{backgroundColor: '#5067FF'}}
                    position="bottomRight"
                    onPress={() => {
                        navigation.push('AddTask', {currentCategory: categoryParam});
                    }}>
                    <Icon name="add"/>
                </Fab>
            </Container>
        );
    }
;
