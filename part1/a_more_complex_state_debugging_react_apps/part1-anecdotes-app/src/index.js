import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const anecdotes = [
  {
    name: 'If it hurts, do it more often',
    vote: 0
  },
  {
    name: 'Adding manpower to a late software project makes it later!',
    vote: 0
  },
  {
    name: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    vote: 0
  },
  {
    name: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    vote: 0
  },
  {
    name: 'Premature optimization is the root of all evil.',
    vote: 0
  },
  {
    name: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    vote: 0
  },
];

const App = (props) => {
  const [selected, setSelected] = useState(0);

  const [vote, setVote] = useState(props.anecdotes);
  const nextAnecdote = () => {
    setSelected(Math.floor(Math.random() * 5));

  }

  const votesCount = () => {
    let anecdotes = [...vote];
    anecdotes[selected].vote += 1;
    setVote(anecdotes);
  }

  return (

    <div>
      <h2>Anecdote of the day</h2>
      <div>{vote[selected].name}</div>
      <div>has {vote[selected].vote} votes</div>
      <br />
      <button onClick={votesCount}>Vote</button>
      <button onClick={nextAnecdote}>next anecdote</button>
      <h2>Anecodete with most votes</h2>
      {`${vote.reduce(function (prev, current) {
        return (prev.vote > current.vote) ? prev : current
      }).name} has ${vote.reduce(function (prev, current) {
        return (prev.vote > current.vote) ? prev : current
      }).vote} votes`}
    </div>
  )
}

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'))
