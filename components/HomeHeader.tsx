import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Touchable, TouchableOpacity } from 'react-native';
import Colors from '../constants/color';
import Icon from './Icon';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
interface props {
    url: string,
    onPress:()=>void
}
const HomeHeader: React.FC<props> = ({ url, onPress }) => {
    const [greet, setGreet] = useState('');
    
    useEffect(() => {
        const hour = new Date().getHours();
        const min=new Date().getMinutes();
       
        if (hour>=4&&hour < 12) {
            setGreet('🌤 Good Morning!')
            // setIconName('cloud')
            // setIcontype('Entypo')

        }
        else if (hour>=12 && hour < 18) {
            setGreet('☀️ Good Afternoon!')
            // setIconName('moon-sharp');
            // setIcontype('Ionicons')
            // setIconName('sun')
            // setIcontype('Feather')

        }
        else {
            setGreet('🌚 Good Night!')
            // setIconName('moon-sharp');
            // setIcontype('Ionicons')
        }
        
    })
    return (
        <View style={styles.container}>
                      <Image source={{ uri: url }} style={styles.imageProfile} resizeMode='contain' />

            <View style={styles.greetContainer}>
                {/* <Text>🌃</Text>
                <Icon name={iconName}
                    type={iconType}
                    color={iconName === 'sun' ? Colors.sunRay : iconName === 'cloud' ? Colors.whiteGrey : Colors.whiteGrey}
                    size={wp(7)} /> */}
                <Text style={styles.txtGreet}>
                {greet}
                </Text>
            </View>
            <TouchableOpacity onPress={onPress}>
            <Icon name='sign-out' size={wp(8)} color={Colors.crimsonRed} type='FontAwesome' />

            </TouchableOpacity>

        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp(2),
        
    },
    imageProfile: {
        borderWidth: 1,
        borderColor: Colors.whiteSmoke,
        width: wp(12),
        height: wp(12),
        borderRadius: wp(6),

    },
    txtGreet: {
        fontSize: wp(4.5),
        //width: '70%',
        //borderWidth: 1,
        color: Colors.secondary,
        fontFamily: 'Poppins-Medium',
        textAlign: 'center',
        marginLeft: wp(1),
        

    },
    greetContainer: {
       
        flexDirection: 'row',
        alignItems: 'center'
    }
});
export default HomeHeader;
