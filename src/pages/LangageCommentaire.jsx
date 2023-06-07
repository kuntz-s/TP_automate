import React, { useState } from "react";
import { toast , ToastContainer} from "react-toastify";
import { BiLeftArrowAlt } from "react-icons/bi";
import { useNavigate } from "react-router";

const Container = ({ title, children }) => {
  return (
    <div className="divide-y overflow-y-auto">
      <p className="text-center text-lg font-bold p-4 ">{title}</p>
      <div className="p-4">{children}</div>
    </div>
  );
};

const LangageCommentaire = () => {
  const navigate = useNavigate();
  const [langage, setLangage] = useState("");
  const [comment, setComment] = useState("");

  const generateComment = () => {
    if (langage) {
      setComment(langage);
    } else {
      toast.error("veuillez saisir un texte", {
        position: "top-right",
        autoClose: 3000,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  };

  return (
    <section className="bg-[#F7F7F7] p-16 ">
      <BiLeftArrowAlt
        className="text-3xl hover:cursor-pointer hover:text-primary"
        onClick={() => navigate("/")}
      />
      <div className="text-center my-8">
        <p className="text-3xl text-primary font-bold">
          Langage des commentaires
        </p>
        <p className="py-2 text-xl">
          Saissez votre texte et cliquez sur génerer pour avoir la liste des
          commentaires
        </p>
      </div>
      <div className="bg-white grid md:grid-cols-2 divide-x h-[40vh]  shadow-lg border border-[#D9D9D9] rounded-md ">
        <Container title="Texte">
          <textarea
            className="w-full min-h-[25vh] border-none ouline-none focus:outline-none"
            name="langage"
            value={langage}
            onChange={(e) => setLangage(e.target.value)}
            placeholder="Saisissez votre texte"
          />
        </Container>
        <Container title="Commentaire">
          <p>{comment}</p>
        </Container>
      </div>
      <div className="w-full flex justify-center my-4">
        <button
          className="rounded-md bg-primary text-white px-6 py-2 hover:cursor-pointer hover:bg-primary/90"
          onClick={generateComment}
        >
          Generer
        </button>
      </div>
      <ToastContainer/>
    </section>
  );
};

export default LangageCommentaire;
