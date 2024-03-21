import logo from "./logo.svg";
import "./App.scss";
import Header from "./components/Header";
import TableUsers from "./components/TableUsers";
import Container from "react-bootstrap/Container";
import { useContext, useEffect, useState } from "react";
import ModalAddNewUser from "./components/ModalAddNewUser";
import { ToastContainer, toast } from "react-toastify";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import { UserContext } from "./context/UserContext";
import AppRoutes from "./routes/AppRoutes";
import { useDispatch, useSelector } from "react-redux";
import { handleRefresh } from "./redux/actions/userAction";

function App() {

  const dataUserRedux = useSelector(state => state.user.userAcc)
  console.log(dataUserRedux);
  // const { user, loginContext } = useContext(UserContext);
  const dispatch = useDispatch()
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(handleRefresh())
      // loginContext(
      //   localStorage.getItem("email"),
      //   localStorage.getItem("token")
      // );
    }
  }, []);
  return (
    <>
      <div className="app-container">
        <Header />
        <Container>
          <AppRoutes/>
        </Container>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        // transition="Bounce"
      />
    </>
  );
}

export default App;
