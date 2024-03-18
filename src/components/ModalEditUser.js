import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { putUpdateUser } from "../services/UserService";
const ModalEditUser = (props) => {
  let { handleClose, show, dataUserEdit, handlePutByIdFormPatent } = props;

  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleEditUser = async () => {
    let res = await putUpdateUser(name, job)
    console.log(res);
    if (res && res.updatedAt) {
        handleClose()
        setName("")
        setJob("")
        toast.success("Update success")
        handlePutByIdFormPatent({first_name: name, id: dataUserEdit.id})
    } else {
        toast.error("Create error")
    }
  };

  useEffect(() => {
    if (show) {
        setName(dataUserEdit.first_name)
    }
  }, [dataUserEdit])
//   console.log(show);
//   console.log(dataUserEdit);
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit user</Modal.Title>
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
          <Button variant="primary" onClick={() => handleEditUser()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalEditUser;
