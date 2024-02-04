import React, { useEffect, useState } from "react";
import Modals from "./Modals";
import axios from "axios";

const Problem2 = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({ title: "", contact: [] });

  const [contacts, setContacts] = useState([]);
  const [usContacts, setUSContacts] = useState([]);

  useEffect(() => {
    // Fetch all contacts
    axios
      .get(
        "https://contact.mediusware.com/api/contacts/?search=&page=1&page_size=20"
      )
      .then((response) => {
        setContacts(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching all contacts:", error);
      });

    // Fetch US contacts
    axios
      .get(
        "https://contact.mediusware.com/api/country-contacts/United States/?search=&page=1&page_size=20"
      )
      .then((response) => {
        setUSContacts(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching US contacts:", error);
      });
  }, []);
  console.log(contacts, usContacts);

  const handleAllContactsClick = () => {
    setModalData((prevData) => ({
      ...prevData,
      title: "All Contacts",
      contact: contacts,
    }));
    setShowModal(true);
  };

  const handleUSContactsClick = () => {
    setModalData((prevData) => ({
      ...prevData,
      title: "US Contacts",
      contact: usContacts,
    }));
    setShowModal(true);
  };
  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div className="container">
      <Modals
        show={showModal}
        modalData={modalData}
        setModalData={setModalData}
        handleClose={handleClose}
        contacts={contacts}
        usContacts={usContacts}
      />
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-lg btn-outline-primary"
            type="button"
            onClick={handleAllContactsClick}
          >
            All Contacts
          </button>
          <button
            className="btn btn-lg btn-outline-warning"
            type="button"
            onClick={handleUSContactsClick}
          >
            US Contacts
          </button>
        </div>
      </div>
    </div>
  );
};

export default Problem2;
