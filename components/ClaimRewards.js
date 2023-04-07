import { useContext } from "react";
import Button from "./Button";
import { ContractContext } from "../context/ContractProvider";
import toast from 'react-hot-toast';

const ClaimRewards = () => {
  const { rewardManagerContract, claim, claimDryRunRes } = useContext(ContractContext)
  const Enable = (()=>{
    return claimDryRunRes?.error !== undefined && claimDryRunRes?.error !== "NoReward"
  })
  return (
  <>
    <span className="cursor-pointer" onClick={() => claim()}>
      {claimDryRunRes?.error}
      <Button enable={Enable()} title="Claim" />
    </span>
  </>
  );
};
export default ClaimRewards;
