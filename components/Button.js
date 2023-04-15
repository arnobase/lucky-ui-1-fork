import React from "react";
const style = {
  //confirmButton: `bg-[#2172E5] my-2 rounded-2xl py-6 px-8 text-xl font-semibold flex items-center justify-center cursor-pointer border border-[#2172E5] hover:border-[#234169]`,
  confirmButton: `bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-0 px-2 rounded inline-flex items-center`
};

const Button = (props) => {
  return <button disabled={!props.enable} className={style.confirmButton}>{props.title}</button>;
};
export default Button;
