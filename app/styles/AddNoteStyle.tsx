import { StyleSheet } from "react-native";
import Colors from "../../constants/color";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        padding: wp(5),
       
       
    },
    textContainer: {

        //flex: 1,
        paddingVertical: hp(2),
        flexGrow:1,
       
    },
    txtTitle: {

        fontSize: wp(8),
        marginVertical: hp(5),
        fontFamily: 'Poppins-Medium',
       

    },
    txtDescription: {
       
        fontSize: wp(5),
        fontFamily: 'Poppins-Regular'
        //flex:1,
        // },
    },
    addContainer:{
       
    },
    animation:{
        width:100, height: 100
    },
    imageStyle:{
        width: '100%',
        height: hp(60),
        //flex:1,
        borderWidth:2,
        borderColor: Colors.primary,
        borderRadius: wp(2)
    },
    listContainer:{
        //borderWidth:1,
        //flex:1
    }
})
export default style;