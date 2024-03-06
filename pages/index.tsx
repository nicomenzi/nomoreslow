import { Contract } from "ethers";
import styles from "../styles/Home.module.css";
import { NextPage } from "next";
import ContractCard from "../components/contrac-card";
import { contractAddresses } from "../constants/addresses";
import { useContext, useEffect, useState } from "react";
import ChainContext from "../context/chain";

const Home: NextPage = () => {

  const { selectedChain, setSelectedChain } = useContext(ChainContext);

  const [erc721contractAddress, seterc721ContractAddress] = useState(contractAddresses[selectedChain.name][0]);

  const [stakingContractAddress, setStakingContractAddress] = useState(contractAddresses[selectedChain.name][3]);

  const [erc20contractAddress, seterc20ContractAddress] = useState(contractAddresses[selectedChain.name][1]);

  
  useEffect(() => {
    seterc20ContractAddress(contractAddresses[selectedChain.name][1]);
    seterc721ContractAddress(contractAddresses[selectedChain.name][0]);
    setStakingContractAddress(contractAddresses[selectedChain.name][3]);
}, [selectedChain]);

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
            contractAddress={erc20contractAddress}
            title="ERC20"
            description="Claim ERC 20 Tokens"
          />
          <ContractCard
            href="/contracts/erc721"
            contractAddress={erc721contractAddress}
            title="ERC721"
            description="Claim ERC 721 Tokens"
          />
          <ContractCard
            href="/contracts/staking"
            contractAddress={stakingContractAddress}
            title="Staking"
            description="Stake"
          />
        </div>
      </div>
    </main>
  );
};

export default Home;
