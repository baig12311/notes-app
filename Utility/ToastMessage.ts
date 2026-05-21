import { ToastAndroid, Platform } from 'react-native';
 const showMessage=(message: any)=>{
        if(Platform.OS==='android')
        {
            ToastAndroid.show(message, ToastAndroid.SHORT);
        }
    }
export default showMessage;