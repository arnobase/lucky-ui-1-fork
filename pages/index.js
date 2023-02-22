
import Header from "../components/Header";
import RafleHistory from "../components/RafleHistory";
import AccountInfos from "../components/AccoutInfos";
import { Toaster } from 'react-hot-toast';

export default function Home() {

  return (
    <div>
     
      <Toaster/>
      <Header />
      <AccountInfos />
      <RafleHistory />
    </div>
  );
}
