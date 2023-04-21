import { useContext } from "react";
import Button from "./Button";
import { ContractContext } from "../context/ContractProvider";
import toast from 'react-hot-toast';

const ClaimRewards = () => {
  const { rewardManagerContract, claim, claimDryRunRes } = useContext(ContractContext)
  return (
  <>
    <span className="cursor-pointer" onClick={() => claim()}>
      <Button enable={claimDryRunRes?.error===undefined} title="Claim" />
    </span>
  </>
  );
};
export default ClaimRewards;
