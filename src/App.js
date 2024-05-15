
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Signup from './Components/login/Signup';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Signup />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
