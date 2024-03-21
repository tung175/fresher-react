import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../services/UserService";
import ReactPaginate from "react-paginate";
import ModalAddNewUser from "./ModalAddNewUser";
import ModalEditUser from "./ModalEditUser";
import _, { debounce } from "lodash";
import ModalComfirm from "./ModalComfirm";
import "./TableUser.scss";
import { CSVLink, CSVDownload } from "react-csv";
import Papa from "papaparse";
import { toast } from "react-toastify";
import { Row } from "react-bootstrap";
const TableUsers = () => {
  const [listUser, setListUser] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [dataUserEdit, setDataUserEdit] = useState({});
  const [dataUserDelete, setDataUserDelete] = useState({});

  const [sortBy, setSortBy] = useState("asc");
  const [sortField, setSortField] = useState("id");

  const [keyword, setKeyword] = useState("");
  const [dataExport, setDataExprot] = useState([]);
  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy);
    setSortField(sortField);
    let cloneListUser = _.cloneDeep(listUser);
    cloneListUser = _.orderBy(cloneListUser, [sortField], [sortBy]);
    setListUser(cloneListUser);
  };
  const handleClose = () => {
    setShow(false);
    setShowEdit(false);
    setShowDelete(false);
  };
  const handleShow = () => {
    setShow(true);
    // setShowEdit(true)
  };

  const handleUpdateTabel = (user) => {
    setListUser([user, ...listUser]);
  };

  const handlePutByIdFormPatent = (user) => {
    let cloneListUser = _.cloneDeep(listUser);
    let index = listUser.findIndex((item) => item.id === user.id);
    cloneListUser[index].first_name = user.first_name;

    setListUser(cloneListUser);
  };

  const handleDeleteUserFormParent = (user) => {
    let cloneListUser = _.cloneDeep(listUser);
    cloneListUser = cloneListUser.filter((item) => item.id !== user.id);

    setListUser(cloneListUser);
  };

  const handleEditUser = (user) => {
    setShowEdit(true);
    setDataUserEdit(user);
    // console.log(user);
  };

  const handleDeleteUser = (user) => {
    setShowDelete(true);
    setDataUserDelete(user);
    // console.log(user);
  };
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async (page) => {
    let res = await fetchAllUser(page);

    if (res && res.data) {
      setListUser(res.data);
      setTotalUsers(res.total);
      setTotalPages(res.total_pages);
    }
  };

  const handlePageClick = (event) => {
    getUsers(+event.selected + 1);
  };

  const handleSearch = debounce((event) => {
    let term = event.target.value;
    if (term) {
      let cloneListUser = _.cloneDeep(listUser);
      cloneListUser = cloneListUser.filter((item) => item.email.includes(term));
      setListUser(cloneListUser);
    } else {
      getUsers();
    }
  }, 300);

  const csvData = [
    ["firstname", "lastname", "email"],
    ["Ahmed", "Tomi", "ah@smthing.co.com"],
    ["Raed", "Labes", "rl@smthing.co.com"],
    ["Yezzi", "Min l3b", "ymin@cocococo.com"],
  ];

  const getUsersExprot = (event, done) => {
    let res = [];
    if (listUser && listUser.length > 0) {
      res.push(["ID", "Email", "First Name", "Last Name"]);
      listUser.map((item, index) => {
        let arr = [];
        arr[0] = item.id;
        arr[1] = item.email;
        arr[2] = item.first_name;
        arr[3] = item.last_name;
        res.push(arr);
      });

      setDataExprot(res);
      done();
    }
  };

  const handleImportUser = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      Papa.parse(file, {
        // header: true,
        complete: function (results) {
          // console.log("Finished:", results.data);
          let rawCSV = results.data;
          if (rawCSV.length > 0) {
            if (rawCSV[0] && rawCSV[0].length === 3) {
              if (
                rawCSV[0][0] !== "email" ||
                rawCSV[0][1] !== "first_name" ||
                rawCSV[0][2] !== "last_name"
              ) {
                toast.error("Wrong format header CSV file");
              } else {
                let res = [];
                rawCSV.map((item, index) => {
                  if (index > 0 && item.length === 3) {
                    let obj = {};
                    obj.id = index;
                    obj.email = item[0];
                    obj.first_name = item[1];
                    obj.last_name = item[2];
                    res.push(obj);
                  }
                });
                setListUser(res);
              }
            } else {
              toast.error("Not found data on CSV file ");
            }
          }
        },
      });
      // console.log(file);

      if (file.type !== "text/csv") {
        toast.error("Only file csv");
      }
    }
  };
  return (
    <>
      <div className="my-3 add-new-user d-sm-flex">
        <span className="">List user:</span>
        <div className="group-btn mt-sm-2">
          <label htmlFor="import" className="btn btn-info">
            <i className="fa-solid fa-file-import"></i> Import
          </label>
          <input
            id="import"
            hidden
            type="file"
            onChange={(event) => handleImportUser(event)}
          />
          <CSVLink
            data={dataExport}
            filename={"my-file.csv"}
            className="btn btn-success"
            target="_blank"
            asyncOnClick={true}
            onClick={getUsersExprot}
          >
            <i className="fa-solid fa-file-arrow-down"></i>
            Export
          </CSVLink>

          <button className="btn btn-primary" onClick={handleShow}>
            <i className="fa-solid fa-plus"></i> Add new user
          </button>
        </div>
      </div>
      <div className="col-12 col-sm-4 my-3">
        <input
          className="form-control"
          placeholder="Search user by email..."
          // value={keyword}
          onChange={(event) => handleSearch(event)}
        />
      </div>
      <div className="customize-table">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>
                <div className="sort-header">
                  <span>ID</span>
                  <span>
                    <i
                      className="fa-solid fa-arrow-up"
                      onClick={() => handleSort("desc", "id")}
                    ></i>
                    <i
                      className="fa-solid fa-arrow-down"
                      onClick={() => handleSort("asc", "id")}
                    ></i>
                  </span>
                </div>
              </th>
              <th>
                <div className="sort-header">
                  <span>Email</span>
                  <span>
                    <i
                      className="fa-solid fa-arrow-up"
                      onClick={() => handleSort("desc", "email")}
                    ></i>
                    <i
                      className="fa-solid fa-arrow-down"
                      onClick={() => handleSort("asc", "email")}
                    ></i>
                  </span>
                </div>
              </th>
              <th>
                <div className="sort-header">
                  <span>First Name</span>
                  <span>
                    <i
                      className="fa-solid fa-arrow-up"
                      onClick={() => handleSort("desc", "first_Name")}
                    ></i>
                    <i
                      className="fa-solid fa-arrow-down"
                      onClick={() => handleSort("asc", "first_Name")}
                    ></i>
                  </span>
                </div>
              </th>
              <th>
                <div className="sort-header">
                  <span>Last Name</span>
                  <span>
                    <i
                      className="fa-solid fa-arrow-up"
                      onClick={() => handleSort("desc", "last_Name")}
                    ></i>
                    <i
                      className="fa-solid fa-arrow-down"
                      onClick={() => handleSort("asc", "last_Name")}
                    ></i>
                  </span>
                </div>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {listUser &&
              listUser.length > 0 &&
              listUser.map((item, index) => {
                return (
                  <tr key={`user-${index}`}>
                    <td>{item.id}</td>
                    <td>{item.email}</td>
                    <td>{item.first_name}</td>
                    <td>{item.last_name}</td>
                    <td>
                      <button
                        className="btn btn-warning mx-3"
                        onClick={() => handleEditUser(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger mx-3"
                        onClick={() => handleDeleteUser(item)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>

      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={totalUsers}
        pageCount={totalPages}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
      <ModalAddNewUser
        show={show}
        handleClose={handleClose}
        handleUpdateTabel={handleUpdateTabel}
      />
      <ModalEditUser
        show={showEdit}
        handleClose={handleClose}
        dataUserEdit={dataUserEdit}
        handlePutByIdFormPatent={handlePutByIdFormPatent}
      />

      <ModalComfirm
        show={showDelete}
        handleClose={handleClose}
        dataUserDelete={dataUserDelete}
        handleDeleteUserFormParent={handleDeleteUserFormParent}
      />
    </>
  );
};

export default TableUsers;
