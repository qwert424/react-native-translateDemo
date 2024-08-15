import { createSlice } from "@reduxjs/toolkit";
import languageData from './initData';

const languageSlice = createSlice({
    name: "language",
    initialState: {
        lanList: languageData.lanList,
        curIndex: languageData.curIndex
    },
    reducers: {
        changeCurIndex(state, { payload }) {
            state.curIndex = payload
        }
    }
})
export default languageSlice.reducer
export const { changeCurIndex } = languageSlice.actions