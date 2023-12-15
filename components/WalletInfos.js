import { SS58_PREFIX } from "../artifacts/constants";
import { formatAddressShort } from "../lib/formatAddressShort";
import { formatAddress } from "../lib/formatAddress";
import { useContext, useState, useEffect } from "react";
import { AccountContext } from "../context/AccountProvider";
import { ApiContext } from "../context/ApiProvider"; 

import { useAccountPendingData } from "../artifacts/useAccountPendingData";

const style = {
  wrapper: `flex items-center justify-center mt-14`,
  content: `content-block bg-[#191B1F] rounded-2xl px-8 py-8 min-w-[500px]`
};

const WalletInfos = () => {
 
  const { wallet } = useContext(AccountContext)
  const { network, setNetwork } = useContext(ApiContext);
  const [allAccounts,setAllAccounts] = useState()

  const pendingDataAstar = useAccountPendingData(allAccounts,"astar")
  const pendingDataShiden = useAccountPendingData(allAccounts,"shiden")
  const pendingDataShibuya = useAccountPendingData(allAccounts,"shibuya")

  const accounts_pending_shibuya = pendingDataShibuya?.data?.accounts?.nodes.map(a=>formatAddress(a.id,"astar"))
  const accounts_pending_shiden = pendingDataShiden?.data?.accounts?.nodes.map(a=>formatAddress(a.id,"astar"))
  const accounts_pending_astar = pendingDataAstar?.data?.accounts?.nodes.map(a=>formatAddress(a.id,"astar"))

  useEffect(()=>{
    setNetwork("shiden")
  },[])

  useEffect(() => {
    pendingDataShibuya.refetch()
    pendingDataAstar.refetch()
    pendingDataShiden.refetch()
  }, [allAccounts]);

  useEffect(()=>{
    const loadAccounts = async () => {
      await wallet.enable('Lucky')
      const res= await wallet.getAccounts()
      setAllAccounts(res)
    }
    if (wallet) loadAccounts()
  },[wallet])

  return (
  <div className={style.wrapper}>
      <div className={style.content}>
          <div>
            <div className="py-1">
              <table className="accounts-table">
                {allAccounts ? <tr>
                  <td>Address</td>
                  <td>Name</td>
                  <td>Shibuya</td>
                  <td>Shiden</td>
                  <td>Astar</td>
                </tr>:<></>}
              {allAccounts?.map((a)=>{
                const pendingShibuya = accounts_pending_shibuya?.includes(formatAddress(a.address,"astar"))
                const pendingShiden = accounts_pending_shiden?.includes(formatAddress(a.address,"astar"))
                const pendingAstar = accounts_pending_astar?.includes(formatAddress(a.address,"astar"))
                return <>               
                    <tr>
                      <td>{formatAddressShort(a.address,SS58_PREFIX["astar"])}</td>
                      <td>{a.name}</td>
                      <td className="pending-network">{pendingShibuya?"🍀":""}</td>
                      <td className="pending-network">{pendingShiden?"🍀":""}</td>
                      <td className="pending-network">{pendingAstar?"🍀":""}</td>
                    </tr>
                </>
              })}
              </table>
            </div>
          </div>
      </div>
    </div>
  );
  
};
export default WalletInfos;
