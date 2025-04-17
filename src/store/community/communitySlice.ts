import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CommunityState, Post, Tip } from './types';
import axios from 'axios';

const initialState: CommunityState = {
  posts: [],
  selectedPost: null,
  tips: [],
  loading: false,
  error: null,
};

export const fetchPosts = createAsyncThunk<Post[]>(
  'community/fetchPosts',
  async () => {
    const { data } = await axios.get('/api/posts') as { data: Post[] };
    return data;
  }
);

export const fetchTips = createAsyncThunk<Tip[]>(
  'community/fetchTips',
  async () => {
    const { data } = await axios.get('/api/tips') as { data: Tip[] };
    return data;
  }
);

export const createPost = createAsyncThunk<
  Post,
  Omit<Post, 'id' | 'createdAt' | 'updatedAt' | 'likes' | 'comments'>
>(
  'community/createPost',
  async (post) => {
    const { data } = await axios.post('/api/posts', post) as { data: Post };
    return data;
  }
);

const communitySlice = createSlice({
  name: 'community',
  initialState,
  reducers: {
    selectPost: (state, action) => {
      state.selectedPost = action.payload;
    },
    clearSelected: (state) => {
      state.selectedPost = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch posts';
      })
      .addCase(fetchTips.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTips.fulfilled, (state, action) => {
        state.loading = false;
        state.tips = action.payload;
      })
      .addCase(fetchTips.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tips';
      })
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = [...state.posts, action.payload];
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create post';
      });
  },
});

export const { selectPost, clearSelected } = communitySlice.actions;
export default communitySlice.reducer;
