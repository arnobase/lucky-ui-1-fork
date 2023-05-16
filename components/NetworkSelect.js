import { useRouter } from 'next/router';
import Image from "next/image"
import shidenLogo from "../assets/shiden.png";
import shibuyaLogo from "../assets/shibuya.png";
import astarLogo from "../assets/astar.png";
import { useContext } from "react";``
import { ApiContext } from "../context/ApiProvider";

const headerStyle= {
  button: `max-h[50px] flex items-center content-block bg-[#191B1F] hover:bg-[#333437] rounded-2xl mx-2 text-[0.9rem] font-semibold cursor-pointer p-2 pr-4`,
  //button: `flex items-center content-block bg-[#191B1F] rounded-2xl mx-2  font-bold`,
  buttonPadding: `p-2`,
  buttonIconContainer: `flex items-center justify-center p-2`,
  network: `mr-2`,
}

const SimpleList = () => (
  <ul>
    {list.map(item => {
      return <li key={item}>{item}</li>;
    })}
  </ul>
);

/*
const NetworkSelect = ( () => {
  const { network } = useContext(ApiContext)
  const networkLogo = {astar:astarLogo,shiden:shidenLogo,shibuya:shibuyaLogo}
  return <>
    <div className={`${headerStyle.button} ${headerStyle.buttonPadding}`}>
      <div className={headerStyle.buttonIconContainer}>
          <Image src={networkLogo[network]} alt={network} height={20} width={20} />
      </div>
      <p className={headerStyle.network}>Shibuya</p>
    </div>
  </>
})*/

const DisplayNetwork = () => {
  const { network } = useContext(ApiContext)
  const networkLogo = {astar:astarLogo,shiden:shidenLogo,shibuya:shibuyaLogo}
  if (network) return (<><div className={headerStyle.buttonIconContainer}>
    <Image src={networkLogo[network]} alt={network} height={20} width={20} />
</div>
<p className={headerStyle.network}>{network}</p></>)
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
            <a className="inline-flex w-full px-4 py-2 text-sm text-white hover:bg-gray-800">
                <div className="inline-flex items-center">
                   Astar (Soon!)
                </div>
            </a>
        </li>
        <li>
            <a href="/shiden" className="inline-flex w-full px-4 py-2 text-sm text-white hover:bg-gray-800">
                <div className="inline-flex items-center">
                    Shiden
                </div>
            </a>
        </li>
        <li>
            <a href="/shibuya" type="a" className="inline-flex w-full px-4 py-2 text-sm text-white hover:bg-gray-800">
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