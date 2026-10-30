import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type CursorVariant = "default" | "hover" | "text" | "glow";

export interface UiState {
  scrollProgress: number;
  activeSection: string;
  cursorVariant: CursorVariant;
  cursorText: string;
  mobileMenuOpen: boolean;
}

const initialState: UiState = {
  scrollProgress: 0,
  activeSection: "hero",
  cursorVariant: "default",
  cursorText: "",
  mobileMenuOpen: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setScrollProgress: (state, action: PayloadAction<number>) => {
      state.scrollProgress = action.payload;
    },
    setActiveSection: (state, action: PayloadAction<string>) => {
      state.activeSection = action.payload;
    },
    setCursorVariant: (state, action: PayloadAction<CursorVariant>) => {
      state.cursorVariant = action.payload;
    },
    setCursorText: (state, action: PayloadAction<string>) => {
      state.cursorText = action.payload;
    },
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    setMobileMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.mobileMenuOpen = action.payload;
    },
  },
});

export const {
  setScrollProgress,
  setActiveSection,
  setCursorVariant,
  setCursorText,
  toggleMobileMenu,
  setMobileMenuOpen,
} = uiSlice.actions;

export default uiSlice.reducer;

