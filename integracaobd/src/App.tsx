import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Forget from "./pages/ForgetPassword/Forget";
import NotFound from "./pages/NotFound/NotFound";
import { Routes,Route } from "react-router-dom";

function App() {
  
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget" element={<Forget />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

    </div>
   
  )
}


export default App
