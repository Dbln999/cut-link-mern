import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface ILinks {
  _id: number;
  owner: string;
  from: string;
  to: string;
  short: string;
  date: Date;
  clicks: string;
}

type tokenState = {
  token: string;
  links: ILinks[];
};

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()!.split(";").shift();
}

const initialState: tokenState = {
  token: getCookie("token")!,
  links: [],
};

export const fetchLinks = createAsyncThunk("/links", async (token: string) => {
  const res = await axios.get<ILinks[]>("http://localhost:5000/link/get", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return res.data;
});

const tokenSlice = createSlice({
  name: "tokenSlice",
  initialState,
  reducers: {
    updateToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchLinks.fulfilled.type,
      (state, action: PayloadAction<ILinks[]>) => {
        state.links = action.payload;
      }
    );
  },
});
export default tokenSlice.reducer;
export const { updateToken } = tokenSlice.actions;
