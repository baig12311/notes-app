//import liraries
import React, { Component, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, ScrollView, DevSettings } from 'react-native';
import MyNotesCard from '../../components/MyNotesCard';
import style from './MyNotesStyle';
import { setNotes, setLoading, setSelectedNotes, setIsNoteSelected, setIsModalVisible, setSearchText } from '../../redux/slice';
import { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import fetchNotes from '../../Utility/fetchNotes';
import showMessage from '../../Utility/ToastMessage';
import Header from '../../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
//@ts-ignore
import MasonryList from "react-native-masonry-list";
import Loader from '../../components/Loader';
import { useRouter } from 'expo-router';
import DeleteHeader from '../../components/DeleteHeader';
import { firebase } from '@react-native-firebase/firestore';
import { getFirestore } from '@react-native-firebase/firestore';
import fetchUserId from '../../Utility/fetchUserId';
import Colors from '../../constants/color';
import ConfirmatinDialog from '../../components/ConfirmationDialog';
const MyNotes = () => {
    const router = useRouter()
    const userId = fetchUserId();
    const firestore = getFirestore()
    const { Notes, loading, savedNotes, selectedNotes, isModalVisible } = useSelector((state: RootState) => state.notesReducer);
    const dispatch = useDispatch();
    const left: any[] = []
    const right: any[] = []
    Notes.forEach((note: any, index: number) => {
        if (index % 2 === 0) {
            left.push(note);
        }
        else {
            right.push(note);
        }

    });
    const colorsList = [
        Colors.paleLavender,
        Colors.crimsonRed,
        Colors.mintGreen,
        Colors.sunRay,
        Colors.skyBlue,

        Colors.primary,

    ]
    console.log('left', left)
    console.log('right', right)
    // const getNotes=async()=>{

    //     try {
    //         const list=await fetchNotes();
    //         dispatch(setNotes(list));
    //     } catch (error) {
    //         showMessage('Error Fetching Notes')
    //     }
    // }
    // useEffect(()=>{
    //     getNotes()
    // }, [Notes, savedNotes])
    useEffect(() => {
        dispatch(setSearchText(''))
        const unsubscribe = fetchNotes(dispatch);



        return () => {

            unsubscribe();

        };
    }, [savedNotes]);
    const saveLocally = async (item: any) => {
        //setLoading(true);
        const savedNotes = await AsyncStorage.getItem('savedNotes');
        let notes = savedNotes ? JSON.parse(savedNotes) : [];
        notes.unshift(item);
        await AsyncStorage.setItem('savedNotes', JSON.stringify(notes));
        //setLoading(false);
        showMessage('Notes Saved Successfully!')
    }
    const detailScreen = (item: any) => {
        dispatch(setIsNoteSelected(true));

        router.push({
            pathname: '../(tabs)/AddNote', params: {
                note: JSON.stringify(item),


            }
        })
    }
    const deleteNotes = (id: any) => {
        const updatedSelectedNotes = selectedNotes.includes(id)
            ? selectedNotes.filter((noteId: any) => noteId !== id)
            : [...selectedNotes, id];


        dispatch(setSelectedNotes(updatedSelectedNotes));
       

    }
    // const renderNotes = ({ item, index }: { item: any, index: number }) => {
    //     const borderColor = colorsList[index % colorsList.length]
    //     const isSaved = savedNotes?.some((notes: any) => notes.id === item.id)
    //     const isSelected = selectedNotes.includes(item.id);
    //     console.log('Rendering')

    //     return (
    //         <MyNotesCard
    //             title={item.title}
    //             description={item.description}
    //             date={item.createdAt}
    //             onPressSave={() => saveLocally(item)}
    //             isSaved={isSaved}
    //             onPress={() => detailScreen(item)}
    //             onLongPress={() => deleteNotes(item.id)}
    //             isSelected={isSelected}
    //             borderColor={borderColor}

    //         />

    //     )

    // }
    const handleCancel = () => {
        dispatch(setSelectedNotes([]))
    }


    //const showDilaoge=()=>
    const handleDelete = async () => {
        //dispatch(setIsModalVisible(true));
        dispatch(setLoading(true));
        try {
            for (let noteId of selectedNotes) {
                //console.log(`Deleting note with ID: ${noteId}`);
               await firestore.collection('Users').doc(userId).collection('Notes').doc(noteId).delete();
               
            }
            
            dispatch(setLoading(false));
            dispatch(setSelectedNotes([]));
            showMessage('Selected Notes Deleted Successfuly')
            dispatch(setIsModalVisible(false))

        } catch (error) {
            const generalError = error as Error;
            showMessage(generalError)
        }
    }
    console.log(left.length, right.length)
    return (
        <View style={style.container}>


            {
                selectedNotes.length !== 0 ? (<DeleteHeader
                    selected={selectedNotes.length}
                    total={Notes.length}
                    onPressCancel={() => handleCancel()}
                    onPressDelete={() => dispatch(setIsModalVisible(true))} />)
                    : (<Header title='My Notes' onPress={() => null} />)
            }
            {
                isModalVisible&&(<ConfirmatinDialog
                msg='Selected Notes will be permanently deleted!'
                txtButton='Delete'
                    modalVisible={isModalVisible} 
                    onPressCancel={()=>dispatch(setIsModalVisible(false))}
                    onPressDelete={()=>handleDelete()}
                    />)
            }
            <View style={{flex:1}}>
                {
                    (left || right) &&(left.length!==0||right.length!==0)? (
                        <ScrollView contentContainerStyle={style.noteContainer} showsVerticalScrollIndicator={false}>
                           
                            <View>
                                {
                                    left.map((item, index) => {
                                        const borderColor = colorsList[index % colorsList.length]
                                        const isSaved = savedNotes?.some((notes: any) => notes.id === item.id)
                                        const isSelected = selectedNotes.includes(item.id);
                                        
                                        return (
                                            <MyNotesCard
                                                title={item.title}
                                                description={item.description}
                                                date={item.createdAt}
                                                onPressSave={() => saveLocally(item)}
                                                isSaved={isSaved}
                                                onPress={() => detailScreen(item)}
                                                onLongPress={() => deleteNotes(item.id)}
                                                isSelected={isSelected}
                                                borderColor={borderColor}
                                                key={item.id}

                                            />
                                        )
                                    }
                                    )
                                }
                            </View>
                            <View>
                                {
                                    right.map((item, index) => {
                                        const borderColor = colorsList[index % colorsList.length]
                                        const isSaved = savedNotes?.some((notes: any) => notes.id === item.id)
                                        const isSelected = selectedNotes.includes(item.id);
                                        return (
                                            <MyNotesCard
                                                title={item.title}
                                                description={item.description}
                                                date={item.createdAt}
                                                onPressSave={() => saveLocally(item)}
                                                isSaved={isSaved}
                                                onPress={() => detailScreen(item)}
                                                onLongPress={() => deleteNotes(item.id)}
                                                isSelected={isSelected}
                                                borderColor={borderColor}
                                                key={item.id}

                                            />
                                        )
                                    }
                                    )
                                }
                            </View>

                        </ScrollView>
                    ) : (
                        <View style={style.errorContainer}>
                            <Text style={style.txtError}>You don't have any notes yet!</Text>

                        </View>)
                }



            </View>

        </View>
    );
};


export default MyNotes;
