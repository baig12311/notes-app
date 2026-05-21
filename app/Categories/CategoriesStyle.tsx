import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Colors from "../../constants/color";

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        padding: wp(5)
    },
    mainContainer:{
        //borderWidth: 1,
        flex:1
    },
    buttonContainer:{
        //borderWidth: 1,
        alignItems: 'center'
    }
});
export default style

//make this component available to the app