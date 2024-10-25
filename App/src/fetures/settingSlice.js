import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getData } from '../utils/asyncStore'



const initialState = {
    theme: "light",
    notifycation:"20:30",
    lang: 'en',
}

const getInitialState = async() => {
    return {
        theme: await getData("theme") || "light",
        notifycation: await getData("notifycation") || "20:30",
        lang: await getData("lang") || "en",
    }
}

export const interfaceSetting = createSlice({
    name: 'setting',
    initialState,
    reducers: {
        setTheme(state, action) {
            state.theme = action.payload
        },
        setNotifycation(state, action) {
            state.notifycation = action.payload
        },
        setLang(state, action) {
            state.lang = action.payload
        }
    
    },
})

// Action creators are generated for each case reducer function
export const { setTheme,setNotifycation ,setLang} = interfaceSetting.actions

export default interfaceSetting.reducer