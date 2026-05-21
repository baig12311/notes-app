
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Colors from '../constants/color';
import Icon from './Icon';
interface Props{
    selected:number;
    total:number;
    onPressCancel:()=>void;
    onPressDelete:()=>void

}
const DeleteHeader:React.FC<Props> = ({total, selected, onPressCancel, onPressDelete}) => {
    return (
        <View style={styles.container}>
          <TouchableOpacity onPress={onPressCancel}>
            <Icon name ='cross' type='Entypo' color={Colors.secondary} size={wp(8)}/>
          </TouchableOpacity>
          <Text style={styles.txt}>{selected}/{total}</Text>
          <TouchableOpacity onPress={onPressDelete}>
            <Icon name ='delete-outline' type='MaterialCommunityIcons' color={Colors.crimsonRed} size={wp(8)}/>
          </TouchableOpacity>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
       //borderWidth:1,
       flexDirection: 'row',
       marginBottom: hp(2)
    },
    txt:{
        fontFamily: 'Poppins-Medium',
        fontSize: wp(5),
        flex:1,
        marginLeft: wp(5),
        color: Colors.whiteGrey
    }
});


export default DeleteHeader;
