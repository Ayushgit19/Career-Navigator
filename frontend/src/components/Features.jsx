import React, { useState } from "react";
import Chat from "./Chat";
import Resume from "./Resume";
import Interview from "./Interview";
import Skill from "./Skill";

const Features = () => {
  const categories = [
    "career chat",
    "resume analysis",
    "interview prep",
    "skill analysis",
  ];
  const [active, setActive] = useState("career chat");

  return (
    <section id="features">
      <div className="text-white p-6">
        {/* buttons */}
        <div className="flex gap-12 justify-center mb-6">
          {categories.map((category, key) => (
            <button
              key={key}
              onClick={() => setActive(category)}
              className={`px-5 py-2 rounded-full transition-colors duration-300 capitalize cursor-pointer ${
                active === category
                  ? "bg-white text-gray-800"
                  : "text-gray-300 hover:text-white border-2 border-blue-500"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div>
        {active == "career chat" && <Chat />}
        {active == "resume analysis" && <Resume />}
        {active == "interview prep" && <Interview />}
        {active == "skill analysis" && <Skill />}
      </div>
    </section>
  );
};

export default Features;
