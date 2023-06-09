  
  //avoir un nom qui est une concatenation de plusieurs états initiaux
  const getInitialStateName = (data) => {
    var res = [];
    for (let elt of data) {
      res.push(elt.name);
    }
    return res.toString();
  };
  
  //avoir un nom comme concatenation de plusieurs états target
  const getTargetName = (data) => {
    var res = [];
    for (let elt of data) {
      const verify = res.find((item) => item === elt.target);
      if (!verify) {
        res.push(elt.target);
      }
    }
    return res.toString();
  };
  
  //verifier parmi une liste d'états si un état est final
  const verifyFinal = (data) => {
    var res = data.filter((elt) => elt.final === true);
    if (res.length > 0) {
      return true;
    } else {
      return false;
    }
  };
  
  //avoir toutes les infos d'un état à partir de son nom
  const getTargetFinal = (data, automata) => {
    var isFinal = false;
    for (let item of data) {
      const elt = automata.states.find((state) => state.name === item.target);
      if (elt.final === true) {
        isFinal = true;
        break;
      }
    }
    return isFinal;
  };
  
  //avoir liste des états qui referencent un nouvel état
  const getReference = (data, automata) => {
    var res = [];
    for (let item of data) {
      const elt = automata.states.find((state) => state.name === item.target);
      res.push(elt);
    }
    return res;
  };
  
  //je vérifie l'existance d'un état parmi la liste des états de l'automate
  const verifyExisting = (source, target) => {
    const name = getTargetName(source);
    var existingStateName = "";
    var equivalent = false;
    for (let elt of target) {
      if (elt.name.length === name.length) {
        // console.log("source name is ", elt.name);
        var sourceName = name.replaceAll("q", "");
        var targetName = elt.name.replaceAll("q", "");
        while (sourceName.length > 0) {
          const replacedLetter = sourceName[0];
          sourceName = sourceName.replaceAll(replacedLetter, "");
          targetName = targetName.replaceAll(replacedLetter, "");
        }
  
        if (sourceName.length === 0 && targetName.length === 0) {
          equivalent = true;
          existingStateName = elt.name;
          break;
        }
      }
    }
  
    console.log(
      "source is",
      source,
      " and target is ",
      target,
      " and equivalent is ",
      equivalent
    );
  
    return { name: name, equivalent: equivalent, stateName: existingStateName };
  };
  
 export const determiniserAutomate = (data) => {
    var stateId = 0;
    var transitionId = 0;
    var newAutomata = {
      alphabet: [],
      automataName:"",
      statesNumber: 0,
      states: [],
      transitions: [],
    };
    newAutomata.alphabet = data.alphabet;
    newAutomata.automataName= data.automataName;
    var file = [];
    var tempState = null;
  
    const initStates = data.states.filter((elt) => elt.initial === true);
    newAutomata.statesNumber = parseInt(newAutomata.statesNumber) + 1;
    tempState = {
      id: stateId,
      name: getInitialStateName(initStates),
      initial: true,
      final: verifyFinal(initStates),
      references: initStates,
    };
    newAutomata.states.push(tempState);
    file.push(tempState);
    stateId += 1;
  
    while (file.length !== 0) {
      var temp = file.shift();
      for (let letter of newAutomata.alphabet) {
        var newState = [];
        for (let reference of temp.references) {
          const transitionsList = data.transitions.filter(
            (elt) => elt.state === reference.name && elt.object === letter
          );
          newState = [...newState, ...transitionsList];
        }
        if (newState.length > 0) {
          const existing = verifyExisting(newState, newAutomata.states);
          getTargetFinal(newState, data);
          //si le nouvel état n'existe pas encore parmi la liste des états déjà présents on l'ajoute parmi les étas
          if (!existing.equivalent) {
            newAutomata.statesNumber = parseInt(newAutomata.statesNumber) + 1;
            const tempState = {
              id: stateId,
              name: existing.name,
              initial: false,
              final: getTargetFinal(newState, data),
              references: getReference(newState, data),
            };
            newAutomata.states.push(tempState);
            file.push(tempState);
            stateId += 1;
          }
          newAutomata.transitions.push({
            id: transitionId,
            state: temp.name,
            object: letter,
            target: existing.equivalent ? existing.stateName : existing.name,
          });
          transitionId += 1;
        }
      }
    }
    //on cherche tous les états initiaux de l'automate
    console.log("derterminised automata", newAutomata)
    return newAutomata;
  };
  
  