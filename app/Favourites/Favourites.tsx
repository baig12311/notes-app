//import liraries
import React, { Component, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import MyNotesCard from '../../components/MyNotesCard';
import style from '../MyNotes/MyNotesStyle';
import { setSavedNotes, setLoading} from '../../redux/slice';
import { RootState } from '../../redux/store';
import { useDispatch,useSelector } from 'react-redux';
import fetchNotes from '../../Utility/fetchNotes';
import showMessage from '../../Utility/ToastMessage';
import Header from '../../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../../constants/color';
const Favourites = () => {
    const colorsList = [
        Colors.paleLavender,
        Colors.crimsonRed,
        Colors.mintGreen,
        Colors.sunRay,
        Colors.skyBlue,

        Colors.primary,

    ]
    const { savedNotes,loading, setNotes } = useSelector((state: RootState) => state.notesReducer);
    const dispatch=useDispatch();
    const getSavedNotes=async()=>{
        dispatch(setLoading(true))
        try {
            const list=await AsyncStorage.getItem('savedNotes');
            const notesList=JSON.parse(list);
            dispatch(setSavedNotes(notesList))
            dispatch(setLoading(false))
        } catch (error) {
            showMessage('Error Fetching Notes')
        }
    }
    
    useEffect(()=>{
        getSavedNotes()
    }, [savedNotes])
    const removeNote=async(item:any)=>{
        //AsyncStorage.clear();
        const updatedNotes=savedNotes.filter((note:any)=>note.id!==item.id)
        setSavedNotes(updatedNotes);
        console.log(savedNotes);
        await AsyncStorage.setItem('savedNotes', JSON.stringify(updatedNotes))
    }
    
    const renderNotes=({ item, index }: { item: any, index: number })=>{
        const borderColor = colorsList[index % colorsList.length]
        return(
            <MyNotesCard 
            title={item.title} 
            description={item.description}
            date={item.createdAt}
            onPressSave={()=>removeNote(item)}
            isSaved={true}
            borderColor={borderColor}
            />
            
        )

    }

    return (
        <View style={style.container}>
            
            <Header title='Favourites'/>
            {
                savedNotes&&savedNotes.length!==0?(
                    <FlatList data={savedNotes} 
                    renderItem={renderNotes} 
                    numColumns={2} 
                    keyExtractor={item=>item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    />
                ):(
                    <View style={style.errorContainer}>
                    <Text style={style.txtError}>You don't have any saved notes yet!</Text>

                    </View>
                )


            
            }
            


       
        </View>
    );
};


export default Favourites;
