const automata = {
  alphabet: ["/", "*", "c","%"],
  statesNumber: "10",
  states: [
    {
      id: 1,
      name: "q1",
      initial: true,
      final: false,
    },
    {
      id: 2,
      name: "q2",
      initial: false,
      final: false,
    },
    {
      id: 3,
      name: "q3",
      initial: false,
      final: false,
    },
    {
      id: 4,
      name: "q4",
      initial: false,
      final: false,
    },
    {
      id: 5,
      name: "q5",
      initial: false,
      final: false,
    },
    {
      id: 6,
      name: "q6",
      initial: false,
      final: false,
    },
    {
      id: 7,
      name: "q7",
      initial: false,
      final: false,
    },
    {
      id: 8,
      name: "q8",
      initial: false,
      final: true,
    },
    {
      id: 9,
      name: "q9",
      initial: false,
      final: false,
    },
    {
      id: 10,
      name: "q10",
      initial: false,
      final: true,
    },
  ],
  transitions: [
    {
      id: 1,
      state: "q1",
      object: "/",
      target: "q2",
    },
    {
      id: 2,
      state: "q2",
      object: "*",
      target: "q3",
    },
    {
      id: 3,
      state: "q3",
      object: "c",
      target: "q3",
    },
    {
      id: 4,
      state: "q3",
      object: "*",
      target: "q9",
    },
    {
      id: 5,
      state: "q9",
      object: "/",
      target: "q10",
    },
    {
      id: 6,
      state: "q3",
      object: "%",
      target: "q4",
    },
    {
      id: 7,
      state: "q4",
      object: "*",
      target: "q5",
    },
    {
      id: 8,
      state: "q5",
      object: "/",
      target: "q6",
    },
    {
      id: 9,
      state: "q6",
      object: "%",
      target: "q4",
    },
    {
      id: 10,
      state: "q6",
      object: "c",
      target: "q6",
    },
    {
      id: 11,
      state: "q6",
      object: "*",
      target: "q7",
    },
    {
      id: 12,
      state: "q7",
      object: "/",
      target: "q8",
    },
  ],
};


const diviserTexte = (texte) => {
  var res = [];
  for(let i = 0; i < texte.length-1 ; i++){
    if(texte[i]==="/" && texte[i+1]==="*"){
      for(let j=i+2; j < texte.length-1; j++){
        if(texte[j]==="*" && texte[j+1]==="/"){
          res.push(texte.slice(i,j+2))
        }
      }
    }
  }
 return res;
}

//vérifier si une lettre ne fais pas partie de "/","*","%" si c'est le cas retourner  c
const getLetter = (letter) =>{
  if(letter !== "/" && letter !=="*" && letter !== "%" ){
    return 'c';
  } else {
    return letter;
  }
}

const reconnaitreMot = ( mot) => {
  var recognise = true;
  var currentState = automata.states.find((elt) => elt.initial === true).name;
  for (let i = 0; i < mot.length; i++) {
    const target = automata.transitions.find(
      (elt) => elt.state === currentState && elt.object === getLetter(mot[i])
    );
    if (!target) {
      recognise = false;
      break;
    } else {
      currentState = target.target;
    }
  }
  if (recognise) {
    const verifyFinal = automata.states.find((elt) => elt.name === currentState);
    if (verifyFinal.final) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export const avoirListeCommentaires = (texte) => {
  const tableauCommentaire = diviserTexte(texte);
  var result = [];
  for(let elt of tableauCommentaire){
    if(elt){
      const ans = reconnaitreMot(elt);
      if(ans){result.push(elt)}
    }
  }
  return result;
}