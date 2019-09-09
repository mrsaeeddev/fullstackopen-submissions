import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Statistics = ({ good, neutral, bad, value }) => {

    const checkNaN = (value) => {
        return Number.isNaN(value) ? 0 : value;
    }

    return (
        <> {good + bad + neutral > 0 ?
            (<div><h3>Statistics</h3>
                <p>good : {good}</p>
                <p>neutral : {neutral}</p>
                <p>bad : {bad}</p>
                <p>all : {good + bad + neutral}</p>
                <p>average : {checkNaN(value / (good + bad + neutral))}</p>
                <p>positive : {checkNaN(good / (good + neutral + bad)) * 100}%</p></div>)
            : <div><br />No feedback given</div>
        }
        </>
    )
}

const Button = ({ onClick, text }) => (
    <>
        <button onClick={onClick} >{text}</button>
    </>
)

const App = (props) => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);
    const [value, setValue] = useState(0);


    const setGoodFunction = () => {
        setGood(good + 1);
        setValue(value + 1);
    }

    const setNeutralFunction = () => {
        setNeutral(neutral + 1);
        setValue(value + 0);

    }

    const setBadFunction = () => {
        setBad(bad + 1);
        setValue(value - 1);
    }

    return (
        <div>
            <h1>give feedback</h1>
            <div>
                <Button onClick={setGoodFunction} text="good" />
                <Button onClick={setNeutralFunction} text="neutral" />
                <Button onClick={setBadFunction} text="bad" />
                <Statistics good={good} neutral={neutral} bad={bad} value={value} />
            </div>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
