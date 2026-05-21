import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/color';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
interface Props{
    title: string;
    description: string,
    time: any,
}
const RecentNotesCard:React.FC<Props> = ({title, description, time}) => {
    return (
        <View style={styles.container}>
            <Text style={[styles.txt, styles.txtTitle]} numberOfLines={1}>{title}</Text>
            <Text style={[styles.txt, styles.txtDesc]} numberOfLines={2}>{description}</Text>
            <Text style={styles.time}>{time}</Text>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary,
        width: wp(44),
        height:hp(13),
        borderRadius: wp(2),
        padding: wp(2),
        elevation: 3,
        
    },
    txt:{
        color: Colors.white,

    },
    txtTitle:{
        fontSize: wp(5),
          fontFamily: 'Poppins-Medium'
    },
    txtDesc:{
        fontSize: wp(4),
        fontFamily: 'Poppins-Regular',
    }
    ,
    time:{
        alignSelf: 'flex-end',
        color: Colors.whiteGrey,
        fontSize: wp(3),
        position: 'absolute',
        bottom: 3,
        right: 5,
        fontFamily: 'Poppins-Italic',
        
    }
});


export default RecentNotesCard;
