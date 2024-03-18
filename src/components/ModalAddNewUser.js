import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { postCreateUser } from "../services/UserService";
import { toast } from "react-toastify";
const ModalAddNewUser = (props) => {
  let { handleClose, show, handleUpdateTabel } = props;

  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleSaveUser = async () => {

    let res = await postCreateUser(name, job)
    console.log(res);
    if (res && res.id) {
        handleClose()
        setName("")
        setJob("")
        toast.success("Create success")
        handleUpdateTabel({first_name: name, id: res.id})
    } else {
        toast.error("Create error")
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Job</label>
            <input
              type="text"
              className="form-control"
              value={job}
              onChange={(event) => setJob(event.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSaveUser()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAddNewUser;
