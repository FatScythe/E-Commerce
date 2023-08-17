import { createSlice } from "@reduxjs/toolkit";

const getSearchHistory = () => {
  if (localStorage.getItem("searchHistory")) {
    return JSON.parse(localStorage.getItem("searchHistory"));
  }

  return [];
};

const initialState = {
  showNav: true,
  Modal: {
    open: false,
    question: "",
    positiveFn: null,
    negativeFn: null,
  },
  search: {
    searchHistory: getSearchHistory(),
    isOpen: false,
  },
  dark: true,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
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
      if (state.search.searchHistory.length >= 10) {
        state.search.searchHistory.shift();
      }
      state.search.searchHistory.unshift(payload);
      localStorage.setItem(
        "searchHistory",
        JSON.stringify(state.search.searchHistory)
      );
    },
    clearSearchHistory: (state) => {
      state.search.searchHistory = [];
      if (localStorage.getItem("searchHistory")) {
        localStorage.setItem(
          "searchHistory",
          JSON.stringify(state.search.searchHistory)
        );
      }
    },
  },
});

export const {
  openModal,
  closeModal,
  showModal,
  addToSearchHistory,
  clearSearchHistory,
} = uiSlice.actions;

export default uiSlice.reducer;
