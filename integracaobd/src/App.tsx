import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Forget from "./pages/ForgetPassword/Forget";
import { Routes,Route } from "react-router-dom";

function App() {
  
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget" element={<Forget />} />
      </Routes>

    </div>
   
  )
}


export default App
