import React, {useState} from 'react';
import {Button, Container, Header, Icon, Left, Text, View} from 'native-base';
import {TextInput} from 'react-native';
import {Calendar} from 'react-native-calendars';
import LinearGradient from 'react-native-linear-gradient';
import {store} from '../store/store';
import {addTask, updateTask} from '../store/actions';
import {dateFormat} from '../store/constants';
import {ADD_TASK_HEADER, HEADER, SAVE} from '../utils/messages';
import {
    calendarContainer,
    closeIcon,
    containerStyle,
    headerStyle,
    inputContainer,
    inputTextStyle,
    saveBtnStyle,
    textInputStyle,
} from '../styles/AddTask.styles';

var moment = require('moment');

export const AddTaskComponent = ({route, navigation}) => {
    const categoryParam = route.params.currentCategory;
    const editItemParam = route.params.editItem;
    const [selectedDate, setSelectedDate] = useState(editItemParam ? editItemParam.createdDate : moment().format(dateFormat));
    const [value, onChangeText] = useState(editItemParam ? editItemParam.name : '');


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
            <Container style={containerStyle}>
                <Header transparent>
                    <Left>
                        <Button large style={{paddingLeft: 17}} transparent
                                onPress={() => navigation.goBack()}>
                            <Icon name='close' style={closeIcon}/>
                        </Button>
                    </Left>
                </Header>
                <View style={{flex: 1}}>
                    <View style={inputContainer}>
                        <Text style={inputTextStyle}>{ADD_TASK_HEADER}</Text>
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
                        <Text style={headerStyle}>{HEADER}</Text>
                        <TextInput placeholder={''} autoFocus={true}
                                   style={textInputStyle}
                                   defaultValue={value}
                                   onChangeText={text => onChangeText(text)}
                                   maxLength={60}/>
                    </View>

                    <View style={calendarContainer}>
                        <Calendar
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
                                style={saveBtnStyle}>
                            <Text style={{color: 'white'}}>{SAVE}</Text>
                        </Button>
                    </View>
                </View>
            </Container>
        </LinearGradient>
    );
};

