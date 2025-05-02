### React lifecycle methods or Phases

- Initialization
- Mounting
  - constructor()
  - componentDidMount()
  - render()
  - componentWillMount() (deprecated)
- Updating
- Unmounting
  - componentWillUnmount()
  - componentDidUnmount() (deprecated)

> code example:

```jsx
import React from "react";
import ReactDOM from "react-dom";

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hello: "World!" };
  }
  componentWillMount() {
    console.log("componentWillMount()");
  }
  componentDidMount() {
    console.log("componentDidMount()");
  }
  changeState() {
    this.setState({ hello: "Geek!" });
  }
  render() {
    return (
      <div>
        <h1>GeeksForGeeks.org, Hello{this.state.hello}</h1>
        <h2>
          <a onClick={this.changeState.bind(this)}>Press Here!</a>
        </h2>
      </div>
    );
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate()");
    return true;
  }
  componentWillUpdate() {
    console.log("componentWillUpdate()");
  }
  componentDidUpdate() {
    console.log("componentDidUpdate()");
  }
}
ReactDOM.render(<Test />, document.getElementById("root"));
```

- What is higher order component

- Different hooks

  - useState
  - useEffect
  - useMemo
  - useCallback
  - useReducer
  - useRef
  - useContext
  - useProvider
  - useLayoutEffect
  - useImperativeHandle
  - useTransition

- React.memo()
