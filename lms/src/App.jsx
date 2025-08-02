// import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./components/pages/Home";
import CourceDetail from "./components/pages/CourceDetail";
import Courses from "./components/pages/Courses";
import Login from "./pages/account/Login";
import Register from "./pages/account/Register";
import MyAccount from "./pages/account/MyAccount";
import ChangePassword from "./pages/account/ChangePassword";
import MyLearning from "./pages/account/MyLearning";
import WatchCource from "./pages/account/WatchCource";
import MyCourses from "./pages/account/MyCourses";
import Dashboard from "./pages/account/Dashboard";
import AddCourse from "./pages/account/Courses/AddCourse";
import EditCourses from "./pages/account/Courses/EditCourses";
import { Toaster } from "react-hot-toast";
import { RequireAuth } from "./components/Shared/RequireAuth";


function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Toaster position="top-center" />
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route
            path="/cource-detail"
            element={<CourceDetail></CourceDetail>}
          ></Route>
          <Route path="/courses" element={<Courses></Courses>}></Route>

          <Route
            path="/account/dashboard"
            element={
              <RequireAuth>
                <Dashboard></Dashboard>
              </RequireAuth>
            }
          ></Route>

          <Route
            path="/account/add-course"
            element={
              <RequireAuth>
                <AddCourse></AddCourse>
              </RequireAuth>
            }
          ></Route>
          
          <Route
            path="/account/courses-edit/:id"
            element={
              <RequireAuth>
                <EditCourses></EditCourses>
              </RequireAuth>
            }
          ></Route>


          <Route path="/account/login" element={<Login></Login>}></Route>
          <Route
            path="/account/register"
            element={<Register></Register>}
          ></Route>
          <Route
            path="/account/my-account"
            element={<MyAccount></MyAccount>}
          ></Route>
          <Route
            path="/account/my-courses"
            element={<MyCourses></MyCourses>}
          ></Route>
          <Route
            path="/account/change-password"
            element={<ChangePassword></ChangePassword>}
          ></Route>
          <Route
            path="/account/course-enroled"
            element={<MyLearning></MyLearning>}
          ></Route>
          <Route
            path="/account/watch-course"
            element={<WatchCource></WatchCource>}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
