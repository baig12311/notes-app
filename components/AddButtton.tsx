
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Colors from '../constants/color';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from './Icon';
import { useState } from 'react';
interface Props {
    onSelectImage: () => void;
    onSelectList:()=>void;
    onSelectNote:()=>void
}
const AddButton: React.FC<Props> = ({ onSelectImage, onSelectList, onSelectNote}) => {
    const [select, setSelect] = useState(false);
    return (
        // <View style={[styles.container]}>
        <View style={[styles.subContainer, !select && { alignSelf: 'center' }]}>
            <TouchableOpacity style={styles.button} onPress={() => setSelect(!select)}>
                <Icon name={select ? 'cross' : 'plus'} type='Entypo' color={Colors.white} size={wp(8)} />
            </TouchableOpacity>
            {
                select && (

                    <View style={styles.optionContainer}>
                        <View style={styles.optionSub}>
                        <TouchableOpacity onPress={onSelectNote} style={styles.optionButton}>
                                <Icon
                                    name='edit'
                                    type='AntDesign'
                                    color={Colors.white}
                                    size={wp(8)} />
                                <Text style={styles.listTxt}>Note</Text>

                            </TouchableOpacity>
                            <TouchableOpacity onPress={onSelectImage} style={styles.optionButton} >
                                <Icon
                                    name='camera-outline'
                                    type='Ionicons'
                                    color={Colors.white}
                                    size={wp(8)} />
                                <Text style={styles.listTxt}>Image</Text>

                            </TouchableOpacity>
                            <TouchableOpacity style={styles.optionButton} onPress={onSelectList}>

                                <Icon
                                    name='list'
                                    type='Entypo'
                                    color={Colors.white}
                                    size={wp(8)} />
                                <Text style={styles.listTxt}>List</Text>
                            </TouchableOpacity>
                            </View>
                            </View>
                            )
            }
        </View>



        // </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    button: {
        width: wp(14),
        height: wp(14),
        borderRadius: wp(7),
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2
    },

    optionContainer: {
        width: wp(80),
        backgroundColor: Colors.paleLavender,
        height: wp(14),
        borderRadius: wp(7),
        position: 'absolute',
        left: 10,
        paddingHorizontal: wp(10),
    },
    optionSub: {
        height: '100%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',

    },
    subContainer: {
        marginLeft: wp(3)
        //justifyContent: 'center',
        //alignItems: 'center'
    },
    listTxt: {
        fontSize: wp(3),
        fontFamily: 'Poppins-Medium',
        color: Colors.white
    },
    optionButton: {
        //borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //flexDirection: 'row'
    }
});

//make this component available to the app
export default AddButton;
