import React from "react";
import { useLocation } from "react-router-dom";
import "../App.css";
const Questions = () => {
  const location = useLocation();
  const recievedQues = location.state;
  let counter = 1;
  return (
    <div className="app">
      <div className="flex flex-col  items-center justify-center">
        <h1 className="font-serif text-3xl font-bold m-5">Question Paper</h1>
        <h2 className="font-serif text-md font-semibold">
          Total Questions : {recievedQues.length}
        </h2>
        <div className=" ">
          {recievedQues.map((ques) => (
            <div
              key={ques._id}
              className="m-5 p-6 border-2 border-gray-200 font-semibold rounded-md"
            >
              <div className="flex flex-row justify-between text-lg">
                <p className="text-blue-900">{ques.subject}</p>
                <p className={`${getColorClass(ques.difficulty)}`}>
                  {" "}
                  {ques.difficulty} : {ques.marks}{" "}
                </p>
              </div>
              <div className="flex flex-row  justify-items-start text-xl">
                <p>{counter++}.</p>
                <p>{ques.question}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

function getColorClass(value) {
  switch (value) {
    case "easy":
      return "text-green-700"; 
    case "medium":
      return "text-yellow-700";
    case "hard":
      return "text-red-700";
    default:
      return "text-gray-500"; 
  }
}

export default Questions;
