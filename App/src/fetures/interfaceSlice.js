import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isGradient: false,
    isShowHeaderDraw:true
}

export const interfaceSlice = createSlice({
    name: 'interface',
    initialState,
    reducers: {
        setGradient: (state, action) => {
            state.isGradient = action.payload

        },
        setShowHeaderDraw: (state, action) => {
            state.isShowHeaderDraw = action.payload
        }

    },
})

// Action creators are generated for each case reducer function
export const { setGradient,setShowHeaderDraw } = interfaceSlice.actions

export default interfaceSlice.reducer