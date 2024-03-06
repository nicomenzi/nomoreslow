import { ThirdwebNftMedia, Web3Button, useAddress, useClaimedNFTSupply, useContract, useContractMetadata, useOwnedNFTs, useTotalCount } from '@thirdweb-dev/react';
import HeroCard from '../../components/hero-card'
import { contractAddresses } from "../../constants/addresses";
import styles from '../../styles/Home.module.css'
import NFTstyles from '../../styles/NFT.module.css'
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import ChainContext from '../../context/chain';

export default function Erc721() {

    const { selectedChain, setSelectedChain } = useContext(ChainContext);

    const [erc721contractAddress, seterc721ContractAddress] = useState(contractAddresses[selectedChain.name][0]);

    const address = useAddress();
    const {
        contract
    } = useContract(erc721contractAddress, "signature-drop");
    const {
        data: contractMetadata,
        isLoading: contractMetadataIsLoading
    } = useContractMetadata(contract);

    const {
        data: totalSupply,
        isLoading: totalSupplyIsLoading
    } = useTotalCount(contract);

    const {
        data: totalClaimedSupply,
        isLoading: totalClaimedSupplyIsLoading
    } = useClaimedNFTSupply(contract);

    const {
        data: ownedNFTs,
        isLoading: ownedNFTsIsLoading
    } = useOwnedNFTs(contract, address);

    useEffect(() => {
        seterc721ContractAddress(contractAddresses[selectedChain.name][0]);
    }, [selectedChain]);

    return (
        <div className={styles.container}>
            <div className={styles.contractPage}>
                <HeroCard
                    isloading={contractMetadataIsLoading}
                    title={contractMetadata?.name!}
                    description={contractMetadata?.description!}
                    image={contractMetadata?.image!}
                />
                <div className={styles.grid}>
                    <div className={styles.componentsCard}>
                        <h3>Claim ERC721</h3>
                        <p>Claim your free NFT</p>
                        <Web3Button
                            contractAddress={erc721contractAddress}
                            action={(contract) => contract.erc721.claim(1)}
                            onSuccess={() => alert("NFT Claimed!")}
                        >Claim NFT</Web3Button>
                    </div>
                    <div className={styles.componentsCard}>
                        <h3>Contract Stats</h3>
                        <p>Total Supply: 
                            {totalSupplyIsLoading ? (
                                "Loading..."
                            ) : (
                                `${totalSupply}`
                            )}
                        </p>
                        <p>Total Claimed: 
                            {totalClaimedSupplyIsLoading ? (
                                "Loading..."
                            ) : (
                                `${totalClaimedSupply}`
                            )}
                        </p>
                    </div>
                    <div className={styles.componentsCard}>
                        <h3>Your NFTS</h3>
                        <p>
                            Total Owned:
                            {ownedNFTsIsLoading ? (
                                "Loading..."
                            ) : (
                                `${ownedNFTs?.length}`
                            )}
                        </p>
                    </div>
                    <div className={styles.container}>
                        <h2>My NFTS</h2>
                        <div className={styles.grid}>
                            {ownedNFTsIsLoading ? (
                                "Loading..."
                            ) : (
                                ownedNFTs?.map((nft) => (
                                    <div className={styles.card} key={nft.metadata.id}>
                                        <ThirdwebNftMedia
                                            metadata={nft.metadata}
                                        />
                                        <div className={styles.cardText}>
                                            <h2>{nft.metadata.name}</h2>
                                        </div>
                                        <Link href={"/contracts/staking"}>
                                            <button>Stake NFT</button>
                                        </Link>
                                    </div>
                                ))

                            )}
                                
                        </div>
                    </div>
                    

                </div>
            </div>
        </div>
    )
}