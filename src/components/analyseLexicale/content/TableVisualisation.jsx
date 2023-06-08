import React from "react";
import { createAutomataTable } from "../../Constants";

const TableVisualisation = ({ data }) => {
  const concatItem = (data) => {
    var res = [];
    for (let elt of data) {
      res.push(elt.target);
    }
    return res.toString();
  };

  return (
    <section className="w-full h-screen flex items-center justify-center">
      <div>
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
    </section>
  );
};

export default TableVisualisation;
