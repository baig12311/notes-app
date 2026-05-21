//import liraries
import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import style from './MainScreenStyle';
import Button from '../../components/Button';
import IconDisplay from '../../components/IconsDisplay';
import GoogleSignin from '../../googleconfig';
import auth from '@react-native-firebase/auth';
import { useRouter } from 'expo-router';
import showMessage from '../../Utility/ToastMessage';
const MainScreen = () => {
    const router=useRouter();
   
    const onGoogleButtonPress = async () => {
       
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        const signInResult = await GoogleSignin.signIn();
        let idToken = signInResult.data?.idToken;
        
        if (!idToken) {

            idToken = signInResult.idToken;
        }
        if (!idToken) {
            throw new Error('No ID token found');
        }
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
       
        const response = auth().signInWithCredential(googleCredential);
        auth().onAuthStateChanged(user => {
            if (user) {
              const userName = user.displayName;
              const email = user.email;
              router.push('HomeScreen');
            }
          });
       
        
        if(response)
        {
            showMessage('SignIn Sucessfully')
        }
    }
    return (
        <View style={style.container}>
            <Image source={require('../../assets/mainScreenLogo.png')} style={style.mainImage} resizeMode='contain' />
            <IconDisplay />
            <View style={style.innerContainer}>
                <Text style={style.heading}>Capture your thoughts and reminders effortlessly</Text>
                <Text style={style.subHeading}>Never miss those precious moments.</Text>


                <Button title='Continue with Google' onPress={() =>onGoogleButtonPress()} />
            </View>

            


        </View>
    );
};


export default MainScreen;
