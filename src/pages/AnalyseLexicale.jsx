import React, { useEffect, useState } from "react";
import Sidebar from "../components/analyseLexicale/Sidebar";
import { toast } from "react-toastify";
import AutomataContent from "../components/analyseLexicale/AutomataContent";
import AutomataModal from "../components/analyseLexicale/AutomataModal";
import {
  generateState,
  getInitialList,
  getFinalList,
  transitionDataList,
  verifyEmptyTransition,
  verifyDuplicateTransition,
} from "../components/Constants";

const AnalyseLexicale = () => {
  const [automata, setAutomata] = useState({
    alphabet: [],
    statesNumber: 0,
    states: [],
    transitions: [],
  });
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);

  useEffect(() => {
    setOpen(true);
  }, []);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e) => {
    if (step === 1) {
      var newAlphabet = [];
      for (let elt of e.target.value.split(" ")) {
        if (elt !== "") {
          newAlphabet.push(elt);
        }
      }
      setAutomata({ ...automata, alphabet: [...new Set(newAlphabet)] });
    } else {
      const name = e.target.name;
      let value = e.target.value;
      if (name === "statesNumber" && value < 0) {
        value = 0;
      }
      setAutomata({ ...automata, [name]: value });
    }
  };

  const toastError = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 3000,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  };

  const addStep = () => {
    setStep((prev) => prev + 1);
  };

  const handleInitial = (e, id) => {
    const newInitialState = [...automata.states];
    newInitialState[id].initial = e.target.checked;
    setAutomata({ ...automata, states: newInitialState });
  };

  const handleFinal = (e, id) => {
    const newInitialState = [...automata.states];
    newInitialState[id].final = e.target.checked;
    setAutomata({ ...automata, states: newInitialState });
  };

  const handlePrev = () => {
    setStep((prev) => prev - 1);
  };

  const handleTransitionAdd = (id) => {
    var newTransitions = [...automata.transitions];
    newTransitions.push({ id: id, state: "", object: "", target: "" });
    setAutomata({ ...automata, transitions: newTransitions });
  };

  const handleTransitionChange = (e, id, name) => {
    var newTransitions = [...automata.transitions];
    if (name === transitionDataList[0]) {
      newTransitions[id] = { ...newTransitions[id], state: e.target.value };
    } else if (name === transitionDataList[1]) {
      newTransitions[id] = { ...newTransitions[id], object: e.target.value };
    } else {
      newTransitions[id] = { ...newTransitions[id], target: e.target.value };
    }
    setAutomata({ ...automata, transitions: newTransitions });
  };

  const handleDeleteTransition = (id) => {
    var newTransitions = [...automata.transitions];
    newTransitions = newTransitions.filter((elt) => elt.id !== id);
    setAutomata({ ...automata, transitions: newTransitions });
  };

  const handleNext = () => {
    if (step === 1) {
      if (automata.alphabet.length === 0) {
        toastError("veuillez entrer un alphabet");
      } else {
        addStep();
      }
    } else if (step === 2) {
      if (parseInt(automata.statesNumber) === 0) {
        toastError("votre automate dois contenir au moins un état");
      } else {
        setAutomata({
          ...automata,
          states: generateState(automata.statesNumber),
        });
        addStep();
      }
    } else if (step === 3) {
      if (
        getInitialList(automata.states).length === 0 ||
        getFinalList(automata.states).length === 0
      ) {
        toastError(
          "vous devez avoir au moins un état initial et un état final"
        );
      } else {
        setAutomata({...automata, transitions:[]})
        addStep();
      }
    } else if (step === 4) {
      if(automata.transitions.length === 0){
        toastError("vous devez entrer au moins une transition")
      } else {
        if (!verifyEmptyTransition(automata.transitions)) {
          if (!verifyDuplicateTransition(automata.transitions)) {
            handleClose();
            setStep(1);
          } else {
            toastError("veuillez supprimer tous les champs redondants");
          }
        } else {
          toastError("veuillez remplir tous les champs");
        }
      }
    }
  };

  return (
    <section className="w-screen min-h-screen flex">
      <Sidebar data={automata} open ={open } />
      <AutomataContent data={automata} open ={open } />
      <AutomataModal
        open={open}
        handleClose={handleClose}
        step={step}
        data={automata}
        handleChange={handleChange}
        handleNext={handleNext}
        handlePrev={handlePrev}
        handleInitial={handleInitial}
        handleFinal={handleFinal}
        handleTransitionAdd={handleTransitionAdd}
        handleTransitionChange={handleTransitionChange}
        handleDeleteTransition={handleDeleteTransition}
      />
    </section>
  );
};

export default AnalyseLexicale;
