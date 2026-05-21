//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from './Icon';
import Colors from '../constants/color';
import { useRouter } from 'expo-router';
interface Props {
    onPress: () => void;
    title: string
}
const Header: React.FC<Props> = ({ onPress, title }) => {
    const router = useRouter()
    return (
        <View style={styles.container}>
            <View style={styles.icon}>
                <TouchableOpacity onPress={() => router.back()} >

                    <Icon name='arrow-back' size={wp(7)} color={Colors.primary} type='Ionicons' />


                </TouchableOpacity>
            </View>

            <Text style={styles.headerTitle}>{title}</Text>
            {
                title === 'Add Note' || title=== 'Edit Note'|| title=== 'To-Do'? (
                    <View style={styles.save}>
                        <TouchableOpacity onPress={onPress}>
                            <Icon name='bookmark-o' size={wp(7)} color={Colors.secondary} type='FontAwesome' />
                        </TouchableOpacity>
                    </View>

                ) : (<View style={{ flex: 1 }}></View>)
            }


        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: hp(2),

    },
    headerTitle: {
        fontFamily: 'Poppins-Medium',
        fontSize: wp(5),
        //flex:1,

        textAlign: 'center'
    },
    icon: {
        flex: 1,

    },
    save: {
        flex: 1,
        alignItems: 'flex-end',
    }
});

//make this component available to the app
export default Header;
