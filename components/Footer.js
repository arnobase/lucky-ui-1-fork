import React from "react";
import Image from "next/image";

const footerStyle= {
  text: `col-span-3 sm:col-span-1 flex text-xs text-white-700 text-center font-semibold  xs:min-w-full`,
  //headwrapper: `p-4 w-screen flex justify-between items-center`,
  wrapper: `flex items-center justify-center py-6`,
  container: `flex justify-center items-center`,
}

function Footer() {
  return (
    <div className={footerStyle.wrapper}>
      <div className={footerStyle.text}>
        Lucky dApp - GPL 2.0 - Dev by GuiGou and Arno - 2023
      </div>
    </div>
  );
}

export default Footer;
