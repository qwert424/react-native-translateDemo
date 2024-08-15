import { createSlice } from "@reduxjs/toolkit";
import languageData from './initData';

const historySlice = createSlice({
    name: "history",
    initialState: {
        historyList: languageData.history
    },
    reducers: {
        // 删除全部
        deleteAll(state) {
            state.historyList = [];
        },
        // 删除item
        deleteItem(state, { payload }) {
            state.historyList = state.historyList.filter((item, index) => index !== payload)
        },
        // 添加item
        addItem(state, { payload }) {
            state.historyList.unshift(payload)
        }
    }
})


export default historySlice.reducer;
export const { deleteAll, deleteItem, addItem } = historySlice.actions;