import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => {
  return (
      <button onClick={onClick}>{text}</button>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [numVotes, setNumVotes] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0
  })
  const [topQuote, setTopQuote] = useState(0)

  const handleClick = () => {
    setSelected(Math.floor(Math.random() * props.anecdotes.length))
  }

  const vote = () => {
    const newVotes = {...numVotes}
    newVotes[selected] = numVotes[selected] + 1
    let most = getMost(newVotes)
    setNumVotes(newVotes)
    setTopQuote(most)
  }

  const getMost = (data) => {
    let temp = 0
    for (let i = 1; i < Object.keys(data).length; i++) {
      if (data[temp] < data[i]) {
        console.log('Made it here')
        temp = i
      }
    }
    return temp
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <div>has {numVotes[selected]} votes</div>
      <Button onClick={vote} text='vote' />
      <Button onClick={handleClick} text='next anecdote' />
      <h1>Anecdote with the most votes</h1>
      {props.anecdotes[topQuote]}
      <div>has {numVotes[topQuote]}</div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)