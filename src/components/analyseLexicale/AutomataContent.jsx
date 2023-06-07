import React, { useState } from "react";
import { BsPlus } from "react-icons/bs";
import GraphVisualisation from "./content/GraphVisualisation";
import TableVisualisation from "./content/TableVisualisation";

const AutomataContent = ({ data, open }) => {
  const [displayGraph, setDisplayGraph] = useState(false);
  const [displayMenuItems, setDisplayMenuItems] = useState(true);
  const menuList = [
    {
    id: 0,
    name: "Type de l'automate",
  },
    {
      id: 1,
      name: "Reconnaitre un texte ",
    },
    {
      id:2,
      name:"Determiniser et minimiser",
    },
    {
      id: 3,
      name: "Ajouter un automate",
    },
  ];

  const handleClick = () => {
    alert("il a cliqué ici");
    setDisplayMenuItems(false)
  };
  return (
    <div className="w-full min-h-screen">
      {open ? (
        <div>En attente</div>
      ) : (
        <div className="relative">
          <div className=" shadow-lg border border-[#D9D9D9] rounded-full flex shrink fixed top-8 left-[55%] translate-x-[-50%] [&>*]:px-8 [&>*]:py-2 ">
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
          {displayGraph ? <GraphVisualisation  data={data} /> : <TableVisualisation data={data} />}
        </div>
      )}
    </div>
  );
};

export default AutomataContent;
