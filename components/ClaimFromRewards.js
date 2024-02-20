import { useContext } from "react";
import Button from "./Button";
import { ContractContext } from "../context/ContractProvider";

const ClaimFromRewards = (params) => {
  const { claimFrom, claimFromDryRunRes } = useContext(ContractContext)
  //console.log("claimFromDryRunRes",claimFromDryRunRes)
    return (
      <>
        <span className="cursor-pointer" onClick={() => claimFrom(params.from)}>
          <Button enable={claimFromDryRunRes?.error===undefined} title="Claim now" />
        </span>
      </>
    );
};
export default ClaimFromRewards;
