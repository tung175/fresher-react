import logo from "./logo.svg";
import "./App.scss";
import Header from "./components/Header";
import TableUsers from "./components/TableUsers";
import Container from "react-bootstrap/Container";
import { useState } from "react";
import ModalAddNewUser from "./components/ModalAddNewUser";
import { ToastContainer, toast } from "react-toastify";
import '@fortawesome/fontawesome-free/css/all.min.css';
function App() {
  

  return (
    <>
      <div className="app-container">
        <Header />
        <Container>
          <TableUsers />
        </Container>

      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
    </>
  );
}

export default App;
