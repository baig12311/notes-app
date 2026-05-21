import { StyleSheet } from "react-native";
import Colors from "../../constants/color";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        padding: wp(5)
    },
    customButtonContainer:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: hp(2)
    },
    txtOlder:{
        fontSize:wp(5),
        marginBottom: hp(2),
        //fontWeight: '500',
        color: Colors.secondary,
        fontFamily: 'Poppins-Medium'
    },
    recentContainer:{
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: hp(2)
    },
    txtError:{
        fontSize: wp(6),
        textAlign: 'center',
        overflow: 'hidden',
        fontFamily: 'Poppins-Italic',
        color: Colors.whiteGrey

    },
    errorContainer:{
        flex:1, 
        justifyContent: 'center', 
        //alignItems: 'center'
    },
    profileMenu:{
        borderWidth:1,
        position: 'absolute',
        top:70,
        right:wp(5)
    },
    searchTxtStyle: {
        fontFamily: 'Poppins-Medium',
        fontSize: wp(4),
        marginBottom: hp(1),
        color: Colors.charcoalGrey
    }
});

export default style;

