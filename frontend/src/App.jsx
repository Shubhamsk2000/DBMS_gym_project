// src/App.js
import LandingPage from './components/LandingPage';
import Members from './components/Members';
import Navbar from './components/Navbar';
import Trainers from './components/Trainers';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <Router>
      <Routes>
      <Route path='/' element={<>
        <Navbar />
        <LandingPage />
      </>
      } />
      <Route path='/signin' element={
        <>
          <Navbar />
          <SignIn />
        </>
      } />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/dashboard/:id' element={<Dashboard />} />
    </Routes>
    </Router >
  );
}

export default App;
