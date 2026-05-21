//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/color';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Icon from './Icon';
interface customButtonProps{
    
    title: string,
    onPress:()=>void
}
const CustomButtons: React.FC<customButtonProps> = ({onPress, title}) => {
    let iconName:string='', iconType:string='', back: string ='';
    if(title==='Favourites')
    {
        iconName= 'staro'
        iconType= 'AntDesign'
        back= Colors.sunRay
    }
    if(title==='My Notes')
    {
        iconName= 'note'
        iconType='Octicons'
        back= Colors.mintGreen
    }
    if(title==='To Do-s')
        {
            iconName= 'playlist-check'
        iconType= 'MaterialCommunityIcons'
        back= Colors.skyBlue
        }
        if(title==='Shared')
            {
                iconName= 'share-2'
        iconType= 'Feather'
        back= Colors.crimsonRed
            }
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={[styles.iconContainer, {backgroundColor: back}]}>
                <Icon name ={iconName} size={wp(5.5)} color={Colors.white} type={iconType}/>
            </View>
            <Text style={styles.txtButton}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        elevation: 3,
        borderRadius: wp(2),
      
        alignItems: 'center',
        flexDirection: 'row',
        width: wp(44),
        height: hp(7),
        paddingHorizontal: wp(2),
        marginVertical: wp(1)
    },
    iconContainer:{
        width: wp(10),
        height: wp(10),
        borderRadius: wp(5),
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: wp(2)
    },
    txtButton:{
        fontSize: wp(4),
        color: Colors.secondary,
        //fontWeight: '500',
        fontFamily: 'Poppins-Medium',
        flexWrap: 'wrap',
        flex:1,
       
    }
        
});


export default CustomButtons;
