import React from "react";
const style = {
  confirmButton: `bg-[#2172E5] my-2 rounded-2xl py-6 px-8 text-xl font-semibold flex items-center justify-center cursor-pointer border border-[#2172E5] hover:border-[#234169]`,
};

const Button = (props) => {
  return <div className={style.confirmButton}>{props.title}</div>;
};
export default Button;
