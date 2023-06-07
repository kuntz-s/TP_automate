//fonction qui prends en paramètre un tableau de texte et retourne un seul texte 

export const generateString = (table) => {
    var str = '';
    for (let elt of table){
        str+= elt;
        str+=" ";
    }
}


//fonction qui permet de générer les états en fonction du nombre

export const generateState = (num) =>{
    var states=[]
    for(let i = 0 ; i <num; i++){
        states.push({
            id:i,
            name:'q'+i,
            initial:false,
            final:false
        })
    }
    return states;
}


//fonction qui permet d'avoir la liste des états initiaux

export const getInitialList = (data)=> {
    var res = [];
    for(let elt of data)  {
        if(elt.initial){
            res.push(elt.name)
        }
    }
    return res;
}


//fonction qui permet d'avoir la liste des états finaux

export const getFinalList = (data)=> {
    var res = [];
    for(let elt of data)  {
        if(elt.final){
            res.push(elt.name)
        }
    }
    return res;
}

//fonction qui permet de savoir si un elemnt dans la transition est vide 

export const verifyEmptyTransition = (data) => {
    var empty = false;
    for(let elt of data){
        if(!(elt.state && elt.object && elt.target)){
            empty=true;
            break;
        }
    }
    return empty;
}


//fonction qui permet de vérifier si il y'a deux transitions dupliquées

export const verifyDuplicateTransition = (data) => {
    var duplicate = false;
    for(let elt of data){
        var transition = data.filter(e => e.state === elt.state && e.object === elt.object && e.target === elt.target);
        console.log(transition)
        if(transition.length > 1){
            duplicate = true;
            break;
        }
    }
    return duplicate
}

export const transitionDataList = ["state", "object", "target"];

//fonction pour créer le tableau de l'automate

export const createAutomataTable = (data) => {
    var res = [];
    const aLenght = data.alphabet.length;
    for(let elt of data.states){
        let ins = [];
        for(let i = 0 ; i < aLenght; i++){
            let val = data.transitions.filter((trans) => trans.state===elt.name && trans.object === data.alphabet[i]);
            ins.push(val);
        }
        res.push(ins);
        ins = [];
    }
    console.log(res);
   return res;
}


