### 1. Single Responsibility Principle (SRP)

**Definition:**  
The Single Responsibility Principle states that a class or component should have one and only one reason to change, meaning it should only have one job or responsibility.

#### Simple Example

Suppose we have a `UserCard` component that displays a user's information.

```tsx
// Single Responsibility for Displaying User Info
type UserCardProps = {
  name: string;
  age: number;
};

const UserCard: React.FC<UserCardProps> = ({ name, age }) => (
  <div>
    <h3>{name}</h3>
    <p>Age: {age}</p>
  </div>
);

// Usage
<UserCard name="John Doe" age={30} />;
```

**Explanation:**  
The `UserCard` component only handles the display of user information. It has a single responsibility: rendering user data.

#### Complex Example

Let's build a `UserProfile` component that needs to display user information and handle user authentication status.

```tsx
// Separate responsibility for rendering user information
type UserInfoProps = {
  name: string;
  age: number;
};

const UserInfo: React.FC<UserInfoProps> = ({ name, age }) => (
  <div>
    <h3>{name}</h3>
    <p>Age: {age}</p>
  </div>
);

// Separate responsibility for handling authentication status
type AuthStatusProps = {
  isAuthenticated: boolean;
};

const AuthStatus: React.FC<AuthStatusProps> = ({ isAuthenticated }) => (
  <p>{isAuthenticated ? "Logged In" : "Logged Out"}</p>
);

// UserProfile Component combining both responsibilities
type UserProfileProps = UserInfoProps & AuthStatusProps;

const UserProfile: React.FC<UserProfileProps> = ({
  name,
  age,
  isAuthenticated,
}) => (
  <div>
    <UserInfo name={name} age={age} />
    <AuthStatus isAuthenticated={isAuthenticated} />
  </div>
);

// Usage
<UserProfile name="Jane Doe" age={25} isAuthenticated={true} />;
```

**Explanation:**  
Here, the `UserProfile` component adheres to SRP by separating the concerns into two components: `UserInfo` for displaying user information and `AuthStatus` for handling authentication status. Each component has a single responsibility.

By following OCP and SRP, you can create more modular, maintainable, and scalable React components. These principles help in managing complexity, especially in large applications, by promoting clean code practices.

### 2. Open/Closed Principle (OCP)

**Definition:**  
The Open/Closed Principle states that software entities (like classes, modules, functions, etc.) should be open for extension but closed for modification. In the context of React, this means you should be able to add new functionality to a component without changing its existing code.

#### Simple Example

Consider a `Button` component that can be extended to support different types of buttons.

```tsx
// Base Button Component
type ButtonProps = {
  label: string;
  onClick: () => void;
};

const Button: React.FC<ButtonProps> = ({ label, onClick }) => (
  <button onClick={onClick}>{label}</button>
);

// Extended PrimaryButton Component
type PrimaryButtonProps = ButtonProps & {
  isPrimary?: boolean;
};

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  label,
  onClick,
  isPrimary = false,
}) => <Button label={label} onClick={onClick} />;

// Usage
<PrimaryButton
  label="Submit"
  onClick={() => console.log("Primary Button clicked!")}
  isPrimary
/>;
```

**Explanation:**  
`PrimaryButton` extends the `Button` component to support an additional `isPrimary` prop without modifying the original `Button` component. This follows OCP because the component can be extended without altering existing code.

#### Complex Example

Imagine a `Notification` component that can display different types of notifications: success, error, and info.

```tsx
// Base Notification Component
type NotificationProps = {
  message: string;
};

const Notification: React.FC<NotificationProps> = ({ message }) => (
  <div className="notification">{message}</div>
);

// Extended SuccessNotification Component
type SuccessNotificationProps = NotificationProps;

const SuccessNotification: React.FC<SuccessNotificationProps> = ({
  message,
}) => <Notification message={`✅ ${message}`} />;

// Extended ErrorNotification Component
type ErrorNotificationProps = NotificationProps;

const ErrorNotification: React.FC<ErrorNotificationProps> = ({ message }) => (
  <Notification message={`❌ ${message}`} />
);

// Usage
<SuccessNotification message="Operation successful!" />;
<ErrorNotification message="An error occurred!" />;
```

**Explanation:**  
`SuccessNotification` and `ErrorNotification` extend the base `Notification` component by adding additional behavior (prefixing the message) without modifying the `Notification` component itself. This adheres to OCP.

### 3. Liskov Substitution Principle (LSP)

**Definition:**  
LSP states that objects of a superclass should be replaceable with objects of a subclass without affecting the correctness of the program. In functional components, this translates to ensuring that components that extend or specialize another component should still be usable in the same way as the original component.

#### Simple Example

Let's say we have a base `Button` component and a specialized `IconButton` component.

```tsx
// Base Button Component
type ButtonProps = {
  label: string;
  onClick: () => void;
};

const Button: React.FC<ButtonProps> = ({ label, onClick }) => (
  <button onClick={onClick}>{label}</button>
);

// Specialized IconButton Component
type IconButtonProps = ButtonProps & {
  icon: string;
};

const IconButton: React.FC<IconButtonProps> = ({ label, onClick, icon }) => (
  <button onClick={onClick}>
    <i className={icon}></i> {label}
  </button>
);

// Usage
const handleClick = () => console.log("Button clicked!");

// Both components can be used interchangeably
<Button label="Click Me" onClick={handleClick} />;
<IconButton label="Click Me" onClick={handleClick} icon="icon-class" />;
```

