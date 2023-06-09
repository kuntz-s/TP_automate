import React, { useState } from "react";
import { BsPlus } from "react-icons/bs";
import GraphVisualisation from "./content/GraphVisualisation";
import TableVisualisation from "./content/TableVisualisation";
import TypeAutomateModal from "./TypeAutomateModal";
import { determinerTypeAutomate } from "../../algorithms/typeAutomate";
import { determiniserAutomate } from "../../algorithms/determinisationAutomate";
import { minisationAutomate } from "../../algorithms/minimisationAutomate";

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
    } else {
      alert("il a cliqué ici");
      setDisplayMenuItems(false);
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
    </div>
  );
};

export default AutomataContent;
