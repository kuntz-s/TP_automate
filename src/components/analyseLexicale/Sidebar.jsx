import React from "react";
import { useNavigate } from "react-router";
import { BiLeftArrowAlt } from "react-icons/bi";
import { GrGraphQl } from "react-icons/gr";

const statesOptions = ["all", "init", "final"];

const Sidebar = ({ data, open }) => {
  const navigate = useNavigate();
  console.log(data)

  const getStatesList = (option) => {
    const states = [];
    for (let elt of data.states) {
      if (
        option === statesOptions[0] ||
        (option === statesOptions[1] && elt.initial) ||
        (option === statesOptions[2] && elt.final)
      ) {
        states.push(elt.name);
      }
    }
    return states.toString();
  };

  return (
    <div className="w-[300px] border-r border-[#D9D9D9]">
      {open ? (
        <p> En attente ...</p>
      ) : (
        <div className="p-2">
          <BiLeftArrowAlt
            className="text-2xl text-slate-800 hover:text-slate-700 hover:cursor-pointer"
            onClick={() => {
              navigate("/");
              navigate(0);
            }}
          />
          <div className="mt-2 ml-2">
            <p className="flex items-center text-xl font-medium uppercase">
              <GrGraphQl className="mr-2" /> Automate
            </p>
            <div className="ml-6 text-lg font-medium [&>*]:my-4">
              <div>
                <p>Alphabet</p>
                <p className="font-light ml-4">
                  Σ = {"{"} {data.alphabet.toString()} {"}"}
                </p>
              </div>
              <div>
                <p>Etats</p>
                <p className="font-light ml-4">
                  Q = {"{"} {getStatesList(statesOptions[0])} {"}"}
                </p>
              </div>

              <div>
                <p>Etats initiaux</p>
                <p className="font-light ml-4">
                  Q = {"{"} {getStatesList(statesOptions[1])} {"}"}
                </p>
              </div>

              <div>
                <p>Etats finaux</p>
                <p className="font-light ml-4">
                  Q = {"{"} {getStatesList(statesOptions[2])} {"}"}
                </p>
              </div>

              <div>
                <p className="leading-5">Fonction de transition</p>
                <div className="mt-2">
                  {
                    data.transitions.map((elt) => {
                     return(
                      <p key={elt.id} className="ml-4 font-light">{elt.state} = {"("} {elt.object} , {elt.target} {")"}  </p>
                     )
                    })
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
