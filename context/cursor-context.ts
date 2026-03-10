"use client";
import { createContext, useContext } from "react";

type CursorContextType = {
  setHovered: (value: boolean) => void;
};

export const CursorContext = createContext<CursorContextType>({
  setHovered: () => {},
});

export const useCursor = () => useContext(CursorContext);