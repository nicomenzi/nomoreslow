import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { ConnectWallet } from '@thirdweb-dev/react';
import ChainContext from '../context/chain';
import { useContext } from 'react';
import { Scroll, Sepolia } from "@thirdweb-dev/chains";


export default function Navbar() {
  const { selectedChain, setSelectedChain } = useContext(ChainContext);

  const handleChainChange = (e) => {
    const chain = e.target.value;
    switch (chain) {
      case "Mainnet":
        setSelectedChain(Scroll);
        console.log(Scroll.name);
        break;
      case "Sepolia":
      default:
        setSelectedChain(Sepolia);
        console.log(Sepolia.name);
        break;
    }
  };
  return (
      <div className={styles.navbarContainer}>
        <Link href="/">
            <p 
                className={styles.gradientText1} 
                style={{
                    cursor:'pointer', 
                    fontSize: '1.2 rem', 
                    fontWeight:'bold'
                }}>
                No More Slow
            </p>
        
        </Link>
        <select onChange={handleChainChange} style={{ marginLeft: '20px', padding: '5px' }}>
        <option value="Sepolia">Sepolia</option>
        <option value="Mainnet">Mainnet</option>
        {/* Add more chains as options here */}
        </select>
        <ConnectWallet />
      </div>
  );
}