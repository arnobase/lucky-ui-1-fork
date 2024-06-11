import { Unbounded } from 'next/font/google'
const unbounded = Unbounded({
  subsets: ['latin'],
  display: 'swap',
})

import ExportedImage from "next-image-export-optimizer";
import astar_logo_name from "../assets/astar-logo-name.svg"
import ad_logo_name from "../assets/ad-logo-name.svg"
import pink_logo from "../assets/pink-logo.svg"
import polkadot_logo_name from "../assets/polkadot.svg"
import phala_logo from "../assets/phala-logo.svg"
import phala_name from "../assets/phala-name.svg"
import lucky_logo from "../assets/lucky-logo-only.svg"

const LottoFooter = () => {
  return (<>

    <div class="flex items-center justify-center ">
      <div class="margin-auto text-center text-lg align-middle leading-8">
        <div></div>
        <div>Lotto is a game made by <ExportedImage className="inline px-1" src={lucky_logo} alt="Lucky" height={33} width={33} />Lucky in a partnership with <ExportedImage className="inline" src={pink_logo} alt="Pink" height={20} width={25} /><span className={unbounded.className+' align-middle pl-1'}>PI<span className='mirrorX inline-block'>N</span>K</span> and <ExportedImage className="inline" src={ad_logo_name} alt="Astar Degens" height={20} width={170} /></div>
        <div>built on <ExportedImage className="inline" src={astar_logo_name} alt="Astar" height={15} width={100} />, 
        <ExportedImage className="inline ml-1 mr-2" src={phala_logo} alt="Phala" height={23} width={23} /><ExportedImage className="inline mr-1" src={phala_name} alt="Phala Network" height={23} width={70} />
        
          and <img className="inline ml-1" src="https://apillon.io/images/logo.svg" width="120" /></div>
        <div>powered by <ExportedImage className="inline align-middle" src={polkadot_logo_name} alt="Astar" height={15} width={110} /></div>
      </div>
    </div>

  </>);
  
};
export default LottoFooter;
