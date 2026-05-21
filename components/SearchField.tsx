//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput} from 'react-native';
import Colors from '../constants/color';
import Icon from './Icon';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
interface fieldProps{
    value:string;
    onChangeText: any;
}
const SearchField: React.FC<fieldProps> = ({value, onChangeText}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.noteHeading}>Notes</Text>
            <View style={styles.inputField}>
                <Icon name='search'color={Colors.whiteGrey} size={wp(6)} type='EvilIcons'/>
            <TextInput 
            placeholder='Search' 
            value={value} 
            onChangeText={onChangeText}
            style={styles.input}/>
            </View>
           
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        marginBottom: hp(2),
    },
    inputField:{
        flexDirection: 'row',
        height: hp(5),
        paddingHorizontal: wp(2),
        alignItems: 'center',
        backgroundColor: Colors.whiteSmoke,
        borderRadius: wp(2),
                //borderWidth:0.5,
                elevation:3

    },
    input:{
        
        flex:1,
        paddingLeft: wp(2),
        height: '100%',
        fontSize: wp(4),
        fontFamily: 'Poppins-Regular',
        //borderWidth: 1
    },
    noteHeading:{
        color: Colors.secondary,
        fontSize: wp(5),
        marginBottom: hp(1),
        fontFamily: 'Poppins-Medium',
        
    }
});


export default SearchField;
