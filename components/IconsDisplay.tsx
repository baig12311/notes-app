//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from './Icon';
import Colors from '../constants/color';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
// const containerWidth= wp(100)
// const containerHeight=hp(20)
const Icons=[
    {
        id:1,
        name: 'edit',
        type: 'AntDesign',
        left: 0,
        top: 50,
        right: 0,
        bottom:0
    },
    {
        id:2,
        name: 'bell-ring-outline',
        type: 'MaterialCommunityIcons',
        left: 45,
        top: 10,
        right: 0,
        bottom: 0
    },
    {
        id:3,
        name: 'clipboard-outline',
        type: 'Ionicons',
        left: 65,
        top: 100,
        right: 0,
        bottom:10,
    },
    {
        id:4,
        name: 'note',
        type: 'Octicons',
       
        top: 10,
        right: 55,
    
    },
    {
        id:5,
        name: 'notes',
        type: 'MaterialIcons',
        
      
        right: 45,
        bottom:10,
    },
    {
        id:6,
        name: 'edit',
        type: 'AntDesign',
       
        top: 55,
        right: 0,
        
    },
    {
        id:7,
        name: 'note',
        type: 'SimpleLineIcons',
    },
    
    
]
const IconDisplay = () => {
    // const getRandomPosition = () => {
    //     const x = Math.floor(Math.random() * (containerWidth-30)); // Random X position
    //     const y = Math.floor(Math.random() * (containerHeight-30)); // Random Y position
    //     return { top: y, left: x };
    //   };
    return (
        <View style={styles.container}>
            {
                Icons.map((item)=>{
                    const iconSize=item.id===7? wp(8) : wp(6) 
                    // const randomPosition=getRandomPosition();
                    const top=item.top
                    const left=item.left
                    const right=item.right
                    const bottom= item.bottom
                    return(<View key={item.id} style={[styles.iconStyle, {top: top, left: left, right: right, bottom: bottom}, item.id===7&&styles.large]}>
                        <Icon type={item.type} name={item.name} color={Colors.secondary} size={iconSize}/>
                    </View>)
                    
                })
            }
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        height: hp(20),
        position: 'relative',
        //borderWidth:1,
        marginBottom: hp(3)
    },
    iconStyle: {
       backgroundColor: Colors.paleLavender,
       width: wp(12),
       height: wp(12),
       borderRadius: wp(6),
       justifyContent: 'center',
       alignItems: 'center',
       position: 'absolute',

    },
    large:{
        width: wp(18),
        height: wp(18),
        borderRadius: wp(9)
    }
});

//make this component available to the app
export default IconDisplay;
