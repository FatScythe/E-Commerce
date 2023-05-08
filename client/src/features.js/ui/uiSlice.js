import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  isNavOpen: false,
  showNav: true,
  isLoggedIn: false,
  Modal: {
    open: false,
    question: "",
    positiveFn: null,
    negativeFn: null,
  },
  search: {
    searchHistory: [],
    isOpen: false,
    searchResults: [],
  },
  darkMode: true,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleNavbar: (state) => {
      state.isNavOpen = !state.isNavOpen;
    },
    showNav: (state, { payload }) => {
      if (payload === undefined || typeof payload !== "boolean") payload = true;
      state.showNav = payload;
    },
    closeModal: (state) => {
      state.Modal.open = false;
    },
    openModal: (state) => {
      state.Modal.open = true;
    },
    showModal: (state, { payload }) => {
      payload.open ? (state.Modal.open = true) : (state.Modal.open = false);
      state.Modal.question = payload.question;
      state.Modal.positiveFn = payload.positiveFn;
      state.Modal.negativeFn = payload.negativeFn;
    },

    addToSearchHistory: (state, { payload }) => {
      if (current(state).search.searchHistory.length >= 6) {
        state.search.searchHistory.shift();
      }
      state.search.searchHistory.push(payload);
    },
    clearSearchHistory: (state) => {
      state.search.searchHistory = [];
    },
  },
});

export const {
  toggleNavbar,
  showNav,
  openModal,
  closeModal,
  showModal,
  addToSearchHistory,
  clearSearchHistory,
} = uiSlice.actions;

export default uiSlice.reducer;
