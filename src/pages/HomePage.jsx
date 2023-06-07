import React, { useState } from "react";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";

const HomePage = () => {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const handleRedirect = () => {
   
        if(selected === 1){
            navigate("/analyse-lexicale")
        } else {
            navigate("/commentaires")
        }
    
  }
  return (
    <section className="h-screen w-screen bg-homeBg bg-cover bg-no-repeat p-8 text-center">
      <p className="text-xl md:text-3xl lg:text-5xl my-6 font-bold">
        Outil de <span className="text-primary">manipulation d’automates</span>{" "}
        et <br /> de{" "}
        <span className="text-primary">reconnaissances de texte</span>
      </p>
      <p className="text-lg md:text-2xl"> Séléctionnez l'action à effectuer</p>
      <div className="mt-8 flex flex-col md:flex-row justify-center md:[&>*]:mx-2 [&>*]:w-[25%] [&>*]:min-h-80  [&>*]:rounded-md [&>*]:cursor-pointer ">
        <div
          className={`${
            selected === 1
              ? "border-primary border-4 "
              : " border border-[#D9D9D9] hover:border-primary"
          } `}
          onClick={() => setSelected(1)}
        >
          <img
            src={img1}
            alt="automata illustration"
            className="w-full h-60 object-cover"
          />
          <div className="p-2">
            <p className=" text-center font-bold text-lg">
              I. Analyse lexicale
            </p>
            <p>
              Création , determinisation , minimisation d'un automate et
              reconnaissance de texte{" "}
            </p>
          </div>
        </div>
        <div
          className={`${
            selected === 2
              ? "border-primary border-4 "
              : " border border-[#D9D9D9] hover:border-primary"
          } `}
          onClick={() => setSelected(2)}
        >
          <img
            src={img2}
            alt="automata illustration"
            className="w-full h-60 object-cover"
          />
          <div className="p-2">
            <p className=" text-center font-bold text-lg">
              II. Langage des commentaires
            </p>
            <p>Reconnaissance des commentaires dans un texte donné</p>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <button
          disabled={selected ? false : true}
          className={`${
            selected ? "bg-primary text-white hover:bg-primary/90 hover:cursor-pointer " : "bg-slate-400 text-slate-600 "
          } font-bold mx-auto py-2 px-4  rounded-md  `}
          onClick={handleRedirect}
        >
          Commencer
        </button>
      </div>
      <ToastContainer/>
    </section>
  );
};

export default HomePage;
