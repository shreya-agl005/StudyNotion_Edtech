import React from "react";

const HighlightText = ({text}) => {
  return (
    <span className="bg-gradient-to-b from-brand-teal via-brand-tealdeep to-brand-dark text-transparent bg-clip-text font-bold">
      {" "}
      {text}
    </span>
  );
};

export default HighlightText;
