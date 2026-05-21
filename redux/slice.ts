import { createSlice, PayloadAction} from "@reduxjs/toolkit";
interface stateTypes {
    title: string,
    description: string,
    [key:string]: any,
    loading: boolean,
    isNoteSelected: boolean,
    imagePath: string,
    isList:boolean,
    isChecked: boolean,
    isModalVisible: boolean,
    searchText: string,
    itemCheckedCount:number
}
const initialState: stateTypes = {
    title: '',
    description: '',
    Notes: [],
    recentNotes:[],
    loading: true,
    savedNotes:[],
    selectedNotes:[],
    isNoteSelected: false,
    imagePath:'',
    isList:false,
    listItems:[],
    isChecked: false,
    toDo:[],
    isModalVisible: false,
    searchText: '',
    searchNotes:[],
    itemCheckedCount: 0,
    checkedTask:[]

}
const noteSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        setTitle: (state, action) => {
            state.title = action.payload
        },
        setDescription: (state, action) => {
            state.description = action.payload
        },
        clearText: (state) => {
            state.title = '',
                state.description = '',
                state.imagePath=''
        },
        setNotes: (state, action) => {
            state.Notes=action.payload
        },
        setRecentNotes:(state, action)=>{
            state.recentNotes=action.payload
        },
        setLoading:(state, action)=>{
            state.loading=action.payload
        },
        setSavedNotes:(state, action)=>{
            state.savedNotes=action.payload
        },
        setSelectedNotes:(state, action)=>{
            state.selectedNotes=action.payload
        },
        setIsNoteSelected:(state, action)=>{
            state.isNoteSelected=action.payload
        },
        setImagePath:(state, action)=>{
            state.imagePath=action.payload
        },
        setIsList:(state, action)=>{
            state.isList=action.payload
        },
        setListItems:(state, action)=>{
            state.listItems=action.payload
        },
        setIsChecked:(state, action)=>{
            state.isChecked=action.payload
        },
        setToDo:(state, action)=>{
            state.toDo=action.payload
        },
        setIsModalVisible:(state, action)=>{
            state.isModalVisible=action.payload
        },
        setSearchText:(state, action)=>{
            state.searchText=action.payload
        },
        setSearchNotes:(state, action)=>{
            state.searchNotes=action.payload
        },
        setItemCheckedCount:(state, action)=>{
            state.itemCheckedCount=action.payload
        },
        setCheckedTask:(state, action)=>{
            state.checkedTask=action.payload
        }

    },
})
export const { setTitle, setDescription, 
    clearText, setNotes, setRecentNotes, setLoading, 
    setSavedNotes, setSelectedNotes, 
    setIsNoteSelected,setCheckedTask, 
    setItemCheckedCount,setSearchNotes,
    setSearchText,setIsModalVisible,setToDo, 
    setImagePath, setIsList, setListItems, 
    setIsChecked} = noteSlice.actions;
export default noteSlice.reducer;

