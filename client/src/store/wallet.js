import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: [],
    balances: [],
}

const walletSlice = createSlice({
    name: "wallet",
    initialState,
    reducers: {
        setWalletList: (state, actions) => {
            state.list = actions.payload.wallets;
            state.balances = actions.payload.balances;
        }
    }
});

export default walletSlice;