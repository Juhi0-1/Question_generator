import React from "react";
import { useState } from "react";
import "../App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [difficultyDistribution, setDifficultyDistribution] = useState({
    easy: "",
    medium: "",
    hard: "",
  });
  const [ques, setQues] = useState(null);
  const navigate = useNavigate();
  const handleDifficultyChange = (e) => {
    const { name, value } = e.target;
    setDifficultyDistribution((prevDistribution) => ({
      ...prevDistribution,
      [name]: value,
    }));
  };

  const handleGenerate = () => {
    const dataToSend = {
      totalMarks:
        difficultyDistribution.easy +
        difficultyDistribution.medium +
        difficultyDistribution.hard,
      difficultyDistribution,
    };

    console.log("data sended, ", dataToSend);

    axios
      .post("http://localhost:8000/generate", dataToSend)
      .then((response) => {
        setQues(response.data);
        navigate("/paper", { state: response.data });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="app">
      <div className="h-screen flex flex-col items-center justify-center ">
        <h1 className="text-3xl font-serif font-semibold">
          Welcome to Question Paper Generator
        </h1>
        <p className="text-gray-500 text-xl font-serif ">
          To start with, Enter percentage of{" "}
          <span className="text-green-500">easy </span>,{" "}
          <span className="text-yellow-500">medium </span> and{" "}
          <span className="text-red-500">hard </span> questions you want in your
          question paper.
        </p>
        <div className="flex  flex-col items-start justify-start">
          <div className="text-xl m-3">
            <label className="text-green-800 font-semibold">Easy : </label>
            <input
              name="easy"
              placeholder="Enter percentage"
              className="p-2 border-2 border-gray-200 rounded-lg mx-1 "
              value={difficultyDistribution.easy}
              onChange={handleDifficultyChange}
            />
          </div>
          <div className="text-xl m-3">
            <label className="text-yellow-700 font-semibold">Medium : </label>
            <input
              name="medium"
              placeholder="Enter percentage"
              className="p-2 border-2 border-gray-200 rounded-lg mx-1 "
              value={difficultyDistribution.medium}
              onChange={handleDifficultyChange}
            />
          </div>
          <div className="text-xl m-3">
            <label className="text-red-800 font-semibold">Hard : </label>
            <input
              name="hard"
              placeholder="Enter percentage"
              value={difficultyDistribution.hard}
              onChange={handleDifficultyChange}
              className="p-2 border-2 border-gray-200 rounded-lg mx-1 "
            />
          </div>
        </div>
        <button className="m-2" onClick={handleGenerate}>
          <a
            href="#_"
            className="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-black transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group"
          >
            <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-black group-hover:h-full"></span>
            <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
              <svg
                className="w-5 h-5 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </span>
            <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
              <svg
                className="w-5 h-5 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </span>
            <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">
              GENERATE PAPER
            </span>
          </a>
        </button>
      </div>
    </div>
  );
};

export default Home;
