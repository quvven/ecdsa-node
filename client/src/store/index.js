import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { Provider, useDispatch, useSelector } from 'react-redux';
import walletSlice from "./wallet";

export const store = configureStore({
    reducer: {
        wallet: walletSlice.reducer
    }
});

export const actions = {
    wallet: walletSlice.actions
}

setupListeners(store.dispatch);

export const useStoreDispatch = useDispatch;
export const useStoreSelector = useSelector;

const StoreProvider = ({ context, children, serverState, stabilityCheck, noopCheck }) => {
    return Provider({
        store,
        context,
        children,
        serverState,
        stabilityCheck,
        noopCheck
    });
};

export default StoreProvider;

