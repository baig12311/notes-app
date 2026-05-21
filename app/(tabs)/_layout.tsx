import { Tabs } from "expo-router";
import { View, Text} from 'react-native'
import Icon from "../../components/Icon";
import Colors from "../../constants/color";
import { getAuth } from "@react-native-firebase/auth";
import { getFirestore } from "@react-native-firebase/firestore";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useEffect, useState } from "react";
const TabLayout=()=>{
    return (
        <Tabs screenOptions={({ route }) => ({
            headerShown: false,
            headerTitleAlign: 'center',
            headerStyle: {
                height: hp(5),
                backgroundColor: 'white'
            },

            tabBarLabel: () => null,
            // tabBarLabelStyle:{
            //     fontSize: wp(4),
            //     fontWeight: '400'
            // },
            tabBarStyle: {
                height: hp(6),
                
            },
            tabBarItemStyle:{
                //paddingTop: wp(3),
              
                margin:3,
                justifyContent: 'center',
                alignSelf: 'center',
                alignItem: 'center',
                marginTop: hp(1)
               
            },
            tabBarIcon: ({ focused, color, size}) => {
                let iconName, type;
                if (route.name === 'HomeScreen') {
                    iconName = 'home-max';
                    type = 'MaterialIcons';
                    
                }
                else if (route.name === 'AddNote') {
                    iconName = 'edit';
                    type = 'AntDesign';
                    
                }
                
                
                return (

                    <View style={{
                       
                        width: wp(20),
                        height: wp(15),
                        borderRadius: wp(2),
                        justifyContent: 'center',
                        alignItems: 'center',
                        //backgroundColor: focused ? Colors.primary : 'transparent'
                        borderTopWidth: focused?2: 0,
                        borderColor: Colors.primary
                    }}>

                        <Icon name={iconName} color={focused ? Colors.primary : Colors.secondary} size={size} type={type} />
                    </View>
                )
            }

        })}>

           
            <Tabs.Screen name='HomeScreen'/>
            <Tabs.Screen name='AddNote'/>
           
           

            
            
            


        </Tabs>
    )
}
   

      


export default TabLayout;

// {{
//     headerShown: false,
//     tabBarActiveTintColor: Colors.primary,
//     tabBarStyle: {
//         backgroundColor: Colors.background,
//         justifyContent: 'center',
//         alignItems: 'center'
//     }
// }}