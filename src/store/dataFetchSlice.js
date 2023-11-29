import { createSlice } from "@reduxjs/toolkit";

const dataFetchSlice = createSlice({
  name: "dataFetch",
  initialState: {
    category: 'food',
    sort: null,
    order: 'asc',
    page: 1,
    isPagination: false,
    showNavMenu: false,
    showSort: false
  },
  reducers: {
    setIsPagination(state, action) {
      const  { dataPagination } = action.payload
      const result = dataPagination.length > 0 ? true : false
      state.isPagination = result
    },
    setPage(state, action) {
      state.page = action.payload.page
    },
    setCategory(state, action) {
      state.category = action.payload.category
    },
    setShowNavMenu(state, action) {
      state.showNavMenu = action.payload.showNavMenu
    },
    setShowSort(state, action) {
      state.showSort = action.payload.showSort
    },
    setSort(state, action) {
      state.sort = action.payload.sort
    },
    setOrder(state, action) {
      state.order = action.payload.order
    },
    
  },
});

export const {setIsPagination, setPage, setCategory, setShowNavMenu, setShowSort, setSort, setOrder} =
dataFetchSlice.actions;

export default dataFetchSlice.reducer;