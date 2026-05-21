import React, { Component } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Colors from '../constants/color';
interface Props{
    modalVisible: boolean,
    onPressCancel:()=>void,
    onPressDelete:()=>void,
    msg:string,
    txtButton: string
}
const ConfirmatinDialog:React.FC<Props> = ({modalVisible, onPressCancel, onPressDelete, msg, txtButton}) => {
    return (
       

       
        <Modal visible={modalVisible} transparent={true} animationType='fade'>
 <View style={styles.modalView}>
       <View style={styles.modalContentView}>
            <Text style={[styles.txt, styles.txtAtten]}>Attention</Text>
            <Text style={[styles.txt, styles.msg]}>{msg}</Text>
            <View style={styles.buttonContianer}>
                <TouchableOpacity onPress={onPressCancel}>
                    <Text style={[styles.txt, styles.txtCancel]}>
                        Cancel
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onPressDelete}>
                    <Text style={[styles.txt, styles.txtDlt]}>
                        {txtButton}</Text>
                </TouchableOpacity>
            </View>
           
       </View>
    
            
        </View>
        </Modal>
        
       
    );
};


const styles = StyleSheet.create({
    modalView:{
        flex:1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalContentView:{
        //justifyContent: 'center',
        //alignItems: 'center',
        //borderWidth: 1,
        elevation: 3,
        backgroundColor: Colors.white,
        width: wp(90),
        alignSelf: 'center',
        borderRadius:wp(2),
        padding: wp(5),
        

    }, 
    buttonContianer:{
       
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    txt: {
        //color: Colors.secondary,
        textAlign: 'center',
        fontFamily: 'Poppins-Medium',
        marginBottom: wp(4)
    },
    txtAtten:{
        fontSize: wp(6),
        color: Colors.secondary
    },
    msg:{
        fontSize: wp(4),
        color: Colors.whiteGrey
    },
    txtDlt:{
        color: Colors.crimsonRed,
        fontSize: wp(4)
    },
    txtCancel:{
        color: Colors.whiteGrey,
        fontSize: wp(4)
    }

});

//make this component available to the app
export default ConfirmatinDialog;
