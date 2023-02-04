import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import inctance from "../../axios"


export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => {
    const { data } = await inctance.post('/auth/login', params)
    return data
})

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async (params) => {
    const { data } = await inctance.get('/auth/me', params)
    return data
})

const initialState = {
    data: null,
    status: 'loading'
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null
        }
    },
    extraReducers: {
        [fetchAuth.pending]: (state) => {
            state.status = 'loading'
            state.data = null
        },
        [fetchAuth.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchAuth.rejected]: (state) => {
            state.status = 'error'
            state.data = null
        },
        [fetchAuthMe.pending]: (state) => {
            state.status = 'loading'
            state.data = null
        },
        [fetchAuthMe.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchAuthMe.rejected]: (state) => {
            state.status = 'error'
            state.data = null
        }
    }
})
export const selectIsAuth = (state) => Boolean(state.auth.data)

export const authReducer = authSlice.reducer

export const {logout} = authSlice.actions