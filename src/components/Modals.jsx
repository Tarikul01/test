import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import { Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";

const Modals = ({
  show,
  handleClose,
  modalData,
  setModalData,
  contacts,
  usContacts,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const filtered = contacts.filter(
      (contact) =>
        contact.phone.includes(searchTerm) ||
        contact.country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setModalData((prevData) => ({
      ...prevData,
      contact: filtered,
    }));
    // setFilteredContacts(filtered);
  }, [contacts, searchTerm]);
  const handleAllContactsClick = () => {
    setModalData((prevData) => ({
      ...prevData,
      title: "All Contacts",
      contact: contacts,
    }));
    setIsChecked(false);
    setSearchTerm("");
  };

  const handleUSContactsClick = () => {
    setModalData((prevData) => ({
      ...prevData,
      title: "US Contacts",
      contact: usContacts,
    }));
    setIsChecked(false);
    setSearchTerm("");
  };
  useEffect(() => {
    if (isChecked) {
      setModalData((prevData) => ({
        ...prevData,
        contact: contacts.filter((item) => item.id % 2 === 0),
      }));
    } else {
      setModalData((prevData) => ({
        ...prevData,
        contact: contacts,
      }));
    }
  }, isChecked);
  const handleCheckboxClick = () => {
    setModalData((prevData) => ({
      ...prevData,
      contact: contacts.filter((item) => item.id % 2 === 0),
    }));
    setIsChecked(!isChecked);
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalData.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="container-fluid">
            <div className="row">
              <input
                type="text"
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <div class="row">
              <table className="table">
                <thead>
                  {" "}
                  <tr>
                    <td scope="col">ID</td>
                    <td scope="col">Phone</td>
                    <td scope="col">Country</td>
                  </tr>
                </thead>
                <tbody>
                  {modalData.contact.map((item) => (
                    <tr key={item.id} scope="row">
                      <td>{item.id}</td>
                      <td>{item.phone}</td>
                      <td>{item.country.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Footer>
            <label>
              <input
                checked={isChecked}
                onClick={handleCheckboxClick}
                type="checkbox"
              />{" "}
              Only Even
            </label>
            <Button
              variant="#46139f"
              style={{ backgroundColor: "#46139f", color: "white" }}
              onClick={handleAllContactsClick}
            >
              A
            </Button>
            <Button
              variant="#ff7f50"
              style={{ backgroundColor: "#ff7f50", color: "white" }}
              onClick={handleUSContactsClick}
            >
              B
            </Button>
            <Button
              variant="light"
              style={{ borderColor: "#46139f" }}
              onClick={handleClose}
            >
              C
            </Button>
          </Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Modals;
