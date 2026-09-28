# Voting App (Smit)

A small React app where users vote **Yes** or **No** on a random question. Every vote is
saved in a list and shown on the page, so you can see the question and who voted what.

Built with **React 19** and **Vite**.

---

## What the app does

1. A question is picked at random from a list of 5 questions.
2. You type your name in the input box.
3. You click **Yes** or **No**.
4. Your vote is added to the list below as a card (question + "Yes/No Vote By YourName").
5. After every vote, a **new random question** is picked.
6. If you click a button without typing a name, an alert says `Enter Your Name First.`

Note: votes are only kept in memory, so they disappear when you refresh the page.

---

## Getting started

You need [Node.js](https://nodejs.org) installed (version 20 or newer).

### 1. Install the packages

```bash
npm install
```

### 2. Start the dev server

```bash
npm run dev
```

Open the link shown in the terminal (usually <http://localhost:5173>) in your browser.
The page updates automatically when you save a file.

### 3. Other commands

| Command           | What it does                                     |
| ----------------- | ------------------------------------------------ |
| `npm run dev`     | Starts the local dev server                      |
| `npm run build`   | Builds the app for production into `dist/`       |
| `npm run preview` | Previews the production build locally            |
| `npm run lint`    | Runs ESLint to check the code                    |

---

## Project structure

```
Voting_App_Smit/
├── index.html            # The HTML page (page title, favicon)
├── package.json          # Project name, scripts and dependencies
├── vite.config.js        # Vite config (uses the React plugin)
├── eslint.config.js      # ESLint rules
├── public/               # Static files served as-is (favicon)
└── src/
    ├── main.jsx          # Entry point — renders <App /> into #root
    ├── App.jsx           # All the app logic and markup
    ├── App.css           # Styling for the app
    ├── index.css         # Default Vite styles (not used by App)
    └── assets/           # Images and logos
```

---

## How the code works (`src/App.jsx`)

### State (data that changes over time)

```jsx
const [inputname, setinputname] = useState("")      // what's typed in the input
const [voterlist, setvoterlist] = useState([])      // array of all votes
const [currentquestion, setcurrentquestion] = useState("") // question on screen
```

### The questions

```jsx
let questions = [
  "Kya PTI ka jalsa kamyab hoga?",
  "Kya kal barish hogi?",
  "Kya aapko React seekhne mein maza aa raha hai?",
  "Kya AI insano ki jobs khatam kar dega?",
  "Kya cricket match mein Pakistan jeetega?"]
```

### Picking a random question (`useEffect`)

`useEffect` runs after the page renders and whenever `voterlist` changes,
which is exactly when we want a new question.

```jsx
useEffect(() => {
  let random = Math.floor(Math.random() * questions.length)
  setcurrentquestion(questions[random])
}, [voterlist])
```

- `Math.random()` gives a random number between 0 and 1.
- `Math.floor()` rounds it down to a whole number.
- `questions[random]` picks the question at that index.

### Saving a vote

```jsx
let voteing = (choice) => {
  if (inputname == "") {
    return alert("Enter Your Name First.")
  }
  let obj = { name: inputname, choices: choice, currentq: currentquestion }
  setvoterlist([...voterlist, obj])
  setinputname("")
}
```

- `choice` is `"Yes"` or `"No"`, passed by the button click.
- `[...voterlist, obj]` copies the old array and adds the new vote at the end.
- `setinputname("")` clears the input box so the next voter can type their name.

### Showing the votes

```jsx
{voterlist.map((data, ind) => (
  <div className="vote-item" key={ind}>
    <h1>{data.currentq}</h1>
    <h2>{`${data.choices} Vote By ${data.name}`}</h2>
  </div>
))}
```

`map()` goes through the array and returns JSX for each vote. `key={ind}` gives each
item a unique key so React knows which item is which.

---

## Styling (`src/App.css`)

All the styling lives in `App.css`, using class names added in `App.jsx`:

| Class          | Used for                              |
| -------------- | ------------------------------------- |
| `vote-card`    | The card holding the question + input |
| `name-input`   | The name text box                     |
| `vote-btn`     | Shared button style                   |
| `yes-btn`      | Green **Yes** button                  |
| `no-btn`       | Red **No** button                     |
| `vote-list`    | The container of all saved votes      |
| `vote-item`    | One saved vote card                   |

To change the app's colours, edit the variables at the top of `App.css`:

```css
:root {
  --brand: #3b6ef5;  /* blue accent  */
  --yes:   #15a34a;  /* Yes button   */
  --no:    #e02424;  /* No button    */
}
```

The layout is responsive — under 640px the buttons stack and become full width, and the
design also follows the system's dark mode setting.
