//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Colors from '../constants/color';
import Icon from './Icon';
interface Props{
    isCh:any,
    onValueChange: any,
    onChangeText:any,
    value:any,
    onDeleteItem: ()=>void
}
const ListItem:React.FC<Props> = ({isCh, onValueChange, onChangeText, value, onDeleteItem}) => {
    return (
        <View style={styles.container}>
          
           
            <Icon name ='more-vertical' type='Feather' color={Colors.secondary} size={wp(7)}/>
          
                        


            <Checkbox style={styles.checkBox}
            value={isCh} onValueChange={onValueChange}
            />
            <TextInput style={styles.inputField} multiline={true} autoFocus={true}
            value={value}
            onChangeText={onChangeText}/>
            <TouchableOpacity onPress={onDeleteItem}>
            <Icon name ='cross' type='Entypo' color={Colors.secondary} size={wp(8)}/>

            </TouchableOpacity>

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
       //borderWidth:1,
       alignItems: 'center',
       marginBottom: hp(2)
    },
    checkBox:{
        width: wp(6),
        height: wp(6),
        borderRadius: wp(1),
    },
    inputField:{
        //borderWidth:1,
        flex:1,
        fontFamily:'Poppins-Light',
        //height: hp(4),
        fontSize: wp(5),
        padding:wp(1),
        marginHorizontal:wp(2),
        color: Colors.secondary
        
    }
});

//make this component available to the app
export default ListItem;
