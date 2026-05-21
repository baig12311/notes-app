import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Colors from "../../constants/color";
const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: wp(5),
        backgroundColor: Colors.white
    },
    txtError:{
        fontSize: wp(6),
        fontFamily: 'Poppins-Italic',
        color: Colors.whiteGrey,
        

    },
    errorContainer:{
        flex:1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    noteContainer:{
        flexDirection: 'row',
        //borderWidth:1,
        flexGrow:1,
        paddingBottom: hp(5)
    }
});
export default style;

