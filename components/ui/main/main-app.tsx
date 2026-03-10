"use client";

import React from "react";

interface MainAppProps {
  children: React.ReactNode;
}

const MainApp = ({ children }: MainAppProps) => {
  return (
    <main className="relative z-10">
      {children}
    </main>
  );
};

export default MainApp;