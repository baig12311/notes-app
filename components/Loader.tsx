import {View, ActivityIndicator, StyleSheet, Text} from "react-native";
// @ts-ignore
import AnimatedLoader from "react-native-animated-loader";
import Colors from "../constants/color";
interface Props{
    visible: boolean
}
const Loader:React.FC<Props>=({visible})=>{
    
return(
//  <View style={styles.loaderContainer}>
  
   <AnimatedLoader 
   visible={visible}
   overlayColor="rgba(255,255,255,0.75)"
   source={require("../assets/loader.json")}
   animationStyle={styles.loader}
   speed={1} />
// </View>
   
    
    )
}
export default Loader;
const styles=StyleSheet.create({
    
    // loaderContainer:{
    //     width: 200, 
    //     height: 200, 
    //     justifyContent: "center",
    //     alignItems: "center",
    //     borderWidth: 1,
        
    //     position: 'relative'
       
    // },
    loader:{
        width: 100,
        height: 100,
       
        
    }
})