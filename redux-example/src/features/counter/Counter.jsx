import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  decrement,
  decrementByAmount,
  increment,
  incrementAsync,
  incrementByAmount,
} from "./counterSlice";

export const Counter = ({ count }) => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(0);
  //   const increment = () => dispatch(increment());
  return (
    <div className="container">
      <div className="row m-3">
        <div className="col-3">
          <label htmlFor="amount">Amount</label>
        </div>
        <div className="col-5 col-md-3">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div />
      </div>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <div className="row m-5 text-primary">
        <p>Increase By Amount</p>
      </div>

      <button onClick={() => dispatch(incrementByAmount(amount))}>+</button>
      <button onClick={() => dispatch(decrementByAmount(amount))}>-</button>

      <button onClick={() => dispatch(incrementAsync(amount))}>Async +</button>
      <div className="row text-info md-auto">
        <div className="col-4 m-auto">The counter: {count}</div>
      </div>
    </div>
  );
};
