import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isNavOpen: false,
  showNav: true,
  Modal: {
    open: false,
    question: "",
    positiveFn: null,
    negativeFn: null,
  },
  searchHistory: [],
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
  },
});

export const { toggleNavbar, showNav, openModal, closeModal, showModal } =
  uiSlice.actions;
export default uiSlice.reducer;
