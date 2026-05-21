//import liraries
import React, { Component, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import style from '../styles/HomeScreenStyle';
import HomeHeader from '../../components/HomeHeader';
import SearchField from '../../components/SearchField';
import CustomButtons from '../../components/CustomButtons';
import { getAuth } from '@react-native-firebase/auth';
import fetchNotes from '../../Utility/fetchNotes';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { setNotes, setRecentNotes, setLoading, setIsNoteSelected, setIsModalVisible, setSearchText, setSearchNotes, setToDo } from '../../redux/slice';
import NotesCard from '../../components/NotesCard';
import Colors from '../../constants/color';
import { useRouter } from 'expo-router';
import RecentNotesCard from '../../components/RecentNotesCard';
import Loader from '../../components/Loader';
import AddButton from '../../components/AddButtton';
import GoogleSignin from '../../googleconfig';
import showMessage from '../../Utility/ToastMessage';
import { Drawer } from 'expo-router/drawer';
import fetchUserId from '../../Utility/fetchUserId';
import ConfirmatinDialog from '../../components/ConfirmationDialog';
const HomeScreen = () => {
    const userId=fetchUserId();
    const router = useRouter();
    const colorsList = [
        Colors.paleLavender,
        Colors.crimsonRed,
        Colors.mintGreen,
        Colors.sunRay,
        Colors.skyBlue,

        Colors.primary,

    ]
    const dispatch = useDispatch();
    const auth = getAuth();
    const { Notes, recentNotes, loading, isModalVisible, searchText, searchNotes} = useSelector((state: RootState) => state.notesReducer)
    useEffect(() => {
       
        const unsubscribe = fetchNotes(dispatch); 
        //dispatch(setLoading(false))
      
    
        return () => {
           
            unsubscribe();
            
        };
    }, [userId]);
    const handleSearch=(text:any)=>{
        dispatch(setSearchText(text));
        if(text)
        {
            const searchData=Notes.filter((note:any)=>JSON.stringify(note).toLowerCase().includes(text.toLowerCase()));
     
            dispatch(setSearchNotes(searchData));
        }
        else{
            dispatch(setSearchNotes([]))
            dispatch(setSearchText(''))
        }
       
    }
    // const getNotes = async () => {
    //     const getFetchedNotes = await fetchNotes();

    //     dispatch(setNotes(getFetchedNotes));
    //     dispatch(setLoading(false));

    // }
    const renderNotes = ({ item, index }: { item: any, index: number }) => {

        const borderColor = colorsList[index % colorsList.length]
        return (
            <NotesCard title={item.title} description={item.description} borderColor={borderColor} />
        )

    }
    //     const renderRecentNotes=({item}: any)=>{
    // return(
    // <RecentNotesCard title={item.title} description={item.description} />

    // )
    //     }
    const getRecentNotes = () => {
       
            const recent = Notes?.slice(0, 2)
            dispatch(setRecentNotes(recent));
        
       
        // console.log(recent);
    }
    useEffect(() => {
        getRecentNotes()
    }, [Notes])
    // useEffect(() => {
    //     getNotes();
    // }, [Notes])
    const signOut = async () => {
        dispatch(setLoading(true));
        try {
            await GoogleSignin.signOut();
            await auth.signOut();
            
            
               showMessage('Signed Out!')
               dispatch(setRecentNotes([]))
               dispatch(setNotes([]));
               dispatch(setToDo([]));
                router.replace('../MainScreen/MainScreen')
                dispatch(setLoading(false));

          
        } catch (error) {
            const generalError=error as Error;
            showMessage(generalError)
        }
        dispatch(setIsModalVisible(false))
    }


    const currentUser = auth.currentUser;
    const imageURL = currentUser?.photoURL || '';
    // console.log(imageURL)
    
    return (



        <View style={style.container}>
          

            {/* <View style={style.profileMenu}>
            <TouchableOpacity onPress={() => signOut()}><Text>Sign out</Text></TouchableOpacity>

            </View> */}
            {
                loading ? (<Loader visible={loading} /> ) : (
                    <View style={{ flex: 1 }}>
                        <HomeHeader url={imageURL} onPress={()=>dispatch(setIsModalVisible(true))} />
                            {
                                isModalVisible&&(<ConfirmatinDialog
                                modalVisible={isModalVisible}
                                onPressCancel={()=>dispatch(setIsModalVisible(false))}
                                onPressDelete={()=>signOut()}
                                msg='Are you sure, You want to Sign Out?'
                                txtButton='Sign Out'
                                />)
                            }
                        <SearchField value={searchText} onChangeText={(text:any)=>handleSearch(text)}/>
                        <View style={style.customButtonContainer}>
                            <CustomButtons title='My Notes' onPress={() => router.push('../MyNotes/MyNotes')} />
                            <CustomButtons title='Favourites' onPress={() => router.push('../Favourites/Favourites')} />
                            <CustomButtons title='To Do-s' onPress={() => router.push('../Categories/Categories')} />
                            <CustomButtons title='Shared' onPress={() => router.push('../DemoAnimations')} />
                        </View>



                        {
                            searchText&&searchNotes&&searchNotes.lenghth!==0?(
                               
                                <FlatList data={searchNotes}
                                ListHeaderComponent={ <Text style={style.searchTxtStyle}>
                                    Search Results for: {searchText}
                                </Text>}
                                renderItem={renderNotes}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}/>
                            ):(
                                recentNotes.length!==0 || Notes.length!==0
                                //&& (recentNotes.length!==0 || Note.length!==0)
                                ? (
                                    <FlatList
                                        ListHeaderComponent={
                                            <View>
                                                
                                                        <Text style={style.txtOlder}>Recent</Text>
                                
                                            
                                                <View style={style.recentContainer}>
                                                    {
                                
                                                        recentNotes?.map((item :any, id:any) => {
                                
                                                            return (
                                                                <RecentNotesCard
                                                                    key={id}
                                                                    title={item.title}
                                                                    description={item.description}
                                                                    time={item.createdAt} />
                                                            )
                                
                                                        })
                                
                                
                                                    }
                                                </View>
                                                {
                                                    
                                                    Notes.length>2&&(
                                                        <Text style={style.txtOlder}>Older</Text>
                                
                                                    )
                                                }
                                            </View>
                                        }
                                        data={searchNotes.length!==0? searchNotes: Notes?.slice(2, Notes.length)}
                                        renderItem={renderNotes}
                                        keyExtractor={(item) => item.id.toString()}
                                        showsVerticalScrollIndicator={false}
                                    />
                                    ) : (
                                    <View style={style.errorContainer}>
                                        <Text style={style.txtError}>Add your thoughts here!</Text>
                                    </View>
                                
                                    )
                            )

                        }
                        


                    </View>
                )
            }


        </View>
    );
};
export default HomeScreen;
