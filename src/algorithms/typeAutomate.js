//algorithme pour determiner le type de l'automate ε

const automataTypes = [
  {
    id: 0,
    abr: "AFD",
    fullName: "Automate fini déterministe",
  },
  {
    id: 1,
    abr: "AFN",
    fullName: "Automate fini non déterministe",
  },
  {
    id: 2,
    abr: "ε-AFN",
    fullName: "Automate à états fini non déterministes avec ε-transitions",
  },
];

export const determinerTypeAutomate = (data) => {
  //on vérifie que on a un seul états intial si on a plus d'un  l'automate n'est pas un AFN
  var type = null;

  const aLenght = data.alphabet.length;
  //on vérifie si il y'a un e-transition
  const eTransition = data.transitions.filter((elt) => elt.object === "ε");
  if (eTransition.length > 0) {
    type = automataTypes[2];
    return type;
  } else {
    var afn = false;
    for (let elt of data.states) {
      for (let i = 0; i < aLenght; i++) {
        let val = data.transitions.filter(
          (trans) =>
            trans.state === elt.name && trans.object === data.alphabet[i]
        );
        if (val.length > 1) {
          afn = true;
          break;
        }
      }
    }
    if (afn) {
      type = automataTypes[1];
    } else {
      type = automataTypes[0];
    }

    console.log(type);
    return type;
  }
};
