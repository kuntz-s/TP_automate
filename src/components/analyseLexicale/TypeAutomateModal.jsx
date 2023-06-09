import React from "react";
import Modal from "@mui/material/Modal";
import ModalWrapper from "../baseComponents/ModalWrapper";

const TypeAutomateModal = ({
  open,
  data,
  handleClose,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className=" outline-none absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white py-4 px-6 rounded-md w-[90vw] md:w-[75vw] lg:w-[50vw] max-h-screen overflow-y-auto ">
        <ModalWrapper
          title="Ajouter un automate"
        
        />
       <p className="text-center font-bold text-lg ">L'automate entré est un {data.fullName} <span className="text-primary" >{"("}{data.abr}{")"}</span></p>
      </div>
    </Modal>
  );
};

export default TypeAutomateModal;
