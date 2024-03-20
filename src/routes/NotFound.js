import { Alert } from "react-bootstrap";

const NotFound = () => {
  return (
    <>
      <Alert variant="danger" >
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
          Not Found
        </p>
      </Alert>
    </>
  );
};

export default NotFound;
