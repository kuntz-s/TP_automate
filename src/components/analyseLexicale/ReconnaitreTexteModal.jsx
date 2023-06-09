import React from "react";
import Modal from "@mui/material/Modal";
import ModalWrapper from "../baseComponents/ModalWrapper";
import Input from "../baseComponents/Input";

const ReconnaitreTexteModal = ({
  open,
  data,
  handleClose,
  handleChange,
  handleRecognition,
  name,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className=" outline-none absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white py-4 px-6 rounded-md w-[90vw] md:w-[75vw] lg:w-[50vw] max-h-screen overflow-y-auto ">
        <ModalWrapper title="Reconnaitre un texte" />
        <div>
          <p className="text-lg  ">Spécifier le texte à reconnaitre</p>
          <textarea
            className="w-full border border-[#D9D9D9] p-2 rounded-md outline-none mt-2"
            name="text"
            value={data.text}
            onChange={handleChange}
            placeholder="specifier le texte à reconnaitre"
          />
        </div>
        <div className="flex justify-around items-center">
          <div className="flex items-center mt-4 w-full">
            <p className="text-lg  ">Spécifier le séparateur</p>
            <Input
              name="separator"
              value={data.separator}
              handleChange={handleChange}
              style={{ width: "80px", height: "60px", border: "none" }}
            />
          </div>
          <button
            className={` bg-primary text-white hover:bg-white hover:border-primary hover:text-primary border border-primary hover:cursor-pointer mx-auto py-2 px-4  rounded-md  `}
            onClick={handleRecognition}
          >
            Reconnaitre
          </button>
        </div>
        <div>
          <p className="text-lg text-primary mt-4 uppercase text-center font-bold  ">
            Resultat
          </p>
          <div className="mt-4 border border-[#D9D9D9] rounded-lg py-2 px-4">
            {data.answer.length === 0 ? (
              <p>Aucune correspondance pour l'instant </p>
            ) : (
              <div>
                {data.answer.map((ans , id) => {
                  return(
                    <span className=" text-lg">{"<"} <span className="font-bold">{ans.texte}</span> : <span className="text-primary">{ans.res ? name:"unknown"}</span> {">"} </span>
                  )
                })}
            </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ReconnaitreTexteModal;
