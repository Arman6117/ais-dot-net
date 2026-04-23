// context/cursor-context.tsx
"use client";

import { createContext, useContext } from "react";

type CursorVariant = "default" | "hover" | "click" | "text" | "drag";

interface CursorContextType {
  setHovered: (hovered: boolean, type?: CursorVariant) => void;
  setVariant?: (variant: CursorVariant) => void;
}

export const CursorContext = createContext<CursorContextType>({
  setHovered: () => {},
});

export const useCursor = () => useContext(CursorContext);