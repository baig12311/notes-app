import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, Text} from 'react-native';
import { useRouter } from 'expo-router';
import auth from '@react-native-firebase/auth';
import MainScreen from './MainScreen/MainScreen';
import HomeScreen from './(tabs)/HomeScreen';
import Loader from '../components/Loader';
import * as Font from "expo-font";

const Index = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const router = useRouter();
  const checkLoginStatus = async () => {
    const check = auth().onAuthStateChanged(async (user) => {
      if (user ) {
                router.replace('HomeScreen')
              }
      if(!user)
      {
        //router.replace('HomeScreen')
        setIsLoading(false)
      }
    })
    return check;
  } 
  useEffect(()=>{
    checkLoginStatus()
  }, [])
  console.log(isLoading)
  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
        "Poppins-BlackItalic": require("../assets/fonts/Poppins-BlackItalic.ttf"),
        "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
        "Poppins-ExtraLightItalic": require("../assets/fonts/Poppins-ExtraLightItalic.ttf"),
        "Poppins-Light":require("../assets/fonts/Poppins-Light.ttf"),
        "Poppins-LightItalic":require("../assets/fonts/Poppins-LightItalic.ttf"),
        "Poppins-Medium":require("../assets/fonts/Poppins-Medium.ttf"),
        "Poppins-MediumItalic":require("../assets/fonts/Poppins-MediumItalic.ttf"),
        "Poppins-Regular":require("../assets/fonts/Poppins-Regular.ttf"),
        "Poppins-SemiBold":require("../assets/fonts/Poppins-SemiBold.ttf"),
        "Poppins-SemiBoldItalic":require("../assets/fonts/Poppins-SemiBoldItalic.ttf"),
        "Poppins-Thin":require("../assets/fonts/Poppins-Thin.ttf"),
        "Poppins-ThinItalic":require("../assets/fonts/Poppins-ThinItalic.ttf"),
        "Poppins-Italic":require("../assets/fonts/Poppins-Italic.ttf"),



         
 
 
 


 
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; // Or a loading spinner
  }

  


  // useEffect(() => {
  //   const unsubscribe = auth().onAuthStateChanged((currentUser) => {
  //     if (currentUser) {
  //       setUser(currentUser); // Update the user state if logged in
  //       router.replace('HomeScreen'); // Navigate to HomeScreen
  //     } else {
  //       setUser(null);
  //       setIsLoading(false); // Set user state to null if not logged in
  //     }
  //     setIsLoading(false); // Set loading to false after checking user
  //   });

  //   return () => unsubscribe(); // Clean up the listener on component unmount
  // }, [router]);

  // if (isLoading) {
  //   return (
     
  //   );
  // }

  // Render HomeScreen if user is authenticated, otherwise show MainScreen
  return (
    <View style={{ flex: 1 }}>
      {
        isLoading?(
          <View style={{flex:1}}>
            <ActivityIndicator size='large' color='black'/>

          </View>
          
        ):(
          <MainScreen/>
        )
      }
      {/* {user ? <HomeScreen /> : <MainScreen />} */}
      {/* <Text>hello123</Text> */}
    </View>
  );
};

export default Index;
