import React, {useState, useEffect, useRef} from 'react';
import './App.css';


function App() {
    const [wordsCounted, setwordsCounted] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const [formState, setFormState] = useState({ isChecked: false, textArea: '', timer: 5 })
    const [timer, setTimer] = useState(formState.timer)

    const useTextAreaRef = useRef(null)


    const handleChange = (e) => {
         const target = e.target;
         const value =  target.type === 'checkbox' ? target.checked : target.value;
         const { name } = e.target;

         setFormState(prevState => ({ ...prevState, [name]: value }));
    }


    const setTimerFromInput = (e) => {
        e.preventDefault();
        handleChange(e)
        setTimer(formState.timer);
    }

    const countWords = () => {
        const input = formState.textArea.split(' ');
        const sum = input.filter( word => word !== '' ).length
        return sum
    }

    const startGame = () => {
        setIsRunning(true)
        setTimer(formState.timer);
        useTextAreaRef.current.disabled = false
        useTextAreaRef.current.focus()

        setFormState(prevState => ({...prevState,  textArea: ''}));
    }


    const endGame = () => {
        setIsRunning(false);
        setwordsCounted(countWords());

        setFormState(prevState => ({
            ...prevState,
            isChecked: false
        }));
    };

    useEffect(() => {
        if (timer > 0 && isRunning) {
            setTimeout(() => setTimer(prevTime => prevTime - 1), 1000);
        } else endGame()
    }, [timer, isRunning]);

  return (
    <div className="App">
      <h1>Speed Typing Game</h1>

      <form className='setTimeForm'>
        <label>Set your time in seconds: </label>
        <input
          name="timer"
          type="number"
          onChange={handleChange}
          value={formState.timer}
        />
        <button className="setTimeBtn" onClick={setTimerFromInput}>
          OK!
        </button>
      </form>

      <textarea
        type="text"
        ref={useTextAreaRef}
        disabled={!isRunning}
        value={formState.textArea}
        onChange={handleChange}
        name="textArea"
      />
      <h3>Time remaining: {timer} sec.</h3>

      <form>
        <label>Are you Ready?</label>
        <input
          type="checkbox"
          checked={formState.isChecked}
          onChange={handleChange}
          name="isChecked"
        />
        <br />
        <button 
            className="startBtn" 
            disabled={isRunning} 
            onClick={startGame}>
          START
        </button>
      </form>

      <h3>Words counted: {wordsCounted}</h3>
      <div className="guide">
        <p>* You can start this game with two ways:</p>
        <ol>
          <li>just click on START button</li>
          <li>
            check ,,Are you ready box,, and then just click ENTER
          </li>
        </ol>
      </div>
    </div>
  );
}

export default App;
