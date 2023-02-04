import { create } from "@mui/material/styles/createTransitions";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import inctance from "../../axios";

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const {data} = await inctance.get("/posts")
    return data
 })

const initialState = {
    posts: {
        items: [],
        status: 'loading'
    },
    tags: {
        items: [],
        status: 'loading'

    }
}

 const postsSlice  = createSlice({
    name: 'posts',
    initialState,
    reducer: {
    },
    extraReducers: {
        [fetchPosts.pending]: (state) => {
            state.posts.items = []
            state.posts.status = 'loading' 
        },
        [fetchPosts.fulfilled] : (state, action) => {
            state.posts.items = action.payload
            state.posts.status = 'loaded'
        },
        [fetchPosts.rejected] : (state) => {
            state.posts.items = []
            state.posts.status = 'error'
        }
    }
})

export const postReducer = postsSlice.reducer