import './App.css'
import { Routes, Route } from "react-router-dom";;
import ResetPass from './page/ResetPass';

function App() {

  return (
    <Routes>
      <Route path='/reset-password/:token' element={<ResetPass/>}/>
    </Routes>

  )
}

export default App
