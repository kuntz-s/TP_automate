import React from "react";
import { createAutomataTable } from "../../Constants";

const TableVisualisation = ({ data, determinisé, minimisé,displayDeterminisé,displayMinimisé }) => {
  
  console.log("deretminise",determinisé)
  const concatItem = (data) => {
    var res = [];
    for (let elt of data) {
      res.push(elt.target);
    }
    return res.toString();
  };

  return (
    <section className="w-full min-h-screen overflow-x-scroll flex flex-col items-center justify-center">
      <div>
        <p className="font-bold uppercase">Automate original</p>
        <table className="border-collapse border border-slate-400">
          <tr>
            <th className="text-left p-8 border border-slate-300 text-lg bg-primary text-white"> </th>
            {data.alphabet.map((elt, id) => {
              return <th key={id} className="text-left p-8 border border-slate-300 text-lg bg-primary text-white">{elt}</th>;
            })}
          </tr>
          {createAutomataTable(data).map((state, id) => {
            return (
              <tr key={id}>
                <td className="text-left p-8 border border-slate-300 text-lg font-bold bg-primary text-white">{data.states[id].initial && "-> "}{data.states[id].final && "* "}{data.states[id].name}</td>
                {state.map((item, id) => {
                  return <td key={id} className="text-left p-8 border border-slate-300">{concatItem(item)}</td>;
                })}
              </tr>
            );
          })}
        </table>
      </div>
      {
          displayDeterminisé && (
            <div className="ml-8 mt-4">
            <p className="font-bold uppercase">Automate determinisé</p>
            <table className="border-collapse border border-slate-400">
              <tr>
                <th className="text-left p-8 border border-slate-300 text-lg bg-primary text-white"> </th>
                {determinisé.alphabet.map((elt, id) => {
                  return <th key={id} className="text-left p-8 border border-slate-300 text-lg bg-primary text-white">{elt}</th>;
                })}
              </tr>
              {createAutomataTable(determinisé).map((state, id) => {
                return (
                  <tr key={id}>
                    <td className="text-left p-8 border border-slate-300 text-lg font-bold bg-primary text-white">{determinisé.states[id].initial && "-> "}{determinisé.states[id].final && "* "}{determinisé.states[id].name}</td>
                    {state.map((item, id) => {
                      return <td key={id} className="text-left p-8 border border-slate-300">{concatItem(item)}</td>;
                    })}
                  </tr>
                );
              })}
            </table>
          </div>
          )
      }
      {
          displayMinimisé && (
            <div className="ml-8 mt-4">
            <p className="font-bold uppercase">Automate minimisé</p>
            <table className="border-collapse border border-slate-400">
              <tr>
                <th className="text-left p-8 border border-slate-300 text-lg bg-primary text-white"> </th>
                {minimisé.alphabet.map((elt, id) => {
                  return <th key={id} className="text-left p-8 border border-slate-300 text-lg bg-primary text-white">{elt}</th>;
                })}
              </tr>
              {createAutomataTable(minimisé).map((state, id) => {
                return (
                  <tr key={id}>
                    <td className="text-left p-8 border border-slate-300 text-lg font-bold bg-primary text-white">{minimisé.states[id].initial && "-> "}{minimisé.states[id].final && "* "}{minimisé.states[id].name}</td>
                    {state.map((item, id) => {
                      return <td key={id} className="text-left p-8 border border-slate-300">{concatItem(item)}</td>;
                    })}
                  </tr>
                );
              })}
            </table>
          </div>
          )
      }
      
    </section>
  );
};

export default TableVisualisation;
