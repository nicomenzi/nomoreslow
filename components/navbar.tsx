import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { ConnectWallet } from '@thirdweb-dev/react';

export default function Navbar() {
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
        <ConnectWallet />
      </div>
  );
}