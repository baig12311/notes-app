import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable, TouchableOpacity, Image} from 'react-native';
import { widthPercentageToDP as wp, 
    heightPercentageToDP as hp } 
    from 'react-native-responsive-screen';
import Colors from '../constants/color';
import Icon from './Icon';
interface buttonProps{
    title: string, 
    onPress:()=>void,
}
const Button: React.FC<buttonProps> = ({title, onPress}) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            {
                title==='Add new folder' ? (<Icon name='plus' type='Entypo' color={Colors.white} size={wp(6)}/>            
            ):
            ( <Image source={require('../assets/googleLogo.png')} style={styles.logoGoogle}/>)
            }
           
            <Text style={[styles.txtButton, 
                {color: title==='Add new folder'? Colors.white: Colors.secondary}]}>{title}</Text>

            
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    container: {
        //padding: wp(2),
        backgroundColor: Colors.paleLavender,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
        borderRadius: wp(2),
        elevation: 3,
        width: '70%',
        height: hp(6)
    },
    txtButton:{
        fontSize: wp(4.5),
        //color: Colors.secondary,
       
        fontFamily: 'Poppins-Medium',
        
    },
    logoGoogle: {
        width: wp(7),
        height: wp(7),
        marginRight: wp(3)
    }
});

export default Button;
