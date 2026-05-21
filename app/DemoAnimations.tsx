//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
// create a component
const DemoAnimations = () => {
    const width=useSharedValue(20);
    const translateX=useSharedValue(0);

    const onButtonPressed=()=>{
       width.value=withSpring(width.value+20);
    }
    const handleTransform=()=>{
        translateX.value=translateX.value+20;
     }
     const AnimatedStyle=useAnimatedStyle(()=>({
        transform:[{translateX:withSpring(translateX.value*3)}]
     }))

    return (
        <View style={styles.container}>
           <Animated.View style={[styles.subContainer, {width}]}>
           
           </Animated.View>
           <TouchableOpacity style={styles.button} onPress={()=>onButtonPressed()}>
            <Text style={styles.txt}>Animate</Text>
           </TouchableOpacity>
           <Animated.View style={[styles.subContainer1, AnimatedStyle]}>
           
           </Animated.View>
           <TouchableOpacity style={styles.button} onPress={()=>handleTransform()}>
            <Text style={styles.txt}>Transform</Text>
           </TouchableOpacity>
           
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    subContainer:{
        height: 20,
        backgroundColor: 'black',
        borderRadius: 20,
        marginBottom: 20
    },
    subContainer1:{
        width: 20,
        height: 20,
        backgroundColor: 'black',
        borderRadius: 20,
        marginBottom: 20
    },
    button:{
        padding:10,
        backgroundColor: 'red',
        width: 200,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20
    },
    txt:{
        fontSize: 20,
        fontWeight: '500',
        color: 'white'
    }
});

//make this component available to the app
export default DemoAnimations;
