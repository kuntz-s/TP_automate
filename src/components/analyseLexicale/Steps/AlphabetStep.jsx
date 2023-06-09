import React from "react";
import Input from "../../baseComponents/Input";
import { generateString } from "../../Constants";

const AlphabetStep = ({ data, handleChange }) => {
  return (
    <div>
      <div>
        <p className="text-lg  ">Spécifier le nom de votre automate</p>
        <Input
          title="Nom de l'automate"
          name="automataName"
          value={data.automataName}
          handleChange={handleChange}
        />  
      </div>
      <div className="my-8">
        <p className="text-lg mb-2 ">
          Entrer la liste des symboles de l'alphabet de l'automate séparés par l'espace
        </p>
        <textarea
          className="w-full border border-[#D9D9D9] p-2 ouline-none rounded-md outline-primary"
          name="alphabet"
          value={generateString(data.alphabet)}
          onChange={handleChange}
          placeholder="Ex: a b c d e"
        />
        <p className="my-2 text-center text-xl text-bold">
          {" "}
          Σ = {"{"} {data.alphabet.toString()} {"}"}{" "}
        </p>
      </div>
    </div>
  );
};

export default AlphabetStep;
