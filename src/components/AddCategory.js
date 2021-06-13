import {Button, Container, Header, Icon, Left, Text, Toast, View} from 'native-base';
import React, {useState} from 'react';
import {FlatList, TextInput, TouchableOpacity} from 'react-native';
import {store} from '../store/store';
import {addCategory} from '../store/actions';
import {CATEGORY_DATA, COLOR_CODE_MAP} from '../store/constants';
import LinearGradient from 'react-native-linear-gradient';
import {ROUTE_TASK_LIST} from '../route.keys';
import {CATEGORY_HEADER, CREATE_BTN, CREATE_CATEGORY_WARNING} from '../utils/messages';
import {
    closeBtn,
    containerStyle,
    createBtnStyles,
    createBtnTextStyle,
    headerContainer,
    headerText,
    inputContainer,
    inputStyles,
} from '../styles/AddCategory.styles';


export const AddCategory = ({navigation}) => {
    const [value, onChangeText] = useState('');
    const [selectedItem, setSelectedItem] = useState(CATEGORY_DATA[0]);
    const colorViewStyles = {
        width: 50,
        height: 50,
        marginLeft: 7,
        borderRadius: 25,
        borderColor: 'white',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    };

    const selectedStyles = {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
    };

    const setSelectedItemFun = (item) => {
        setSelectedItem(item);
    };

    const saveCategory = () => {
        if (!value) {
            Toast.show({
                text: CREATE_CATEGORY_WARNING,
                buttonText: "Okay",
                duration: 3000
            });
        return;
        }

        const newCategory = addCategory(value, selectedItem.colorKey);
        store.dispatch(newCategory);
        navigation.pop();
        const {categoryId} = newCategory.payload;
        navigation.push(ROUTE_TASK_LIST, {currentCategory: categoryId});
    };

    function Item({item}) {
        let styles = [colorViewStyles, {
            backgroundColor: item.colorKey,
        }];

        if (selectedItem.colorKey === item.colorKey) {
            styles.push(selectedStyles);
        }
        return (

            <View style={{height: 100}}>
                <TouchableOpacity onPress={setSelectedItemFun.bind(this, item)}>
                    <LinearGradient
                        locations={[0, 1]}
                        start={{x: 1, y: 0}}
                        end={{x: 0, y: 0}}
                        colors={COLOR_CODE_MAP[item.colorKey]}
                        style={colorViewStyles}>
                        {selectedItem.colorKey === item.colorKey &&
                        <Icon style={{color: 'white'}} name={'ios-checkmark'}/>}
                    </LinearGradient>
                </TouchableOpacity>

            </View>
        );
    }

    return (
        <Container style={containerStyle}>
            <Header transparent>
                <Left>
                    <Button large style={{paddingLeft: 17}} transparent
                            onPress={() => navigation.goBack()}>
                        <Icon name='close' style={closeBtn}/>
                    </Button>
                </Left>
            </Header>
            <View style={{flex: 1}}>
                <View style={headerContainer}>
                    <Text style={headerText}>{CATEGORY_HEADER}</Text>
                </View>
                <View style={inputContainer}>
                    <TextInput placeholder={''} autoFocus={true}
                               style={inputStyles}
                               defaultValue={value}
                               onChangeText={text => onChangeText(text)}
                               maxLength={60}/>
                    <View style={{marginTop: 40}}>
                        <FlatList
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            data={CATEGORY_DATA}
                            renderItem={({item}) => <Item item={item}/>}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </View>
            </View>

            <TouchableOpacity onPress={saveCategory}>
                <LinearGradient
                    locations={[0, 1]}
                    start={{x: 1, y: 0}}
                    end={{x: 0, y: 0}}
                    colors={COLOR_CODE_MAP[selectedItem.colorKey]}
                    style={createBtnStyles}>
                    <Text style={createBtnTextStyle}>{CREATE_BTN}</Text>
                </LinearGradient>
            </TouchableOpacity>
        </Container>);

};
