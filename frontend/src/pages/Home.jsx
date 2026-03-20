import React from "react";
import Features from "../components/Features";

const Home = () => {
  return (
    <div className="bg-gray-900 min-h-screen p-3">
      <div className="flex flex-row justify-center items-center my-5 mb-10">
        <h4 className="text-4xl font-bold text-white mb-2">
          Welcome to Skill-Bridge Career Navigator
        </h4>
      </div>
      <Features />
    </div>
  );
};

export default Home;
