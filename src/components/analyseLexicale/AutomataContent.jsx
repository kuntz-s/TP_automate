import React, { useState } from "react";
import { BsPlus } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import GraphVisualisation from "./content/GraphVisualisation";
import TableVisualisation from "./content/TableVisualisation";
import TypeAutomateModal from "./TypeAutomateModal";
import ReconnaitreTexteModal from "./ReconnaitreTexteModal";
import { determinerTypeAutomate } from "../../algorithms/typeAutomate";
import { determiniserAutomate } from "../../algorithms/determinisationAutomate";
import { minisationAutomate } from "../../algorithms/minimisationAutomate";
import { reconnaitreMot } from "../../algorithms/reconnaissanceMot";

const AutomataContent = ({ data, open }) => {
  const [displayGraph, setDisplayGraph] = useState(false);
  const [displayMenuItems, setDisplayMenuItems] = useState(false);
  const [openTypeAutomate, setOpenTypeAutomate] = useState(false);
  const [automateDeterminisé, setAutomateDeterminisé] = useState("");
  const [automataMiniminisé, setAutomateMiniminisé] = useState("");
  const [displayAutomateDeterminisé, setDisplayAutomateDeterminisé] =
    useState(false);
  const [displayAutomateMinimisé, setDisplayAutomateMinimisé] = useState(false);
  const [typeAutomate, setTypeAutomate] = useState("");
  const [openRecognitionModal, setOpenRecognitionModal] = useState(false);
  const [recognitionText, setRecognitionText] = useState({
    text: "",
    separator: "",
    answer: [],
  });
  const menuList = [
    {
      id: 0,
      name: "Type de l'automate",
    },
    {
      id: 2,
      name: "Determiniser et minimiser",
    },
    {
      id: 1,
      name: "Reconnaitre un texte ",
    },
    {
      id: 3,
      name: "Ajouter un automate",
    },
  ];

  const handleClick = (id) => {
    if (id === 0) {
      const type = determinerTypeAutomate(data);
      setTypeAutomate(type);
      setOpenTypeAutomate(true);
    } else if (id === 2) {
      const type = determinerTypeAutomate(data);
      var determinisé, minimisé;
      if (type.id === 0) {
        determinisé = data;
      } else {
        determinisé = determiniserAutomate(data);
      }
      setAutomateDeterminisé(determinisé);
      setDisplayAutomateDeterminisé(true);
      console.log("automata determinisé", determinisé);
      minimisé = minisationAutomate(determinisé);
      console.log("automata minimisé", minimisé);
      setAutomateMiniminisé(minimisé);
      setDisplayAutomateMinimisé(true);
    } else if (id === 1) {
      setOpenRecognitionModal(true);
    } else {
      setDisplayMenuItems(false);
    }
  };

  const handleRecognition = () => {
    if (recognitionText.text.trim().length === 0) {
      toast.error("veuillez entrer une valeur dans le texte");
    } else {
      var textArray, result=[];
      if (!recognitionText.separator) {
        textArray = recognitionText.text.split(" ");
      } else {
        textArray = recognitionText.text.split(recognitionText.separator);
      }
      const type = determinerTypeAutomate(data);
      var determinisé;
      if (type.id === 0) {
        determinisé = data;
      } else {
        determinisé = determiniserAutomate(data);
      }
      setAutomateDeterminisé(determinisé);
      for (let mot of textArray) {
        if (mot) {
          var ans = reconnaitreMot(determinisé, mot);
         
            result.push({
              texte:mot,
              res: ans
            });
        }
      }
      setRecognitionText({...recognitionText, answer:result})
    }
  };
  return (
    <div className="w-full  min-h-screen">
      {open ? (
        <div>En attente</div>
      ) : (
        <div className="relative ">
          <div className=" shadow-lg border border-[#D9D9D9] rounded-full flex shrink fixed top-6 left-[55%] translate-x-[-50%] [&>*]:px-8 [&>*]:py-2 ">
            <p
              className={`${
                !displayGraph
                  ? "bg-primary text-white rounded-full"
                  : "hover:cursor-pointer hover:text-primary"
              }`}
              onClick={() => setDisplayGraph(false)}
            >
              Tableau
            </p>
            <p
              className={`${
                displayGraph
                  ? "bg-primary text-white rounded-full"
                  : "hover:cursor-pointer hover:text-primary"
              }`}
              onClick={() => setDisplayGraph(true)}
            >
              Graphique
            </p>
          </div>

          <div
            className="p-4 rounded-full bg-primary fixed bottom-16 right-[5%] shadow-lg hover:cursor-pointer hover:bg-primary/90"
            onClick={() => setDisplayMenuItems((prev) => !prev)}
          >
            <BsPlus className="text-white text-3xl font-bold" />
          </div>
          <div
            className={`${
              displayMenuItems
                ? "bg-[#000] py-2 text-white fixed bottom-[20%] right-[6%]"
                : "hidden"
            }`}
          >
            {menuList.map((menu) => {
              return (
                <p
                  key={menu.id}
                  onClick={() => handleClick(menu.id)}
                  className="py-1 px-4 hover:bg-primary hover:text-white hover:cursor-default"
                >
                  {menu.name}
                </p>
              );
            })}
          </div>
          {displayGraph ? (
            <GraphVisualisation data={data} />
          ) : (
            <TableVisualisation
              data={data}
              determinisé={automateDeterminisé}
              minimisé={automataMiniminisé}
              displayDeterminisé={displayAutomateDeterminisé}
              displayMinimisé={displayAutomateMinimisé}
            />
          )}
        </div>
      )}
      <TypeAutomateModal
        data={typeAutomate}
        open={openTypeAutomate}
        handleClose={() => setOpenTypeAutomate(false)}
      />
      <ReconnaitreTexteModal
        open={openRecognitionModal}
        handleClose={() => {
          setOpenRecognitionModal(false);
          setRecognitionText({ text: "", separator: "", answer: "" });
        }}
        data={recognitionText}
        handleRecognition={handleRecognition}
        handleChange={(e) =>
          setRecognitionText({
            ...recognitionText,
            [e.target.name]: e.target.value,
          })
        }
      name = {data.automataName}
      />
      <ToastContainer />
    </div>
  );
};

export default AutomataContent;
