import Image from "next/image";
import Header from "../components/Header";
import RafleHistory from "../components/RafleHistory";
import BondAndStake from "../components/BondAndStake";
import ClaimRewards from "../components/ClaimRewards";
//import styles from '../styles/Home.module.css'

const style = {
  wrapper: `h-screen max-h-screen h-min-screen w-screen bg-zinc-800 text-white select-none flex flex-col justify-between`,
};
export default function Home() {
  return (
    <div className={style.wrapper}>
      <Header />
      <BondAndStake />
      <ClaimRewards />
      <RafleHistory />
    </div>
  );
}
