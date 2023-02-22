import Image from "next/image"
import styles from "../styles/styles.js"
import shidenLogo from "../assets/shiden.png";
import shibuyaLogo from "../assets/shibuya.png";
import astarLogo from "../assets/astar.png";
import { useContext } from "react";``
import { ApiContext } from "../context/ApiProvider";

const headerStyle= {
  //button: `flex items-center bg-[#191B1F] hover:bg-[#333437] rounded-2xl mx-2 text-[0.9rem] font-semibold cursor-pointer`,
  button: `flex items-center bg-[#191B1F] rounded-2xl mx-2 text-[0.9rem] font-semibold`,
  buttonPadding: `p-2`,
  buttonIconContainer: `flex items-center justify-center p-2`,
  network: `mr-2`,
}

const NetworkSelect = ( () => {
  const { network } = useContext(ApiContext)
  const networkLogo = {astar:astarLogo,shiden:shidenLogo,shibuya:shibuyaLogo}
  return <div className={`${headerStyle.button} ${headerStyle.buttonPadding}`}>
        <div className={headerStyle.buttonIconContainer}>
            <Image src={networkLogo[network]} alt={network} height={styles.btnLogoSize} width={styles.btnLogoSize} />
        </div>
        <p className={headerStyle.network}>Shibuya</p>
      </div>
    
})

export default NetworkSelect