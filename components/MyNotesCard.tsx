//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/color';
import Icon from './Icon';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
interface Props {
    title: string;
    description: string,
    date: string,
    onPressSave: () => void;
    onPress: () => void;
    onLongPress: () => void
    isSaved: boolean,
    isSelected: boolean,
    borderColor: string
}
const MyNotesCard: React.FC<Props> = ({ borderColor, title, description, date, onPress, isSaved, onPressSave, onLongPress, isSelected }) => {
    return (
        <TouchableOpacity style={[styles.container, {borderColor: borderColor,borderBottomWidth:!isSelected?5:2}, isSelected && styles.selectedCard]} onPress={() => onPress()} onLongPress={onLongPress}>
            <Text style={[styles.txt, styles.txtTitle]}>{title}</Text>
            <Text style={[styles.txt, styles.txtDesc]} numberOfLines={6}>{description}</Text>

            <View style={styles.bottomContainer}>
                <Text style={styles.txtDate}>{date}</Text>
                <TouchableOpacity onPress={() => onPressSave()} 
                //</View>style={styles.buttonSave}
                >
                    <Icon name={isSaved ? 'star' : 'staro'} type='AntDesign' color={isSaved ? Colors.sunRay : Colors.secondary} size={wp(6)} />

                </TouchableOpacity>
            </View>



        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        elevation: 3,
        borderRadius: wp(2),
        //alignSelf: 'flex-start',
        width: wp(43),
        margin: wp(1),
        padding: wp(2),
        maxHeight: hp(30)
        //height: hp(25),
        //borderBottomWidth:5,
        //borderColor: Colors.primary
    },
    bottomContainer: {
        flexDirection: 'row',
        
        justifyContent: 'space-between',
        alignItems: 'center',
        //marginTop: wp(1)
    },
    txt: {
        fontFamily: 'Poppins-Medium',


    },
    txtTitle: {
        color: Colors.secondary,
        fontSize: wp(4.5),
    },
    txtDesc: {
        color: Colors.charcoalGrey,
        fontSize: wp(4)
    },
    txtDate: {
        fontFamily: 'Poppins-Italic',
        color: Colors.charcoalGrey,
        fontSize: wp(3),
        // position: 'absolute',
        // bottom: 5,
        // left: 5
    },
    // buttonSave:{
    //     position: 'absolute',
    //     bottom: 5,
    //     right: 5
    // }
    
    selectedCard: {
        borderWidth: 2,
        borderColor: Colors.primary,
        backgroundColor: Colors.whiteGrey
    }
});

//make this component available to the app
export default MyNotesCard;
