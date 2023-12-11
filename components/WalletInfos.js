import { formatAddressShort } from "../lib/formatAddressShort";
import { useContext, useState, useEffect } from "react";
import { AccountContext } from "../context/AccountProvider";
import { ApiContext } from "../context/ApiProvider";
import LuckyLogo from "../assets/lucky.svg";

const style = {
  wrapper: `flex items-center justify-center mt-14`,
  content: `content-block bg-[#191B1F] rounded-2xl px-8 py-8 min-w-[500px]`
};

const WalletInfos = () => {
 
  const { account,wallet } = useContext(AccountContext)
  const { network, api, setNetwork } = useContext(ApiContext);
  const [allAccounts,setAllAccounts] = useState()

  useEffect(()=>{
    setNetwork("shiden")
  },[])

  useEffect(()=>{
    const loadAccounts = async () => {
      await wallet.enable('Lucky')
      const res= await wallet.getAccounts()
      setAllAccounts(res)
      console.log("RES",res)
    }
    //console.log("WALLET",wallet)
    console.log("wallet",wallet)
    if (wallet) loadAccounts()
  },[wallet])

  return (<div className={style.wrapper}>
      <div className={style.content}>
          <div>
            <div className="py-1">
            {allAccounts?.map((a)=>{
              return <>
                <div>
                  <span>{formatAddressShort(a.address,network)}</span>
                  <span className="float-right">{a.name}</span>
                </div>
              </>
            })}
            </div>
          </div>
      </div>
    </div>
  );
};
export default WalletInfos;
