import React, {useState} from 'react';
import {Button, Container, Header, Icon, Item, Left, Text, View} from 'native-base';
import {FlatList, TextInput} from 'react-native';
import {Calendar} from 'react-native-calendars';
import LinearGradient from 'react-native-linear-gradient';
import {store} from '../store/store';
import {addTask, updateTask} from '../store/actions';
import {dateFormat} from '../store/constants';

var moment = require('moment');

const DATA = [
    {
        id: '1',
        title: 'Personal',
        color: 'red',
    },
    {
        id: '2',
        title: 'Work',
        color: 'blue',
    },
    {
        id: '3',
        title: 'Workout',
        color: 'orange',
    },
    {
        id: '4',
        title: 'FreeLancing',
        color: 'green',
    },
    {
        id: '5',
        title: 'Shopping',
        color: 'purple',
    },
];

export const AddTaskComponent = ({route, navigation}) => {
    const categoryParam = route.params.currentCategory;
    const editItemParam = route.params.editItem;
    const [selectedDate, setSelectedDate] = useState(editItemParam ? editItemParam.createdDate : moment().format(dateFormat));
    const [value, onChangeText] = useState(editItemParam ? editItemParam.name : '');


    console.log('Adding task for ', categoryParam);
    let taskName = '';

    function Item({title, color}) {
        return (
            <View style={{height: 100}}>
                <View style={{
                    width: 50,
                    height: 50,
                    marginLeft: 7,
                    borderRadius: 25,
                    backgroundColor: color,
                    borderColor: 'white',
                    borderWidth: 2,
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.5,
                    shadowRadius: 2,
                    elevation: 2,
                }}/>
            </View>
        );
    }

    const saveTask = () => {
        console.log('ad task ', value, categoryParam, taskName, selectedDate);
        if (editItemParam) {
            //categoryId, id, name, createdDate, completed;
            store.dispatch(updateTask(categoryParam, editItemParam.id, value, selectedDate, editItemParam.completed));
        } else {
            store.dispatch(addTask(categoryParam, value, selectedDate));
        }
        navigation.goBack();
    };

    const currDate = moment().format('YYYY-MM-DD');
    const markedDate = moment(selectedDate).format('YYYY-MM-DD');
    return (
        <LinearGradient locations={[0, 1]}
                        start={{x: 1, y: 0}}
                        end={{x: 0, y: 0.5}}
                        style={{flex: 1}}
                        colors={['#6FE5DE', '#6676FD']}>
            <Container style={{paddingTop: 40, backgroundColor: 'transparent'}}>
                <Header transparent>
                    <Left>
                        <Button large style={{paddingLeft: 17}} transparent
                                onPress={() => navigation.goBack()}>
                            <Icon name='close' style={{
                                fontSize: 50,
                                width: 50,
                                height: 50,
                                position: 'relative',
                                opacity: 0.8,
                                top: -10,
                                color: 'white',
                            }}/>
                        </Button>
                    </Left>
                </Header>
                <View style={{flex: 1}}>
                    <View style={{paddingTop: 30, paddingLeft: 30, paddingRight: 30}}>
                        <Text style={{fontSize: 34, paddingTop: 2, color: 'white'}}>Add Task</Text>
                    </View>
                    <View style={{
                        paddingTop: 40,
                        paddingLeft: 15,
                        paddingRight: 15,
                        marginTop: 40,
                        backgroundColor: 'white',
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                    }}>
                        <Text style={{color: '#777', fontSize: 16, marginBottom: 8}}>What task you want to
                            perform</Text>
                        <TextInput placeholder={''} autoFocus={true}
                                   style={{
                                       fontSize: 20,
                                       fontWeight: '600',
                                       color: '#777',
                                       backgroundColor: '#fcfcfc',
                                       padding: 10,
                                       borderRadius: 4,
                                       borderWidth: 0,
                                   }}
                                   defaultValue={value}
                                   onChangeText={text => onChangeText(text)}
                                   maxLength={60}/>
                    </View>

                    <View style={{backgroundColor: 'white', flex: 1, paddingHorizontal: 10, flexDirection: 'column'}}>
                        <Calendar
                            // style={styles.calendar}
                            style={{marginTop: 25}}
                            current={currDate}
                            minDate={'2012-05-10'}
                            onDayPress={(day) => {
                                setSelectedDate(moment(day.dateString).format(dateFormat));
                            }}
                            hideExtraDays={true}

                            theme={{
                                calendarBackground: 'transparent',
                                textSectionTitleColor: 'white',
                                dayTextColor: 'black',
                                todayTextColor: 'black',
                                selectedDayTextColor: 'white',
                                monthTextColor: 'black',
                                indicatorColor: 'black',
                                selectedDayBackgroundColor: '#6676FD',

                                arrowColor: 'black',
                                // textDisabledColor: 'red',
                                'stylesheet.calendar.header': {
                                    week: {
                                        marginTop: 5,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                    },
                                },
                            }}
                            markingType={'multi-period'}
                            markedDates={{
                                [markedDate]: {
                                    selected: true,
                                    marked: true,
                                    selectedColor: 'red',
                                },
                            }}
                        />
                        <Button rounded
                                onPress={saveTask}
                                style={{
                                    marginBottom: 20,
                                    backgroundColor: '#6676FD',
                                    justifyContent: 'center',
                                    marginTop: 15,
                                    width: 200,
                                    alignSelf: 'center',
                                }}>
                            <Text style={{color: 'white'}}>Save</Text>
                        </Button>
                    </View>

                    <View style={{paddingTop: 40, flexDirection: 'row', alignItems: 'baseline', display: 'none'}}>
                        <Text style={{fontSize: 18}}>Personal</Text>
                        <Text style={{fontSize: 14, color: 'grey'}}> Category</Text>
                    </View>
                    <View style={{marginTop: 20, display: 'none'}}>
                        <FlatList
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            data={DATA}
                            renderItem={({item}) => <Item title={item.title} color={item.color}/>}
                            keyExtractor={item => item.id}
                        />

                    </View>
                </View>
            </Container>
        </LinearGradient>
    );
};

