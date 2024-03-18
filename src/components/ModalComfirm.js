import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { deleteAUser, postCreateUser } from "../services/UserService";
import { toast } from "react-toastify";
const ModalComfirm = (props) => {
  let { handleClose, show, dataUserDelete, handleDeleteUserFormParent } = props;

  const confirmDelete = async () => {
    let res = await deleteAUser(dataUserDelete.id)
    if (res && +res.statusCode === 204) {
        handleDeleteUserFormParent(dataUserDelete)
        handleClose()
        toast.success("Delete success")
    } else {
        toast.error('Delete Error')
    }
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>
                Do you want delete this user?
                <br/>
                <b>Email: {dataUserDelete.email}</b>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => confirmDelete()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalComfirm;
