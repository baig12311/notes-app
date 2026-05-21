
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/color';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
interface Props{
    title:string;
    description:string,
    borderColor: string,
}
const NotesCard:React.FC<Props>= ({title, description, borderColor}) => {
    return (
        <View style={styles.container}>
            <View style={[styles.subContainer, {borderColor: borderColor}]}>
            <Text style={styles.title}>{title}</Text>
            <Text  style={styles.description} numberOfLines={2}>{description}</Text>
            </View>
          

        </View>
    );
};
const styles = StyleSheet.create({
    container: {
       backgroundColor: Colors.white,
       elevation:3,
       //width: wp(44),
       borderRadius: wp(2),
       marginBottom: hp(1),
       overflow: 'hidden',
       height: hp(11)
       //padding: 1
    },
    subContainer:{
        flex:1,
        borderLeftWidth: 8,
        padding: wp(3),
        //justifyContent: 'center'
    
    },
    title:{
        fontSize: wp(5),
        //fontWeight: '500',
        color: Colors.secondary,
        fontFamily: 'Poppins-Medium'

    },
    description:{
        fontSize: wp(4),
        color: Colors.whiteGrey,
        fontFamily: 'Poppins-Regular'

    }
});


export default NotesCard;
