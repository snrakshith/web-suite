import React from "react";
import { XloxProvider, Button, Text } from "@xlox/uikit";

const App: React.FC = () => {
  const clientSecretId = "my-secret-id";

  return (
    <XloxProvider clientSecretId={clientSecretId}>
      <div>
        <h1>My App</h1>
        <Button label="Click Me" />
        <Text content="Hello, World!" />
      </div>
    </XloxProvider>
  );
};

export default App;
