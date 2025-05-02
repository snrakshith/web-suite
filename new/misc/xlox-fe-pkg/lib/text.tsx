import React from "react";
import { useXlox } from "../utils/XloxProvider";

export const Text: React.FC<{ content: string }> = ({ content }) => {
  const { isValid } = useXlox();

  if (!isValid) {
    return null; // Or show an error message
  }

  return (
    <>
      <p>{content}</p>
    </>
  );
};
