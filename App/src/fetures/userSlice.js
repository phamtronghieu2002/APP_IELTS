import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuth: false,
    user: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state = action.payload

        },

    },
})

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions

export default userSlice.reducer