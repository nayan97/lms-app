import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./components/pages/Home";
import CourceDetail from "./components/pages/CourceDetail";
import Cource from "./components/pages/Cource";
import Login from "./pages/account/Login"
import Register from "./pages/account/Register"
import MyAccount from "./pages/account/MyAccount"
import ChangePassword from "./pages/account/ChangePassword"
import CourceEnroled from "./pages/account/CourceEnroled"
import WatchCource from "./pages/account/WatchCource"


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home></Home>} ></Route>
          <Route path="/cource-detail" element={<CourceDetail></CourceDetail>} ></Route>
          <Route path="/cource" element={<Cource></Cource>} ></Route>
          <Route path="/account/login" element={<Login></Login>} ></Route>
          <Route path="/account/register" element={<Register></Register>} ></Route>
          <Route path="/account/my-account" element={<MyAccount></MyAccount>} ></Route>
          <Route path="/account/change-password" element={<ChangePassword></ChangePassword>} ></Route>
          <Route path="/account/cource-enroled" element={<CourceEnroled></CourceEnroled>} ></Route>
          <Route path="/account/watch-cource" element={<WatchCource></WatchCource>} ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
