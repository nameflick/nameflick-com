import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

import { reducer as web3Reducer } from "@0xflick/feature-web3";
import { reducer as configReducer } from "features/config/redux";
import { reducer as mintReducer } from "features/mint/redux";
import { reducer as mintApiReducer } from "features/mint/api";
import { reducer as recaptchaReducer } from "features/faucet/recaptcha";
import { reducer as authReducer } from "@0xflick/feature-auth/src/redux";
import { reducer as appbarReducer } from "features/appbar/redux";
import { reducer as nftCollectionApiReducer } from "features/nft-collection/api";
import { reducer as twitterApiReducer } from "features/twitter/api";
import { reducer as resolverReducer } from "features/resolver/redux";
import { reducer as nameflickManageReducer } from "features/nameflick-manage/redux";

export const store = configureStore({
  reducer: {
    config: configReducer,
    web3: web3Reducer,
    mint: mintReducer,
    mintApi: mintApiReducer,
    recaptcha: recaptchaReducer,
    auth: authReducer,
    appbar: appbarReducer,
    apiNftCollection: nftCollectionApiReducer,
    twitterApi: twitterApiReducer,
    resolver: resolverReducer,
    nameflickManage: nameflickManageReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types
export const useAppSelector = <T>(selector: (state: RootState) => T) => {
  return useSelector<RootState, T>(selector);
};