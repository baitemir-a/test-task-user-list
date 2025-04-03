import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch('/api/users');
  if (!response.ok) throw new Error('Failed to fetch users');
  return response.json();
});

export const createUser = createAsyncThunk('users/createUser', async (userData: any) => {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  if (!response.ok) throw new Error('Failed to create user');
  return response.json();
});

export const updateUser = createAsyncThunk('users/updateUser', async ({ id, userData }: { id: string; userData: any }) => {
  const response = await fetch(`/api/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  if (!response.ok) throw new Error('Failed to update user');
  return response.json();
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (id: string) => {
  const response = await fetch(`/api/users/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete user');
  return id;
});

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [] as Array<{ id: string; [key: string]: any }>,
    status: 'idle',
    error: null as string | null,
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload as { id: string; [key: string]: any });
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) state.users[index] = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      });
  },
});

export const { setUsers } = userSlice.actions;
export default userSlice.reducer;