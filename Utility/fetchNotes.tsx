// import { getFirestore } from "@react-native-firebase/firestore";
// import fetchUserId from "./fetchUserId";
// const fetchNotes = async() => {
//   const firestore = getFirestore();
//   const userId = fetchUserId();
//   try {
//     const notesdoc=await firestore.
//     collection('Users').
//     doc(userId).
//     collection('Notes').
//     orderBy('createdAt', 'desc').get();
//     if(!notesdoc.empty)
//     {
//         const list=notesdoc.docs.map((doc)=>({
//             id: doc.id,
//             ...doc.data(),
//             createdAt: doc.data().createdAt?.toDate().toLocaleDateString('en-GB'),
//         }))
//         return list
//     }
//   } catch (error) {
//     const generalError = error as Error;
    
    
//   }

// };

// export default fetchNotes;

import { getFirestore } from "@react-native-firebase/firestore";
import fetchUserId from "./fetchUserId";
import { setNotes, setLoading } from "../redux/slice";

const fetchNotes = (dispatch: any) => { 
  const firestore = getFirestore();
  const userId = fetchUserId();
  console.log(userId)
  try {
    const unsubscribe = firestore
      .collection('Users')
      .doc(userId)
      .collection('Notes')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {

        if (snapshot && snapshot.docs) {
          if (!snapshot.empty) {
            const list = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
              createdAt: doc.data().createdAt?.toDate().toLocaleDateString('en-GB'),
            }));
            // Update the state with the new list of notes
            dispatch(setNotes(list));
            dispatch(setLoading(false));
          } else {
            dispatch(setLoading(false));
          }
        } else {
          // Handle the case where snapshot is null or invalid
          //console.error("Invalid snapshot:", snapshot);
          dispatch(setLoading(false));

        }
        // if (!snapshot.empty) {
        //   const list = snapshot.docs.map((doc) => ({
        //     id: doc.id,
        //     ...doc.data(),
        //     createdAt: doc.data().createdAt?.toDate().toLocaleDateString('en-GB'),
        //   }));
        //   // Update the state with the new list of notes
        //   //console.log(list)
         
        //     dispatch(setNotes(list));
        //     dispatch(setLoading(false));
          
          

           
          
        //     // Make sure to pass a state setter like useState's setNotes
        // }
        // else{
        //   dispatch(setLoading(false))
        // }
      });

    // Return the unsubscribe function to stop listening to the updates when no longer needed
    return unsubscribe;

  } catch (error) {
    console.error("Error fetching notes:", error);
  }
};

export default fetchNotes;

