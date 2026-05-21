import { StyleSheet } from "react-native";
import Colors from "../../constants/color";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        padding: wp(3)
    },
    innerContainer:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainImage:{
        height: hp(40),
        alignSelf: 'center',
        marginBottom: hp(3)
    },
    heading:{
        fontSize: wp(6),
        fontWeight:'500',
        textAlign: 'center',
        color: Colors.secondary,
        marginBottom: hp(3),
        fontFamily: 'Poppins-Medium'
    },
    subHeading:{
        fontSize: wp(4),
        textAlign: 'center',
        color: Colors.whiteGrey,
        marginBottom: hp(3),
        fontFamily: 'Poppins-Light'
    },
   
});
export default style;
