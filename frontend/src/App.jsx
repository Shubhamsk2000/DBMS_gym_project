// src/App.js
import Members from './components/Members';
import Trainers from './components/Trainers';

function App() {
  return (
    <div className="App">
      <h1>Fitness Center Management System</h1>
      <div className="flex-container">
        <Members />
        <Trainers />
      </div>
    </div>
  );
}

export default App;
