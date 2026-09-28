import { use, useEffect, useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [inputname, setinputname] = useState("")
  const [voterlist, setvoterlist] = useState([])
  const [currentquestion, setcurrentquestion] = useState("")

  let questions = [
    "Kya PTI ka jalsa kamyab hoga?",
    "Kya kal barish hogi?",
    "Kya aapko React seekhne mein maza aa raha hai?",
    "Kya AI insano ki jobs khatam kar dega?",
    "Kya cricket match mein Pakistan jeetega?"]

  useEffect(() => {
    let random = Math.floor(Math.random() * questions.length)
    setcurrentquestion(questions[random])
  }, [voterlist])

  let voteing = (choice) => {
    if (inputname == "") {
     return alert("Enter Your Name First.")
    }
    let obj = { name: inputname, choices: choice, currentq: currentquestion }
    setvoterlist([...voterlist, obj])
    setinputname("")
  }

  return (
    <>
      <div className="vote-card">
        <h1>{currentquestion}</h1>
        <input className="name-input" type="text" placeholder='Enter Your Name' value={inputname} onChange={(e) => setinputname(e.target.value)} />
        <button className="vote-btn yes-btn" onClick={() => voteing("Yes")}>Yes</button>
        <button className="vote-btn no-btn" onClick={() => voteing("No")}>No</button>
      </div>
      <div className="vote-list">
        {voterlist.map((data,ind)=>{
          return(
            <div className="vote-item" key={ind}>
              <h1>{data.currentq}</h1>
              <h2>{`${data.choices} Vote By ${data.name}`}</h2>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default App
