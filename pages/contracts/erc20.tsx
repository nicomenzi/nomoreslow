import { useContract, useContractMetadata, useTokenSupply, useAddress, useTokenBalance, Web3Button } from "@thirdweb-dev/react";
import HeroCard from "../../components/hero-card";
import { ERC20_CONTRACT_ADDRESS } from "../../constants/addresses";
import styles from "../../styles/Home.module.css";
import Link from "next/link";



export default function Erc20() {

    const address = useAddress();

    const {
        contract
    } = useContract(ERC20_CONTRACT_ADDRESS, "token");

    const {
        data: contractMetadata,
        isLoading: contractMetadataIsLoading
    } = useContractMetadata(contract);

    const {
        data: tokenSupply,
        isLoading: tokenSupplyIsLoading
    } = useTokenSupply(contract);

    const {
        data : tokenBalance,
        isLoading: tokenBalanceIsLoading
    } = useTokenBalance(contract, address);


    return (
        <div className={styles.container}>
            <HeroCard
                isloading={contractMetadataIsLoading}
                title={contractMetadata?.name!}
                description={contractMetadata?.description!}
                image={contractMetadata?.image!}
            />
            <div className={styles.grid}>
                <div className={styles.componentsCard}>
                    <h3>Token Stats</h3>
                    {tokenSupplyIsLoading ? (
                        <p>Loading...</p>
                    ) : (
                        <div>
                            <p>Total Supply: {tokenSupply?.displayValue} {tokenSupply?.symbol} </p>
                        </div>
                    )}
                </div>
                <div className={styles.componentsCard}>
                    <h3>Token Balance</h3>
                    {tokenBalanceIsLoading ? (
                        <p>Loading...</p>
                    ) : (
                        <div>
                            <p>Your Balance: {tokenBalance?.displayValue} {tokenBalance?.symbol} </p>
                        </div>
                    )}
                    <Web3Button 
                        contractAddress={ERC20_CONTRACT_ADDRESS}
                        action={(contract) => contract.erc20.burn(10)}
                    >Burn 10 Tokens</Web3Button>
                </div>
                <div className={styles.componentsCard}>
                    <h3>Earned Tokens</h3>
                    <p>Earn more Tokens by staking your NFT</p>
                    <div>
                        <Link href="/contracts/erc721"><button className={styles.matchButton}>Stake NFT</button></Link>
                    </div>
                </div>
                

            </div>
        </div>


    )

}