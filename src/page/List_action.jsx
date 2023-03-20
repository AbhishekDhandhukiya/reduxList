import React, { useState } from "react";
import { toast } from "react-toastify";
import "./list.css";
import { ADD_DATA, EDIT_DATA, DELETE_DATA } from "../action/ActionConstant";
import { useDispatch, useSelector } from "react-redux";

const List = () => {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [uName, setUName] = useState("");
  const [email, setEmail] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [dataIndex, setDataIndex] = useState(0);

  const dispatch = useDispatch();
  const listData = useSelector((state) => state.list.productData);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      firstname: fName,
      lastname: lName,
      username: uName,
      email: email,
    };
    if (fName === "" || lName === "" || uName === "" || email === "") {
      toast.error("please fill in the field");
    } else {
      if (isEdit) {
        dispatch({
          type: EDIT_DATA,
          payload: { index: dataIndex, data: data },
        });
        setDataIndex("");
        setIsEdit(false);
        resetField();
      } else {
        dispatch({ type: ADD_DATA, payload: data });
        toast.success("data success");
        resetField();
      }
    }
  };
  const resetField = () => {
    setFName("");
    setLName("");
    setUName("");
    setEmail("");
  };
  const handleDelete = (index) => {
    dispatch({ type: DELETE_DATA, payload: { id: index } });
  };
  const handleEdit = (item, index) => {
    setFName(item.firstname);
    setLName(item.lastname);
    setUName(item.username);
    setEmail(item.email);
    setIsEdit(true);
    setDataIndex(index);
  };
  return (
    <div className="list-page">
      <div className="register">
        <h1>Register Form</h1>
        <form onSubmit={handleSubmit}>
          <label className="labels">First name:</label>
          <br />

          <input
            type="text"
            className="input"
            name="fname"
            placeholder="firstname"
            onChange={(e) => setFName(e.target.value)}
            value={fName}
          />
          <br />

          <label className="labels">Last name:</label>
          <br />
          <input
            type="text"
            className="input"
            name="lname"
            placeholder="lastname"
            onChange={(e) => setLName(e.target.value)}
            value={lName}
          />
          <br />

          <label className="labels">User name:</label>
          <br />
          <input
            type="text"
            className="input"
            name="uname"
            placeholder="username"
            onChange={(e) => setUName(e.target.value)}
            value={uName}
          />
          <br />

          <label className="labels">Email:</label>
          <br />
          <input
            type="email"
            className="input"
            name="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <br />
          <br />

          <button type="submit" className="sub-btn">
            {isEdit ? "update" : "submit"}
          </button>
        </form>
      </div>

      <div className="table">
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {listData?.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item?.firstname}</td>
                  <td>{item?.lastname}</td>
                  <td>{item?.username}</td>
                  <td>{item?.email}</td>
                  <td>
                    <button
                      className="btn"
                      onClick={() => handleEdit(item, index)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button className="btn" onClick={() => handleDelete(index)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
