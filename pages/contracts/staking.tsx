import { Web3Button, useAddress, useContract, useContractMetadata, useContractRead, useOwnedNFTs, useTokenBalance } from '@thirdweb-dev/react';
import HeroCard from '../../components/hero-card'
import styles from '../../styles/Home.module.css'
import { ERC20_CONTRACT_ADDRESS, ERC721_CONTRACT_ADDRESS, STAKING_CONTRACT_ADDRESS } from '../../constants/addresses';
import { use, useEffect, useState } from 'react';
import { BigNumber, ethers } from 'ethers';
import StakeNFTCard from '../../components/stake-nft-card';
import UnstakeNFTCard from '../../components/unstake-nft-card';

export default function Staking() {

    const address = useAddress();
    const [claimableRewards, setClaimableRewards] = useState<BigNumber>();

    const {
        contract: stakeContract
    } = useContract(STAKING_CONTRACT_ADDRESS);

    const {
        contract: NFTcontract
    } = useContract(ERC721_CONTRACT_ADDRESS);

    const {
        data: stakingMetadata,
        isLoading: stakingMetadataIsLoading
    } = useContractMetadata(stakeContract);

    const {
        contract: erc20Contract
    } = useContract(ERC20_CONTRACT_ADDRESS);

    const {
        data: tokenbalance,
        isLoading: tokenBalanceIsLoading
    } = useTokenBalance(erc20Contract,address);

    const {
        data: ownedNFTs,
        isLoading: ownedNFTsIsLoading
    } = useOwnedNFTs(NFTcontract, address);

    const {
        data: stakedNFts,
        isLoading: stakedNFTsIsLoading
    } = useContractRead(stakeContract, "getStakeInfo", [address]);

    useEffect(() => {
        if(!stakeContract || !address) return;

        async function getClaimableRewards() {
            const claimableRewards = await stakeContract?.call(
                "getStakeInfo",
                [address]
            )
            setClaimableRewards(claimableRewards[1]);
        };
        getClaimableRewards();
    }, [stakeContract, address]);

    


    return (
        <div className={styles.container}>
            <div className={styles.contractPage}>
                <HeroCard 
                    isloading={stakingMetadataIsLoading}
                    title={stakingMetadata?.name!}
                    description={stakingMetadata?.description!}
                    image={stakingMetadata?.image!}

                />
                <div className={styles.grid}>
                    <div className={styles.componentsCard}>
                        <h3>Rewards</h3>
                        {tokenBalanceIsLoading ? (
                            "Loading..."
                        ) : (
                            <p>Balance: {tokenbalance?.displayValue} {tokenbalance?.symbol}</p>
                        )}
                        {claimableRewards && (
                            <p>Claimable Rewards: {ethers.utils.formatEther(claimableRewards)} {tokenbalance?.symbol}</p>
                        )}
                        <Web3Button
                            contractAddress={STAKING_CONTRACT_ADDRESS}
                            action={(contract) => contract.call("claimRewards", [address])}
                            onSuccess={() => {
                                alert("Rewards Claimed!");
                                setClaimableRewards(ethers.constants.Zero); 
                            
                            }}
                            isDisabled={!claimableRewards || claimableRewards.isZero()}
                            >Claim rewards</Web3Button>
                    </div>
                    <div className={styles.componentsCard}>
                        <h3>Unstaked</h3>
                        {ownedNFTsIsLoading ? (
                            "Loading..."
                        ) : (
                            ownedNFTs && ownedNFTs.length > 0 ? (
                                ownedNFTs.map((nft) => (
                                    <div key={nft.metadata.id} className={styles.nftGrid}>
                                        <StakeNFTCard nft={nft} />
                                    </div>
                                ))
                            ) : (
                                "No NFTs"
                            )
                        )}


                    </div>
                    <div className={styles.componentsCard}>
                        <h3>Staked</h3>
                        {stakedNFTsIsLoading ? (
                            "Loading..."
                        ) : (
                            stakedNFts && stakedNFts.length > 0 ? (
                                stakedNFts[0].map((stakedNFT: BigNumber, index: number) => (
                                    <div key={index} className={styles.nftGrid}>
                                        <UnstakeNFTCard 
                                        tokenid={stakedNFT.toNumber()} 
                                    />
                                    </div>
                                ))
                            ) : (
                                "No NFTs Staked"
                            )
                        )}




                    </div>
                </div>

            </div>
        </div>
    )
}