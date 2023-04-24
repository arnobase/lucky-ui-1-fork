import { useContext } from "react";
import Button from "./Button";
import { ContractContext } from "../context/ContractProvider";

const ClaimRewards = () => {
  const { claim, claimDryRunRes } = useContext(ContractContext)
  return (
  <>
    <span className="cursor-pointer" onClick={() => claim()}>
      <Button enable={claimDryRunRes?.error===undefined} title="Claim now" />
    </span>
  </>
  );
};
export default ClaimRewards;
