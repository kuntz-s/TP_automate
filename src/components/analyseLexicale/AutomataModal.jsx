import React from "react";
import { ToastContainer, toast } from "react-toastify";
import Modal from "@mui/material/Modal";
import ModalWrapper from "../baseComponents/ModalWrapper";
import StepHandler from "./StepHandler";

const AutomataModal = ({
  open,
  step,
  data,
  handleClose,
  handleChange,
  handlePrev,
  handleNext,
  handleInitial,
  handleFinal,
  handleTransitionAdd,
  handleTransitionChange,
  handleDeleteTransition
}) => {
  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className=" outline-none absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white py-4 px-6 rounded-md w-[90vw] md:w-[75vw] lg:w-[50vw] max-h-screen overflow-y-auto ">
        <ModalWrapper
          title="Ajouter un automate"
          description="Veuillez remplir les informations çi dessous "
        />
        <div className="[&>*]:mb-2">
          <p className="text-xl text-center font-bold">Etape {step}/4</p>
          <div className="mt-4">
            <StepHandler
              step={step}
              handleChange={handleChange}
              data={data}
              handleInitial={handleInitial}
              handleFinal={handleFinal}
              handleTransitionAdd={handleTransitionAdd}
              handleTransitionChange={handleTransitionChange}
              handleDeleteTransition={handleDeleteTransition}
            />
          </div>
        </div>
        <div className="flex justify-center [&>*]:mx-4 mt-8">
          <button
            className={`${
              step === 1 && "hidden"
            } bg-white  text-primary hover:bg-slate-100 hover:text-primary-/90 border border-primary hover:cursor-pointer mx-auto py-2 px-4  rounded-md  `}
            onClick={handlePrev}
          >
            Précédent
          </button>
          <button
            className={`  bg-primary text-white hover:bg-primary/90 hover:cursor-pointer mx-auto py-2 px-6  rounded-md  `}
            onClick={handleNext}
          >
           {step === 4  ? " Ajouter" :"Suivant"}
          </button>
        </div>
        <ToastContainer />
      </div>
    </Modal>
  );
};

export default AutomataModal;
