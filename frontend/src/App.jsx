import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { ToastContainer } from "react-toastify";
import AddSellerForm from "./sell/AddSellerForm";
import AllSellersTable from "./sell/AllSellersTable";
import SellerDashboard from "./sell/SellerDashboard"
import Projects from "./User/Projects";
import ViewProjects from "./User/ViewProjects";
import Unauthorized from "./pages/Unauthorized";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loginSuccess } from "./redux/slices/authSlice";
import Idea from "./Idea/Idea";
import UserDashboard from "./User/UserDashboard";

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const user=JSON.parse(localStorage.getItem("user"))
    const token=localStorage.getItem("token")
    if (user && token) {
      dispatch(loginSuccess({ user, token }));
    }
  }, [dispatch]);
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* user */}
       <Route path="/projects/:category" element={<Projects />} />
        <Route path="/projects/view/:id" element={<ViewProjects />} /> 
        <Route path="/userDashboard" element={<UserDashboard />} />

      {/* seller */}
      <Route path="/sellerform" element={<AddSellerForm />} />
      <Route path="/allseller" element={<AllSellersTable />} />
      <Route path="/seller/dashboard" element={<SellerDashboard />} />

      <Route path="/idea" element={<Idea />} />
   
    </Routes>
     <ToastContainer />
    </>
  );
}

export default App;
