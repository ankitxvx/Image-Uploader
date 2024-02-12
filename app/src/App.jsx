import { useState } from 'react'
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/Register'

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.withCredentials = true;

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router> {/* Wrap your Routes in a Router */}
      <>
         <Routes>
            <Route path ="/"element = {<LoginPage/>}/>
            <Route path='/login' element ={<LoginPage/>}/>
            <Route path='/register' element ={<RegisterPage/>}/>
         </Routes>
      </>
    </Router>
  )
}

export default App
