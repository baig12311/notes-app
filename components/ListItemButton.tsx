
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from './Icon';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Colors from '../constants/color';
interface Props{
    onPress:()=>void
}
const ListItemButton:React.FC<Props> = ({onPress}) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
              
            <Icon name ='plus' type='Entypo' color={Colors.secondary} size={wp(8)}/>
            <Text style={styles.txtAdd}>List Item</Text>

        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        //borderWidth:1
    },
    txtAdd:{
        fontFamily: 'Poppins-Medium',
        fontSize: wp(5),
        marginLeft: wp(3),
        color: Colors.secondary
    }
});

//make this component available to the app
export default ListItemButton;
