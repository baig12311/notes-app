import React, { Component, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import { setIsList, setToDo } from '../../redux/slice';
import { RootState } from '../../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import style from './CategoriesStyle';
import Header from '../../components/Header';
import Button from '../../components/Button';
import fetchUserId from '../../Utility/fetchUserId';
import { getFirestore } from '@react-native-firebase/firestore';
import { useRouter } from 'expo-router';
import ToDoCard from '../../components/ToDoCard';
const Categories = () => {
    const dispatch=useDispatch();
    const router=useRouter()
    const {toDo} = useSelector((state: RootState) => state.notesReducer)

    const userId=fetchUserId();
    const firestore=getFirestore();
    const fetchTodo=async()=>{
        try {
            const todoDoc=await firestore.collection('Users').doc(userId).collection('Todos').get();
            if(!todoDoc.empty)
            {
                const list=todoDoc.docs.map((doc)=>({
                    id:doc.id,
                    ...doc.data(),
                    createdAt: doc.data().createdAt?.toDate().toLocaleDateString('en-GB'),
                }))
                dispatch(setToDo(list))

            }
        } catch (error) {
            
        }
    }
   
    useEffect(()=>{
        fetchTodo()
    }, [toDo])
    const todoDetails=(item:any)=>{
        dispatch(setIsList(true))
        router.push({pathname: '../(tabs)/AddNote', params:{listDetails: JSON.stringify(item)}})
    }
    const renderToDo=({item}: any)=>{
        return(
         <ToDoCard title={item.title} items={item.listItems} onPress={()=>todoDetails(item)}/>
        )

        
    }
    return (
        <View style={style.container}>
            <Header title='My To Do List' onPress={()=>null}/>
            <View style={style.mainContainer}>
                <FlatList data={toDo} renderItem={renderToDo}/>
            </View>
            {/* <View style={style.buttonContainer}>
            <Button title='Add new folder' onPress={()=>null}/>

            </View> */}
        </View>
    );
};


export default Categories;
