# React Design Patterns

This is a collection of the most important design patterns to use in React. Made by [Cosden Solutions](https://cosden.solutions).

## 1. Single Responsibility Principle

Your components should have only one responsibility. They should only do "one thing" and delegate everything else to other components. Here's an example of a component that has too many responsibilities:

```tsx
// ❌ Too many responsibilities!
function BigComponent() {
  // Responsible for multiple unrelated states
  const [data, setData] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Responsible for fetching data
  useEffect(() => {
    fetch("/api/data")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  // Responsible for implementing sending analytics events
  useEffect(() => {
    sendAnalyticsEvent("page_view", { page: "big_component" });
  }, []);

  // Responsible for toggling modal
  function toggleModal() {
    setIsModalOpen((prev) => !prev);
  }

  // ... other code
}
```

Instead, create multiple components/hooks each with a single responsibility.

First, create `useFetchData.ts`. This hook will hold the `data` state and manage fetching and updating it.

```tsx
// ✅ Single responsibility: managing data
export function useFetchData() {
  const [data, setData] = useState();

  useEffect(() => {
    fetch("/api/data")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  return data;
}
```

Or even better, use [`react-query`](https://tanstack.com/query/latest).

```tsx
// ✅ Single responsibility: managing data through react query
export function useFetchData() {
  return useQuery({
    queryKey: ["data"],
    queryFn: () => fetch("/api/data"),
  });
}
```

Then create `usePageAnalytics.ts`. This hook will receive an `event` through props and send it.

```tsx
type Event = {
  page: string;
};

// ✅ Single responsibility: managing analytics
export function usePageAnalytics(event: Event) {
  useEffect(() => {
    sendAnalyticsEvent("page_view", event);
  }, []);
}
```

Finally create `Modal.tsx`. This component will receive `children` as props, and manage its own `isModalOpen` state.

```tsx
type ModalProps = {
  children: React.ReactNode;
};

// ✅ Single responsibility: managing modals
export function Modal({ children }: ModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function toggleModal() {
    setIsModalOpen((prev) => !prev);
  }

  return (
    <>
      <button onPress={toggleModal}>Open</button>
      {isModalOpen && children}
    </>
  );
}
```

With this, `BigComponent` just needs to import and put everything together. It is now small, easy to manage, and highly scalable.

```tsx
import { useFetchData } from "./useFetchData";
import { useAnalytics } from "./useAnalytics";
import { Modal } from "./Modal";

// ✅ Single responsibility: put everything together
function BigComponent() {
  const data = useFetchData();

  useAnalytics();

  return <Modal>{/* ... other code */}</Modal>;
}
```

## 2. Container and Presentation Components

To keep code organized, you can split your components into a container and a presentation component. The container component holds all the logic, and the presentation component renders the UI.

```tsx
// Container component responsible for logic
function ContainerComponent() {
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const filteredItems = filterItems(items, filters);
  }, [filters]);

  function handleFilters(newFilters) {
    setFilters(newFilters);
  }

  // ... other business logic code

  return <PresentationComponent items={items} />;
}

// Presentation component responsible for UI
function PresentationComponent({ items }) {
  return (
    <>
      {/* ... other UI code */}
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
      {/* ... other UI code */}
    </>
  );
}
```

## 3. Compound Components Pattern

Group components meant to be used together into a compound component with the React Context API.

```tsx
import { createContext, useState } from "react";

const ToggleContext = createContext();

// Main component exported for use in project
export default function Toggle({ children }) {
  const [on, setOn] = useState(false);

  function toggle() {
    setOn(!on);
  }

  return (
    <ToggleContext.Provider value={{ on, toggle }}>
      {children}
    </ToggleContext.Provider>
  );
}

// Compound component attached to main component
Toggle.On = function ToggleOn({ children }) {
  const { on } = useContext(ToggleContext);
  return on ? children : null;
};

// Compound component attached to main component
Toggle.Off = function ToggleOff({ children }) {
  const { on } = useContext(ToggleContext);
  return on ? null : children;
};

// Compound component attached to main component
Toggle.Button = function ToggleButton(props) {
  const { on, toggle } = useContext(ToggleContext);
  return <button onClick={toggle} {...props} />;
};
```

This component can now be used anywhere with great flexibility. Place sub-components in any order, or only use a subset of them:

```tsx
import Toggle from "@/components/Toggle";

// Example use case with all components
function App() {
  return (
    <Toggle>
      <Toggle.On>The button is on</Toggle.On>
      <Toggle.Off>The button is off</Toggle.Off>
      <Toggle.Button>Toggle</Toggle.Button>
    </Toggle>
  );
}

// Example use case with different order
function App() {
  return (
    <Toggle>
      <Toggle.Button>Toggle</Toggle.Button>
      <Toggle.Off>The button is off</Toggle.Off>
      <Toggle.On>The button is on</Toggle.On>
    </Toggle>
  );
}

// Example use case with partial components
function App() {
  return (
    <Toggle>
      <Toggle.Button>Toggle</Toggle.Button>
    </Toggle>
  );
}
```

## 4. Nested Prop Forwarding

When a flexible component uses another, allow props to be forwarded to the nested component.

```tsx
// Receives props as `...rest`
function Text({ children, ...rest }) {
  return (
    <span className="text-primary" {...rest}>
      {children}
    </span>
  );
}

// Button component uses `Text` component for its text
function Button({ children, textProps, ...rest }) {
  return (
    <button {...rest}>
      {/* ✅ `textProps` are forwarded */}
      <Text {...textProps}>{children}</Text>
    </button>
  );
}
```

Example usage:

```tsx
function App() {
  return (
    <Button textProps={{ className: "text-red-500" }}>
      Button with red text
    </Button>
  );
}
```

## 5. Children Components Pattern

To improve performance and prevent unnecessary re-renders, lift up components and pass them as children instead.

```tsx
function Component() {
  const [count, setCount] = useState(0);

  return (
    <div>
      {count}
      {/* ❌ Expensive component will re-render unnecessarily everytime count changes */}
      <ExpensiveComponent />
    </div>
  );
}
```

Moving `ExpensiveComponent` up and passing it as children will prevent it re-rendering

```tsx
// Component
function Component({ children }) {
  const [count, setCount] = useState(0);

  // ✅ Children don't re-render when state changes
  return <Component>{children}</Component>;
}

// App
function App() {
  return (
    <Component>
      {/* ✅ Expensive component will not re-render when Component does */}
      <ExpensiveComponent />
    </Component>
  );
}
```

## 6. Custom Hooks

To keep code clean and re-usable, extract related functionality into a custom hook that can be shared.

```tsx
// ❌ All code related to `items` is directly in component.
function Component() {
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const filteredItems = filterItems(items, filters);
  }, [filters]);

  function handleFilters(newFilters) {
    setFilters(newFilters);
  }

  // ... other code
}
```

You can create `useFilteredItems.ts` and put all of the functionality there.

```tsx
// ✅ All code related to `items` is in custom re-usable hook
export function useFilteredItems() {
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const filteredItems = filterItems(items, filters);
  }, [filters]);

  function handleFilters(newFilters) {
    setFilters(newFilters);
  }

  return {
    items,
    filters,
    handleFilters,
  };
}
```

Then in `Component` you can use the hook instead.

```tsx
// ✅ Component is cleaner, and can share functionality of filtered items
function Component() {
  const { items, filters, handleFilters } = useFilteredItems();

  // ... other code
}
```

## 7. Higher Order Components (HOC)

Sometimes, it's better to create a higher order component (HOC) to share re-usable functionality.

```tsx
function Button(props) {
  // ❌ Styles object is duplicated
  const style = { padding: 8, margin: 12 };
  return <button style={style} {...props} />;
}

function TextInput(props) {
  // ❌ Styles object is duplicated
  const style = { padding: 8, margin: 12 };
  return <input type="text" style={style} {...props} />;
}
```

With HOCs, you can create a wrapper component that takes a component with its props, and enhances it.

```tsx
// ✅ Higher order component to implement styles
function withStyles(Component) {
  return (props) => {
    const style = { padding: 8, margin: 12 };

    // Merges component props with custom style object
    return <Component style={style} {...props} />;
  };
}

// Inner components receive style through props
function Button({ style, ...props }) {
  return <button style={style} {...props} />;
}
function TextInput({ style, ...props }) {
  return <input type="text" style={style} {...props} />;
}

// ✅ Wrap exports with HOC
export default withStyles(Button);
export default withStyles(Text);
```

## 8. Variant Props

If you have components that are shared across the app, create variant props to easily customize them using preset values.

```tsx
type ButtonProps = ComponentProps<"button"> & {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
};

function Button({ variant = "primary", size = "md", ...rest }: ButtonProps) {
  // ✅ Styles derived based on variant and size
  const style = {
    ...styles.variant[variant],
    ...styles.size[size],
  };

  return <button style={style} {...rest} />;
}

// ✅ Custom object with clearly defined styles for every variant/size
const styles = {
  variant: {
    primary: {
      backgroundColor: "blue",
    },
    secondary: {
      backgroundColor: "gray",
    },
  },
  size: {
    sm: {
      minHeight: 10,
    },
    md: {
      minHeight: 12,
    },
    lg: {
      minHeight: 16,
    },
  },
};
```

Example usage:

```tsx
function App() {
  return (
    <div>
      <Button>Primary Button</Button>
      <Button variant="secondary" size="sm">
        Secondary Button
      </Button>
    </div>
  );
}
```

## 9. Expose functionality through ref

Sometimes it can be useful to export functionality from one child component to a parent through a ref. This can be done using the `useImperativeHandle` hook.

```tsx
type Props = {
  componentRef: React.RefObject<{ reset: () => void }>;
};

function Component({ componentRef }: Props) {
  const [count, setCount] = useState(0);

  // ✅ Exposes custom reset function to parent through ref to change state
  useImperativeHandle(componentRef, () => ({
    reset: () => {
      setCount(0);
    },
  }));

  return (
    <div>
      {count}
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

And to use it, simply create a ref in the same component where it is rendered.

```tsx
function App() {
  const componentRef = useRef(null);

  return (
    <>
      <Component componentRef={componentRef} />

      {/* ✅ Using the ref we can reset the inner state of Component */}
      <button onClick={() => componentRef.current?.reset()}>Reset</button>
    </>
  );
}
```

## 10. Use providers for frequently used data

If you have data that is shared across multiple components, consider putting it in a provider using the Context API.

```tsx
function Component1() {
  // ❌ User is fetched in multiple components
  const { data: user } = useFetchUser();

  // ❌ Unnecessary duplicate check for undefined user
  if (!user) {
    return <div>Loading...</div>;
  }

  // ... return JSX
}

function Component2() {
  // ❌ User is fetched in multiple components
  const { data: user } = useFetchUser();

  // ❌ Unnecessary duplicate check for undefined user
  if (!user) {
    return <div>Loading...</div>;
  }

  // ... return JSX
}
```

With a Provider, we can have all of that functionality inside a single component.

```tsx
const UserContext = createContext(undefined);

function UserProvider({ children }) {
  // ✅ User fetch is done in provider
  const { data: user } = useFetchUser();

  // ✅ User check is done in provider
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    {/* ✅ User is always going to be available from here on */}
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}

// Custom hook to easily access context
export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserProvider.');
  }

  return context;
}
```

After wrapping the entire app with it, you can use the shared functionality everywhere.

```tsx
function App() {
  return (
    {/* ✅ Wrap every component with the provider */}
    <UserProvider>
      <Component1 />
      <Component2 />
    </UserProvider>
  );
}
function Component1() {
  // ✅ User is accessed from provider
  const { user } = useUser();

  // ✅ Can directly use user without checking if it is there
}

function Component2() {
  // ✅ User is accessed from provider
  const { user } = useUser();

  // ✅ Can directly use user without checking if it is there
}
```
