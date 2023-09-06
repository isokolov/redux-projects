import { useSelector } from "react-redux";
import "./App.css";
import { Counter } from "./features/counter/Counter";
function App() {
  const count = useSelector((state) => state.counter.value);
  return (
    <div className="App">
      <header>
        <h2>Counter Redux Example</h2>
        <Counter count={count} />
      </header>
    </div>
  );
}

export default App;
