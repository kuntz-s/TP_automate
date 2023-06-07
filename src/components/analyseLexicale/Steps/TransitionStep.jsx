import React, { useState } from "react";
import {BsTrashFill} from "react-icons/bs";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { transitionDataList } from "../../Constants";

const TransitionStep = ({ data, handleTransitionAdd, handleTransitionChange, handleDeleteTransition }) => {
    const [incrementedId, setIncrementedId] = useState(0);


  const addTransition = () => {
    handleTransitionAdd(incrementedId)
    setIncrementedId((prev) => prev+1);
  };

 

  return (
    <div>
      <p className="text-lg mb-2 ">
        Entrer les différentes fonctions de transition
      </p>
      <p
        className="text-end text-md hover:cursor-pointer hover:underline text-primary"
        onClick={addTransition}
      >
        {" "}
        + Ajouter une transition
      </p>
      {data.transitions.map((transition,id) => {
        return (
          <div className="md:flex justify-center items-center text-2xl font-bold my-4 " key={transition.id}>
            <div className="mx-2">
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={transition.state}
                onChange={(e) =>
                  handleTransitionChange(e, id, transitionDataList[0])
                }
                style={{ width: "80px", height: "60px" }}
              >
                {data.states.map((elt, id) => {
                  return (
                    <MenuItem value={elt.name} key={id}>
                      {elt.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>
            <p className="mx-2"> {" = ( "}</p>
            <div className="mx-2">
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={transition.object}
                onChange={(e) =>
                  handleTransitionChange(e, id, transitionDataList[1])
                }
                style={{ width: "80px", height: "60px" }}
              >
                {data.alphabet.map((elt, id) => {
                  return (
                    <MenuItem value={elt} key={id}>
                      {elt}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>
            <p className="mx-2"> {","} </p>
            <div className="mx-2">
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={transition.target}
                onChange={(e) =>
                  handleTransitionChange(e, id, transitionDataList[2])
                }
                style={{ width: "80px", height: "60px" }}
              >
                {data.states.map((elt, id) => {
                  return (
                    <MenuItem value={elt.name} key={id}>
                      {elt.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>
            <p className="mx-2" > {")"} </p>
            <BsTrashFill className="text-red-600 ml-16 hover:cursor-pointer hover:text-red-500" onClick={() => handleDeleteTransition(transition.id)} />
          </div>
        );
      })}
    </div>
  );
};

export default TransitionStep;
