import { useRouter } from 'next/router';
import Image from "next/image"
import Link from 'next/link';
import shidenLogo from "../assets/shiden.png";
import shibuyaLogo from "../assets/shibuya.png";
import astarLogo from "../assets/astar.png";
import { useContext } from "react";``
import { ApiContext } from "../context/ApiProvider";
import ExportedImage from "next-image-export-optimizer";
const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === 'true';

const headerStyle= {
  button: `max-h[50px] flex items-center rounded-2xl mx-1 text-[0.9rem] font-semibold cursor-pointer pr-0 lg:pr-2`,
  //button: `flex items-center content-block bg-[#191B1F] rounded-2xl mx-2  font-bold`,
  buttonPadding: `p-0 lg:p-2`,
  buttonIconContainer: `flex items-center justify-center p-1`,
  network: `mr-2 ml-1 hidden md:inline-block`,
}

const SimpleList = () => (
  <ul>
    {list.map(item => {
      return <li key={item}>{item}</li>;
    })}
  </ul>
);

const DisplayNetwork = () => {
  const { network } = useContext(ApiContext)
  const networkLogo = {astar:astarLogo,shiden:shidenLogo,shibuya:shibuyaLogo}
  if ((network === "astar" || network === "shiden" || network === "shibuya" )) {
    //("network",network,networkLogo[network])
    return (
    <>
      <div className={headerStyle.buttonIconContainer}>
        <ExportedImage src={networkLogo[network]} alt={network} height={20} width={20} />
      </div>
      <p className={headerStyle.network}>{network.charAt(0).toUpperCase() + network.slice(1)}</p>
    </>
    )
}
}

const NetworkSelect = ( () => {
  return <>
  <div className="flex">
   
    <button id="states-button" data-dropdown-toggle="dropdown-states" className={headerStyle.button} type="button">

      <DisplayNetwork />
    </button>
    <div id="dropdown-states" className="z-10 hidden bg-black divide-y divide-gray-100 rounded-lg shadow w-44">
    <ul className="py-2 text-sm text-white" aria-labelledby="states-button">
        <li>
            <a href={isStaticExport ? "/astar.html" : "/astar"} className="inline-flex w-full px-4 py-2 text-sm text-white hover:bg-gray-800">
                <div className="inline-flex items-center">
                   Astar
                </div>
            </a>
        </li>
        <li>
            <a href={isStaticExport ? "/shiden.html" : "/shiden"} className="inline-flex w-full px-4 py-2 text-sm text-white hover:bg-gray-800">
                <div className="inline-flex items-center">
                    Shiden
                </div>
            </a>
        </li>
        <li>
            <a href={isStaticExport ? "/shibuya.html" : "/shibuya"} type="a" className="inline-flex w-full px-4 py-2 text-sm text-white hover:bg-gray-800">
                <div className="inline-flex items-center">
                    Shibuya
                </div>
            </a>
        </li>
    </ul>
    </div>
  </div>
  </>
})

export default NetworkSelect