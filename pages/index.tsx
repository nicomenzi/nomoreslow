import { Contract } from "ethers";
import styles from "../styles/Home.module.css";
import { NextPage } from "next";
import ContractCard from "../components/contrac-card";
import { ERC1155_CONTRACT_ADDRESS, ERC20_CONTRACT_ADDRESS, ERC721_CONTRACT_ADDRESS, STAKING_CONTRACT_ADDRESS } from "../constants/addresses";

const Home: NextPage = () => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            My
            <span className={styles.gradientText0}>
                Contracts
              
            </span>
          </h1>

          <p className={styles.description}> Select a contract to interact with. </p>
        </div>

        <div className={styles.grid}>
          <ContractCard
            href="/contracts/erc20"
            contractAddress={ERC20_CONTRACT_ADDRESS}
            title="ERC20"
            description="Claim ERC 20 Tokens"
          />
          <ContractCard
            href="/contracts/erc721"
            contractAddress={ERC721_CONTRACT_ADDRESS}
            title="ERC721"
            description="Claim ERC 721 Tokens"
          />
          <ContractCard
            href="/contracts/staking"
            contractAddress={STAKING_CONTRACT_ADDRESS}
            title="Staking"
            description="Stake"
          />
        </div>
      </div>
    </main>
  );
};

export default Home;
