import {Button, Container, Header, Icon, Left, Text, View} from 'native-base';
import React, {useState} from 'react';
import {FlatList, TextInput, TouchableOpacity} from 'react-native';
import {store} from '../store/store';
import {addCategory} from '../store/actions';
import {CATEGORY_DATA, COLOR_CODE_MAP, CUSTOM_COLOR_CODE} from '../store/constants';
import LinearGradient from 'react-native-linear-gradient';


/*const colorKeys = {
    'red': {
        color1: '',
        color2: '',
    },
};*/

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
        const newCategory = addCategory(value, selectedItem.colorKey);
        store.dispatch(newCategory);
        navigation.pop();
        const {categoryId} = newCategory.payload;
        navigation.push('TaskList', {currentCategory: categoryId});
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
        <Container style={{
            paddingTop: 40, backgroundColor: 'white',
        }}>
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
                            color: 'black',
                        }}/>
                    </Button>
                </Left>
            </Header>
            <View style={{flex: 1}}>
                <View style={{paddingTop: 100, paddingLeft: 30, paddingRight: 30}}>
                    <Text style={{fontSize: 34, paddingTop: 2, color: 'black'}}>Add Category</Text>
                </View>
                <View style={{
                    paddingLeft: 15,
                    paddingRight: 15,
                    marginTop: 30,
                    marginHorizontal: 18,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                }}>
                    <TextInput placeholder={''} autoFocus={true}
                               style={{
                                   fontSize: 20,
                                   fontWeight: '600',
                                   color: '#777',
                                   padding: 10,
                                   borderRadius: 4,
                                   borderBottomWidth: 1,
                                   borderColor: '#000',
                               }}
                               defaultValue={value}
                               onChangeText={text => onChangeText(text)}
                               maxLength={60}/>
                    <View style={{paddingTop: 40, flexDirection: 'row', alignItems: 'baseline'}}>
                        <Text style={{fontSize: 14, color: 'grey', display: 'none'}}> Category</Text>
                    </View>
                    <View style={{marginTop: 20}}>
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
                    style={{
                        marginBottom: 90, marginTop: 15,
                        width: 200,
                        height: 45,
                        alignSelf: 'center',
                        justifyContent: 'center',
                        borderRadius: 20,
                    }}>
                    <Text style={{color: 'white', fontSize: 20, letterSpacing: 0.5, alignSelf: 'center'}}>Create</Text>
                </LinearGradient>
            </TouchableOpacity>
        </Container>);

};
