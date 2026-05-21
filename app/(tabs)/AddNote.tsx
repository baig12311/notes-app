import React, { Component, useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Image, KeyboardAvoidingView, Platform, FlatList } from 'react-native';
import style from '../styles/AddNoteStyle';
import Header from '../../components/Header';
import { RootState } from '../../redux/store';
import { setTitle, setDescription, clearText, setLoading, setIsNoteSelected, setImagePath, setIsList, setListItems, setCheckedTask } from '../../redux/slice';
import { UseSelector, useDispatch, useSelector } from 'react-redux';
import fetchUserId from '../../Utility/fetchUserId';
import firebase from '@react-native-firebase/app'
//import firestore from "@react-native-firebase/firestore"

import { getFirestore } from "@react-native-firebase/firestore"
import { useLocalSearchParams, useRouter } from 'expo-router';
import showMessage from '../../Utility/ToastMessage';
import AddButton from '../../components/AddButtton';
import { useFocusEffect } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import ListItem from '../../components/ListItem';
import ListItemButton from '../../components/ListItemButton';
import Checkbox from 'expo-checkbox';
import { useNavigation } from 'expo-router';
const AddNote = () => {
    const navigation=useNavigation()
    const router = useRouter();
    const firestore = getFirestore()
    const userId = fetchUserId();
    const dispatch = useDispatch();
    
    const { title, description, loading, isNoteSelected, imagePath, isList, listItems, toDo, checkedTask} = useSelector((state: RootState) => state.notesReducer)
    const { note, todoData, listDetails} = useLocalSearchParams<any>();
    let noteDetails = note ? JSON.parse(note) : null;
    //console.log(todoData)
    let toDoDetails=todoData? JSON.parse(todoData):null;
    let lisDetailsData=listDetails?JSON.parse(listDetails):null
    useEffect(() => {
        const unsubscribeFocus = navigation.addListener('focus', () => {
            //console.log('Add Screen focused!');
            //dispatch(setIsNoteSelected(false))
            if(noteDetails&&isNoteSelected)
            {
               
                dispatch(setTitle(noteDetails.title));
                dispatch(setDescription(noteDetails.description));
            }
            if(toDoDetails&&!isList)
                {
                    dispatch(setIsList(true));
                    dispatch(setListItems(toDoDetails))
                    //console.log(listItems)
                }          
            
          });
      
        
          const unsubscribeBlur = navigation.addListener('blur', () => {
            //console.log('Add Screen blurred!');
            dispatch(clearText())
            dispatch(setIsNoteSelected(false))
            dispatch(setIsList(false))
            dispatch(setListItems([]))
            noteDetails=[]
            
          });
      
         
          return () => {
            unsubscribeFocus();
            unsubscribeBlur();
          };

       
    }, [navigation]) // Added noteDetails as a dependency
    useEffect(()=>{
        if(isList && lisDetailsData)
        {
            dispatch(setTitle(lisDetailsData.title));
            dispatch(setListItems(lisDetailsData.listItems))
        }
        const check=listItems.filter((item:any)=>item.isChecked);
        dispatch(setCheckedTask(check));
    }, [isList])
    const imagePicker = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
        })
        if (!result.canceled) {
            const path = result.assets[0].uri;
            dispatch(setImagePath(path));
        }
    }
    const listScreen = () => {
        dispatch(setIsList(true));
    }
    const handleAdd = async () => {

    //      console.log('handleAdd called');
    // console.log('userId:', userId);
    // console.log('firestore instance:', firestore());
        if(isList && listItems)
        {
            const test=toDo.some((item:any)=>item.id===lisDetailsData.id)
            //console.log("Exist: ", test);
            
            dispatch(setLoading(true))
            try {
                if(test)
                {
                    await firestore.collection('Users').doc(userId).collection('Todos').doc(lisDetailsData.id).set({
                        title,
                        //description,
                        listItems,
                        createdAt: firebase.firestore.FieldValue.serverTimestamp()
                    })
                    showMessage('To-Do Edit')
                }
                else
                {
                    await firestore.collection('Users').doc(userId).collection('Todos').add({
                        title,
                        //description,
                        listItems,
                        createdAt: firebase.firestore.FieldValue.serverTimestamp()
                    })
                    showMessage('To-Do Added')
                }
                
                dispatch(setListItems([]));
                dispatch(setLoading(false));
                router.back();
               
            } catch (error) {
                
            }
        }
        if (title && description)
            {
            dispatch(setLoading(true))
            try {
                let result;
                console.log('try');
                if (isNoteSelected) {
                    await firestore.collection('Users').doc(userId).collection('Notes').doc(noteDetails.id).set({
                        title,
                        description,
                        createdAt: firebase.firestore.FieldValue.serverTimestamp()
                    })
                    showMessage('Note Edit')
                }
                else {
                 
                   
                //console.log('adding')                  
                    await firestore
                    .collection('Users')
                    .doc(userId)
                    .collection('Notes')
                    .add({
                        title,
                        description,
                        //image: imagePath,
                        createdAt: firebase.firestore.FieldValue.serverTimestamp()
                    })
                    showMessage('Note Added')
                }

                dispatch(clearText());
                dispatch(setLoading(false));
                router.back();

            } catch (error) {
 console.log("Firestore Error:", error);
   dispatch(setLoading(false));
            }

        }
    }
    const deleteItem=(id:any)=>{
        const listAfterDelete=listItems.filter((item:any)=>item.id!==id)
        dispatch(setListItems(listAfterDelete))
    }
    const handleCheckboxToggle = async(id: string) => {
        const updatedList = listItems.map((item: any) =>
            item.id === id ? { ...item, isChecked: !item.isChecked } : item
        );
        dispatch(setListItems(updatedList));
        // const checkedList=listItems.filter((item:any)=>item.isChecked);
        // const unCheckedList=listItems.filter((item:any)=>!item.isChecked);
        // dispatch(setListItems(unCheckedList))
        // console.log('Checked Tasks: ', checkedList)
        // console.log('UnChecked Tasks: ', unCheckedList)


        // await firestore.collection('Users').doc(userId).collection('Todos').doc(id).update({
        //     //title,
        //     //description,
        //     listItems,
        //     //createdAt: firebase.firestore.FieldValue.serverTimestamp()
        // })
    };
    const handelItemText=(id:string, value:string)=>{
        const updatedList = listItems.map((item: any) =>
            item.id === id ? { ...item, value: value } : item
        );
        dispatch(setListItems(updatedList)); 
    }
    const renderList = ({item}:any) => {
        return (<ListItem key={item.id} onDeleteItem={()=>deleteItem(item.id)} isCh={item.isChecked} onValueChange={()=>handleCheckboxToggle(item.id)}
        onChangeText={(newValue:string)=>handelItemText(item.id, newValue)}
        value={item.value}/>)

    }
    //console.log(listItems)
    const addListItem = () => {
      
        const newItem = {
            value: '',
            isChecked: false,
            id: Date.now().toString(),
            
        }
        const newList = [...listItems, newItem];
        dispatch(setListItems(newList));
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={
                style.container
            }>
            <Header onPress={() => handleAdd()} title={isNoteSelected ? 'Edit Note' : isList ? 'To-Do' : 'Add Note'} />

            <ScrollView contentContainerStyle={style.textContainer} showsVerticalScrollIndicator={false}>
                {
                    imagePath && (<Image source={{ uri: imagePath }} style={style.imageStyle} />)
                }
                <TextInput
                    placeholder='Add Title'
                    style={style.txtTitle}
                    multiline={true}
                    value={title}
                    onChangeText={(text) => dispatch(setTitle(text))}
                />
                {
                    isList ? (
                        <View style={style.listContainer}>
                            {/* <FlatList data={listItems} renderItem={renderList} /> */}
                            {
                                listItems?.map((item:any, index:any)=>{return renderList({item})}
                                )
                            }
                            <ListItemButton onPress={() => addListItem()} />
                                {
                                    checkedTask.map((item:any)=>{
                                        return(
                                            <View key ={item.id}>
                                                <Text>{item.value}</Text>
                                            </View>
                                        )
                                    })
                                }
                        </View>
                       
                    ) : (<TextInput
                        placeholder='Type something.....'
                        style={style.txtDescription}
                        multiline={true}
                        value={description}
                        key="description_input"
                        //scrollEnabled={false}
                        //contextMenuHidden={false}
                        onChangeText={(text) => dispatch(setDescription(text))}
                    />)
                }

            </ScrollView>
            {
                !isNoteSelected&&( <View style={style.addContainer}>
                    <AddButton
                        onSelectImage={() => imagePicker()}
                        onSelectList={() => listScreen()}
                        onSelectNote={()=>dispatch(setIsList(false))}
                    />
                </View>)
            }
           
        </KeyboardAvoidingView>
        // <View style={style.container}>

        // </View>
    );
};
export default AddNote;
