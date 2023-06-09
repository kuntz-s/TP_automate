
  //vérifier si un état appartient a la liste des états accessibles
  
  const verifierAppartenance = (state, etatsAccessibles) => {
    const verify = etatsAccessibles.find((elt) => elt === state);
    if (verify) {
      return true;
    }
    return false;
  };
  
  const eliminationEtatsInaccessibles = (newData) => {
    var data = {...newData};
    var etatsAccessibles = [];
    var file = [];
    //on cherche l'état intial
    const init = data.states.find((elt) => elt.initial === true);
    etatsAccessibles.push(init.name);
    file.push(init.name);
    while (file.length !== 0) {
      var state = file.shift();
      var res = data.transitions.filter((elt) => elt.state === state);
      for (let elt of res) {
        if (!verifierAppartenance(elt.target, etatsAccessibles)) {
          etatsAccessibles.push(elt.target);
          file.push(elt.target);
        }
      }
    }
  
    //on retire les états inaccessibles de la liste des états de l'automate
    var newStates = [];
    for (let elt of data.states) {
      const findElt = etatsAccessibles.find((etat) => etat === elt.name);
      if (findElt) {
        newStates.push(elt);
      }
    }
    data.states = newStates;
  
    //on retire les états inaccessibles de la liste des transitions
    var newTransitions = [];
    for (let elt of data.transitions) {
      if (
        verifierAppartenance(elt.state, etatsAccessibles) &&
        verifierAppartenance(elt.target, etatsAccessibles)
      ) {
        newTransitions.push(elt);
      }
    }
    data.transitions = newTransitions;
    data.statesNumber = etatsAccessibles.length;
    return data;
  };
  
  //avoir l'id de la classe d'équivalence à partir du nom de l'état
  
  const getClass = (stateName, automata) => {
    var id = null;
    for (let elt of automata) {
      const verify = elt.states.find((item) => item.name === stateName);
      if (verify) {
        id = elt.id;
        break;
      }
    }
    return id;
  };
  
  //on vérifie si les classes sont cohérentes
  const verifyCoherence = (data) => {
    // console.log("enter her co", data)
    const first = data[0];
    var coherent = true;
    for (let i = 1; i < data.length; i++) {
      if (data[i] !== first) {
        coherent = false;
        break;
      }
    }
    return coherent;
  };
  
  //attribuer des id à un tableau de chiffres
  const attributeId = (data, id) => {
    var newId = id;
    var newData = [];
    for (let num of data) {
      const verify = newData.find((elt) => elt.data == num);
      if (!verify) {
        newData.push({ id: newId, data: num });
        newId += 1;
      }
    }
    return { newData: newData, newId: newId };
  };
  
  //diviser la classe
  const generateNewClass = (id, classList, data, generatedId) => {
    const { newData, newId } = attributeId(data, generatedId);
    const ancientClass = classList.find((elt) => elt.id === id);
    var newClass = classList.filter((elt) => elt.id !== id);
    var splitClass = [];
    for (let i = 0; i < data.length; i++) {
      const dataId = newData.find((item) => item.data === data[i]);
      const findId = splitClass.find((elt) => elt.id === dataId.id);
      if (!findId) {
        splitClass.push({
          id: dataId.id,
          states: [ancientClass.states[i]],
        });
      } else {
        var addedState = splitClass.find((elt) => elt.id === dataId.id);
        addedState.states.push(ancientClass.states[i]);
      }
    }
    for (let elt of splitClass) {
      newClass.push(elt);
    }
  
    return { newClass: newClass, id: newId };
  };
  
  //verifier parmi un tableau d'états y'a un état final
  const verifyFinal = (state) => {
    const verify = state.find((elt) => elt.final === true);
    if (verify) {
      return true;
    }
    return false;
  };
  
  //minimisation d'un automate
export  const minisationAutomate = (data) => {
    var generatedId = 0;
    var automateReduit = eliminationEtatsInaccessibles(data);
    
    var res = [];
    //on recupère la liste des états finaux7
    const etatsFinaux = automateReduit.states.filter((elt) => elt.final === true);
  
    
  
    //on récupère le reste des états non finaux
    const etatsRestant = automateReduit.states.filter(
      (elt) => elt.final !== true
    );
  
    res.push({
      id: generatedId,
      states: etatsFinaux,
    });
  
    generatedId += 1;
  
    res.push({
      id: generatedId,
      states: etatsRestant,
    });
  
    generatedId += 1;
  
    do {
      var setMinimised = true;
      for (let equivalentClass of res) {
        var incoherence = [];
        for (let letter of automateReduit.alphabet) {
          var temp = [];
          if (incoherence.length === 0) {
            for (let state of equivalentClass.states) {
              const transitionName = automateReduit.transitions.find(
                (trans) => trans.state === state.name && trans.object === letter
              );
              if (transitionName) {
                temp.push(getClass(transitionName.target, res));
              } else {
                temp.push(-1);
              }
            }
            if (!verifyCoherence(temp)) {
              incoherence = temp;
            }
          }
        }
        if (incoherence.length > 0) {
          var { newClass, id } = generateNewClass(
            equivalentClass.id,
            res,
            incoherence,
            generatedId
          );
          generatedId = id;
          res = newClass;
          setMinimised = false;
        }
      }
    } while (!setMinimised);
    if (res.length === data.states.length) {
      return data;
    } else {
      var newAutomata = {
        alphabet: "",
        automataName:"",
        statesNumber: "",
        states: "",
        transitions: "",
      };
      newAutomata.alphabet = data.alphabet;
      newAutomata.statesNumber = res.length.toString();
      
      newAutomata.dataName = data.dataName;
      var stateId = 0;
      var transitionId = 0;
      var newStates = [];
      var newTransitions = [];
      //je recupère l'état initial
      var initState = null;
      for (let elt of res) {
        if (elt.states.find((state) => state.initial === true)) {
          initState = elt;
          break;
        }
      }
      //on ajoute le nouvel état contenant l'état initial
      newStates.push({
        id: stateId,
        name: `Q${stateId}`,
        initial: true,
        false: verifyFinal(initState.states),
        minimiseReference: initState,
      });
      stateId += 1;
      res = res.filter((elt) => elt.id !== initState.id);
  
      //j'ajoute les autres elements
      for (let elt of res) {
        newStates.push({
          id: stateId,
          name: `Q${stateId}`,
          initial: false,
          false: verifyFinal(elt.states),
          minimiseReference: elt,
        });
        stateId += 1;
      }
      res.push(initState);
      //console.log("new states is", newStates);
  
      //on ajoute les transitions
      for (let state of newStates) {
        for (let letter of data.alphabet) {
          console.log("ici lkl")
          const transitionName = automateReduit.transitions.find(
            (trans) =>
              trans.state === state.minimiseReference.states[0].name &&
              trans.object === letter
          );
          
          if (transitionName) {
            console.log("transition name ", transitionName, 'and new states', newStates)
            newTransitions.push({
              id: transitionId,
              state: state.name,
              object: letter,
              target: newStates.find(
                (elt) =>
                  elt.minimiseReference.id ===
                  getClass(transitionName.target, res)
              ).name,
            });
            
          transitionId += 1;
          }
  
          // console.log("resp is ", transitionName, " and class is ", getClass(transitionName.target, res));
        }
      }
      
      newAutomata.states = newStates;
      newAutomata.transitions = newTransitions;
    }
    console.log("minimised automata is ", minisationAutomate)
    return newAutomata
  };
  