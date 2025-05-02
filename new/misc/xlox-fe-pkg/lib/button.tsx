import React from "react";
import { useXlox } from "../utils/XloxProvider";

export const Button: React.FC<{ label: string }> = ({ label }) => {
  const { isValid } = useXlox();

  if (!isValid) {
    return null; // Or show an error message
  }

  return (
    <>
      <button>{label}</button>
    </>
  );
};
