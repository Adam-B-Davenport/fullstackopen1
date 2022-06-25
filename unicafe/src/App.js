import { useState } from 'react'

const Feedback = (props) => {
  return (
    <button onClick={props.click}>{props.name}</button>
  )

}

const calculateAverage = (counts, total) => {
  if (total == 0)
    return 0
  return ((counts[0] - counts[2]) / total).toFixed(2)
}

const calculatePositive = (counts, total) => {
  if (total == 0)
    return '0%'
  return `${((counts[0]) / total).toFixed(2)}% `
}

const StatisticsLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td align='left'>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const items = props.items
  const counts = props.items.map(x => x.count)
  const total = counts.reduce((total, cur) => total + cur)
  if (total == 0)
    return (<p>No feedback given</p>)
  else
    return (
      <table>
        <tbody>
          <StatisticsLine text={items[0].name} value={items[0].count} />
          <StatisticsLine text={items[1].name} value={items[1].count} />
          <StatisticsLine text={items[2].name} value={items[2].count} />
          <StatisticsLine text="all" value={total} />
          <StatisticsLine text="average" value={calculateAverage(counts, total)} />
          <StatisticsLine text="positive" value={calculatePositive(counts, total)} />
        </tbody>
      </table >
    )

}

const App = () => {

  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const items = [
    {
      name: "good",
      count: good,
      set: setGood,
      set: () => {
        setGood(good + 1)
      },
    },
    {
      name: "neutral",
      count: neutral,
      set: () => {
        setNeutral(neutral + 1)
      },
    },
    {
      name: "bad",
      count: bad,
      set: () => {
        setBad(bad + 1)
      },
    }
  ]

  return (
    <div>
      <h2>Give Feedback</h2>
      <Feedback name={items[0].name} click={items[0].set} />
      <Feedback name={items[1].name} click={items[1].set} />
      <Feedback name={items[2].name} click={items[2].set} />

      <h2>Statistics</h2>
      <Statistics items={items} />
    </div>
  )
}

export default App
