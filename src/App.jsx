import './App.css'
import { Matrix, sendGroupEvent } from './components/Matrix'

function App() {
  return (
    <div>
      <div className="flex spacing-1">
        <button onClick={sendGroupEvent}>Add a box in a new group</button>
      </div>

      <div id="container">
        <Matrix.Provider>
          <Matrix />
        </Matrix.Provider>
      </div>
    </div>
  )
}

export default App
