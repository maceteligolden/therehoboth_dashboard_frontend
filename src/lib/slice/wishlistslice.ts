import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getFromLocalStorage } from "../../utils/localstorage";
import { RootState } from "../store";
import { QueryDefinition, BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from "@reduxjs/toolkit/dist/query";
import { QueryActionCreatorResult } from "@reduxjs/toolkit/dist/query/core/buildInitiate";


interface WishlistState {
  wishlist: string;
  refresh: () => QueryActionCreatorResult<QueryDefinition<void, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, never, any, "api">>;
  wishes: any[];
};

const slice = createSlice({
  name: "wishlist",
  initialState: {
    wishlist: getFromLocalStorage("wishlist") ? getFromLocalStorage("wishlist") : '',
    refresh: null,
    wishes: []
  } as unknown as WishlistState,
  reducers: {
    setActiveWishlist: (state, action: PayloadAction<{id: string}>) => {
      state.wishlist = action.payload.id;
    },
    setWishes: (state, action: PayloadAction<{data: () => QueryActionCreatorResult<QueryDefinition<void, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, never, any, "api">>}>)=> {
      state.refresh = action.payload.data
    }

  },
});

export const { setActiveWishlist, setWishes } = slice.actions;
export default slice.reducer;
export const selectCurrentWishlist: any = (state: RootState) => { return state.wishlist.refresh };
export const selectWishes: any = (state: RootState) => { return state.wishlist.wishes };
