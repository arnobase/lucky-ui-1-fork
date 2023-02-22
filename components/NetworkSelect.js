import Image from "next/image"
import styles from "../styles/styles.js"
import shidenLogo from "../assets/Shiden.png";
import shibuyaLogo from "../assets/shibuya.png";
import astarLogo from "../assets/astar.png";
import { useContext } from "react";``
import { ApiContext } from "../context/ApiProvider";

const headerStyle = styles.headerStyle

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