import React from 'react';
import Input from '../../baseComponents/Input';

const StatesNumber = ({handleChange , data}) => {

  const generateStates = (num) => {
    var str = "";
    for(let i = 0 ; i< num ; i++){
      str += 'q'+i + " "
    }
    return str;
  }
  return (
    <div>
        <p className='text-lg mb-2 '>Entrer le nombre d'états de votre alphabet</p>
        <Input type="number" value={data.statesNumber} name="statesNumber" handleChange={handleChange}/>
        <p className='my-2 text-center text-xl text-bold'> Q = {"{"} {generateStates(data.statesNumber)}   {"}"}  </p>
    </div>
  )
}

export default StatesNumber