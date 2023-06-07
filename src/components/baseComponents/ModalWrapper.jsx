import React from "react";

const ModalWrapper = ({ title, description }) => {
  return (
    <div className="text-center mb-4">
      <p className="font-medium text-primary text-2xl mt-1 uppercase">{title}</p>
      {
        description && (
            <p className="text-lg text-slate-600 leading-5 mt-1">{description}</p>
        )
      }
    </div>
  );
};

export default ModalWrapper;
