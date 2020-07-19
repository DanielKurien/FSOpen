import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ name, handleClick }) => (
  <button onClick={handleClick}>{name}</button>
);

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td> <td>{value}</td>
  </tr>
);
const Statistics = ({ good, neutral, bad }) => (
  <>
    <table>
      <Statistic text="good" value={good} />
      <Statistic text="neutral" value={neutral} />
      <Statistic text="bad" value={bad} />
      <Statistic
        text="average"
        value={(good * 1 + bad * -1) / (good + neutral + bad)}
      />
      <Statistic
        text="positive"
        value={(good / (good + neutral + bad)) * 100 + "%"}
      />
    </table>
  </>
);
const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <h1>give feedback</h1>
      <Button name="good" handleClick={() => setGood(good + 1)} />
      <Button name="neutral" handleClick={() => setNeutral(neutral + 1)} />
      <Button name="bad" handleClick={() => setBad(bad + 1)} />
      <h1>statistics</h1>

      {good + bad + neutral === 0 ? (
        <p>No feedback given</p>
      ) : (
        <Statistics good={good} neutral={neutral} bad={bad} />
      )}
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
