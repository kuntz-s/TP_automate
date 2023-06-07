import React from 'react';
import { generateString } from '../../Constants';

const AlphabetStep = ({data, handleChange}) => {
   
  return (
    <div>
        <p className='text-lg mb-2 '>Entrer l'alphabet de l'automate avec les objects séparés par l'espace</p>
        <textarea className='w-full border border-[#D9D9D9] p-2 ouline-none rounded-md ' name="alphabet" value={generateString(data.alphabet)} onChange={handleChange} placeholder="Ex: a b c d e" />
        <p className='my-2 text-center text-xl text-bold'> Σ = {"{"}  {data.alphabet.toString()} {"}"}  </p>
    </div>
  )
}

export default AlphabetStep