**Explanation:**  
`IconButton` can be used anywhere `Button` is used, thus adhering to LSP.

#### Complex Example

Consider a `FormInput` component and a `PasswordInput` component.

```tsx
// Base FormInput Component
type FormInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
};

const FormInput: React.FC<FormInputProps> = ({
  value,
  onChange,
  placeholder,
}) => (
  <input
    type="text"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
  />
);

// Specialized PasswordInput Component
type PasswordInputProps = FormInputProps & {
  minLength?: number;
};

const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChange,
  placeholder,
  minLength = 8,
}) => (
  <input
    type="password"
    value={value}
    onChange={(e) => {
      const newValue = e.target.value;
      if (newValue.length >= minLength) {
        onChange(newValue);
      }
    }}
    placeholder={placeholder}
  />
);

// Usage
const handleInputChange = (value: string) => console.log(value);

// Both components can be used interchangeably
<FormInput
  value="Hello"
  onChange={handleInputChange}
  placeholder="Enter text"
/>;
<PasswordInput
  value="password123"
  onChange={handleInputChange}
  placeholder="Enter password"
  minLength={8}
/>;
```

**Explanation:**  
`PasswordInput` is a more specialized version of `FormInput` but still adheres to LSP because it can be substituted anywhere `FormInput` is used, without breaking the functionality.

### 4. Interface Segregation Principle (ISP)

**Definition:**  
ISP states that a client should not be forced to implement interfaces they do not use. For functional components, this means creating small, specific props interfaces rather than large, monolithic ones.

#### Simple Example

Suppose we have a `UserProfile` component that displays a user's name and age.

```tsx
// Simple UserProfile Component
type UserProfileProps = {
  name: string;
  age: number;
};

const UserProfile: React.FC<UserProfileProps> = ({ name, age }) => (
  <div>
    <p>Name: {name}</p>
    <p>Age: {age}</p>
  </div>
);

// Usage
<UserProfile name="John Doe" age={30} />;
```

**Explanation:**  
The `UserProfileProps` interface only includes the properties needed by the `UserProfile` component, adhering to ISP.

#### Complex Example

Imagine we have a `Dashboard` component that displays various widgets like `UserWidget`, `WeatherWidget`, etc.

```tsx
// Base Widget Interface
interface WidgetProps {
  title: string;
}

const UserWidget: React.FC<WidgetProps & { userName: string }> = ({
  title,
  userName,
}) => (
  <div>
    <h3>{title}</h3>
    <p>User: {userName}</p>
  </div>
);

const WeatherWidget: React.FC<WidgetProps & { temperature: number }> = ({
  title,
  temperature,
}) => (
  <div>
    <h3>{title}</h3>
    <p>Temperature: {temperature}°C</p>
  </div>
);

// Usage
<Dashboard>
  <UserWidget title="User Information" userName="John Doe" />
  <WeatherWidget title="Weather" temperature={25} />
</Dashboard>;
```

**Explanation:**  
Each widget only implements the specific properties it needs, ensuring the interfaces are segregated and do not force unused properties, following ISP.

### 5. Dependency Inversion Principle (DIP)

**Definition:**  
DIP suggests that high-level modules should not depend on low-level modules; both should depend on abstractions. In functional components, this can be applied by using context, hooks, or higher-order components (HOCs) to abstract away dependencies.

#### Simple Example

Consider a `ThemeContext` used by a `ThemedButton` component.

```tsx
// ThemeContext
const ThemeContext = React.createContext("light");

// ThemedButton Component
const ThemedButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const theme = React.useContext(ThemeContext);
  return (
    <button className={theme} onClick={onClick}>
      Click me
    </button>
  );
};

// Usage
<ThemeContext.Provider value="dark">
  <ThemedButton onClick={() => console.log("Button clicked!")} />
</ThemeContext.Provider>;
```

**Explanation:**  
`ThemedButton` depends on an abstraction (the `ThemeContext`) rather than directly on a specific theme, following DIP.

#### Complex Example

Imagine a `DataFetcher` component that fetches data and displays it. The data fetching logic is abstracted into a hook.

```tsx
// Abstracted Data Fetching Hook
const useDataFetcher = (url: string) => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [url]);

  return data;
};

// DataDisplay Component
type DataDisplayProps = {
  url: string;
};

const DataDisplay: React.FC<DataDisplayProps> = ({ url }) => {
  const data = useDataFetcher(url);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h3>Data:</h3>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

// Usage
<DataDisplay url="https://api.example.com/data" />;
```

**Explanation:**  
The `DataDisplay` component does not depend directly on the data fetching logic. Instead, it depends on the `useDataFetcher` hook, an abstraction. This aligns with the DIP by keeping high-level and low-level logic decoupled.

These examples illustrate how LSP, ISP, and DIP can be implemented in React with TypeScript, focusing on functional components. By adhering to these principles, you can create more modular, maintainable, and flexible code.
