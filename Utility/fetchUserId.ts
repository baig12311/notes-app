
import { getAuth } from "@react-native-firebase/auth";
const fetchUserId=()=>{
    const auth=getAuth()
    const currentUser=auth.currentUser;
    return currentUser?.uid;
}
export default fetchUserId;