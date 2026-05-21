//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ListItem from './ListItem';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Colors from '../constants/color';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { setItemCheckedCount } from '../redux/slice';
interface Props {
    title: string,
    items: any,
    onPress:()=>void
}
const ToDoCard: React.FC<Props> = ({ title, items, onPress}) => {
    const [demo, setDemo]=useState(0)
    const dispatch=useDispatch()
    let {itemCheckedCount} = useSelector((state: RootState) => state.notesReducer)
useEffect(()=>{
   

    let newList=items.filter((item:any)=>item.isChecked)
   
    if(newList.length!==0)
    {
        
        setDemo(newList.length)

    }
   

    
}, [items, dispatch])
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text style={styles.txtTitle}>{title}</Text>
            {
                items.map((item:any)=>{
                    return(
                        
                            <View key={item.id} >
                                {
                                    !item.isChecked&&(
                                        <View style={styles.itemListStyle}>
<View style={styles.check}></View>
                                        <Text style={styles.txt}>{item.value}</Text>
                                        </View>
                                        
                                    )
                                }
                           
                            
                               
                                {/* <ListItem value={item.value} isCh={item.isChecked} /> */}
                                
                               
                                
                                
                                </View >
                            
                        
                       
                    )
                    
                })

            }
           
           {
                        demo!==0 &&(
                            <Text style={styles.countTxt}>
                            +{demo} Checked Items
                        </Text>
                        )
                    }
           
                        </TouchableOpacity>
                      
    );
};



const styles = StyleSheet.create({
    container: {
        marginBottom: hp(1),
        //elevation: 3,
        backgroundColor : Colors.white,
        padding: wp(4),
        borderWidth: 1,
        borderRadius: wp(2),
        borderColor: Colors.whiteGrey
    },
    itemListStyle:{
        flexDirection:'row',
      
        alignItems: 'center'
    },
    check:{
        width: wp(4),
        height: wp(4),
        borderRadius: wp(1),
        borderWidth:1,
        marginRight: wp(3)
    },
    txt:{
        fontSize: wp(4),
        fontFamily: 'Poppins-Light',
        color: Colors.secondary
    },
    txtTitle:{
        fontSize: wp(5),
        fontFamily: 'Poppins-Medium',
        color: Colors.secondary
    },
    countTxt:{
        fontSize: wp(3.5),
        fontFamily: 'Poppins-Italic',
        color: Colors.whiteGrey
    }
});

//make this component available to the app
export default ToDoCard;
