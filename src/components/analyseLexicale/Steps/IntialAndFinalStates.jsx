import React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { getFinalList, getInitialList } from "../../Constants";

const IntialAndFinalStates = ({ handleInitial , handleFinal, data }) => {

  return (
    <div>
      <div className="mb-4">
        <p className="text-lg mb-2 ">
          Cochez les états initiaux de votre alphabet
        </p>
        <div className="flex justify-around ">
          {data.states.map((state, id) => {
            return (
              <FormControlLabel
                key={state.id}
                name={state.name}
                control={
                  <Checkbox
                    checked={state.initial}
                    onChange={(e) => {
                      handleInitial(e,id);
                    }}
                  />
                }
                color="success"
                label={state.name}
            
              />
            );
          })}
        </div>
        <p className="my-2 text-center text-xl text-bold">
          {" "}
          q= {"{"}{getInitialList(data.states).toString()}  {"}"}
        </p>
      </div>


      <div className="mt-4">
        <p className="text-lg mb-2 ">
          Cochez les états finaux de votre alphabet
        </p>
        <div className="flex justify-around">
          {data.states.map((state, id) => {
            return (
              <FormControlLabel
                key={state.id}
                name={state.name}
                control={
                  <Checkbox
                    checked={state.final}
                    onChange={(e) => {
                      handleFinal(e, id);
                    }}
                  />
                }
                color="success"
                label={state.name}
              />
            );
          })}
        </div>
        <p className="my-2 text-center text-xl text-bold">
          {" "}
          F = {"{"}{getFinalList(data.states).toString()}   {"}"}
        </p>
      </div>
    </div>
  );
};

/**
 *  <FormGroup>
          {permissionsList.map((permission, id) => {
            return (
              <FormControlLabel
                key={permission.id}
                name={permission.nom}
                control={
                  <Checkbox
                    checked={permission.checked}
                    onChange={(e) => {
                      handleChange(e, id);
                    }}
                  />
                }
                color="success"
                label={permission.nom}
              />
            );
          })}
        </FormGroup>
 */

export default IntialAndFinalStates;
