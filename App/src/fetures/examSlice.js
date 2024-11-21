import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getData } from '../utils/asyncStore'
import { reset } from 'react-native-track-player/lib/src/trackPlayer';



const initialState = {
        Speaking:0,
        Writing:0,
        Reading:0,
        Listening:0,
}


export const exam = createSlice({
    name: 'exam',
    initialState,
    reducers: {
        setScore(state, action) {
    
           
            const key =action?.payload?.key;
            const value = action?.payload?.value;
            state[key] =state[key]+ value;
  
        },   
        resetScore(state, action) {
            state.Speakingpeaking = 0;
            state.Writing = 0;
            state.Reading = 0;
            state.Listening = 0;
        },  
    },
})

// Action creators are generated for each case reducer function
export const { setScore,resetScore} = exam.actions

export default exam.reducer