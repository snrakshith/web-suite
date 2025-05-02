import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const XloxContext = createContext<
  { clientSecretId: string; isValid: boolean } | undefined
>(undefined);

interface XloxProviderProps {
  clientSecretId: string;
  children: ReactNode;
}

export const XloxProvider: React.FC<XloxProviderProps> = ({
  clientSecretId,
  children,
}) => {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const validateKey = async () => {
      const isValidKey = await validateClientSecretId(clientSecretId);
      setIsValid(isValidKey);
    };

    validateKey();
  }, [clientSecretId]);

  if (!isValid) {
    return <div>Invalid clientSecretId. Please provide a valid key.</div>;
  }

  return (
    <XloxContext.Provider value={{ isValid }}>{children}</XloxContext.Provider>
  );
};

export const useXlox = () => {
  const context = useContext(XloxContext);
  if (!context) {
    throw new Error("useXlox must be used within an XloxProvider");
  }
  return context;
};
