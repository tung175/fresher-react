import { Route, Routes } from "react-router-dom";
import TableUsers from "../components/TableUsers";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Alert } from "react-bootstrap";

const PrivateRoute = (props) => {
    console.log(props);
  const { user } = useContext(UserContext);
  if (user && !user.auth) {
    return (
      <>
        <Alert variant="danger">
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>
            You don't have permission 
          </p>
        </Alert>
      </>
    );
  }
  return (
    <>
      {props.children}
    </>
  );
};

export default PrivateRoute;
