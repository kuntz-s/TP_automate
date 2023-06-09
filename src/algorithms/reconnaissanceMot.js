export const reconnaitreMot = (data, mot) => {
    var recognise = true;
    var currentState = data.states.find((elt) => elt.initial === true).name;
    for (let i = 0; i < mot.length; i++) {
      const target = data.transitions.find(
        (elt) => elt.state === currentState && elt.object === mot[i]
      );
      if (!target) {
        recognise = false;
        break;
      } else {
        currentState = target.target;
      }
    }
    if (recognise) {
      const verifyFinal = data.states.find((elt) => elt.name === currentState);
      console.log("verify final ", verifyFinal)
      if (verifyFinal.final) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };