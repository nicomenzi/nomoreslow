import { ThirdwebNftMedia, Web3Button, useAddress, useContract, useNFT } from "@thirdweb-dev/react";
import { contractAddresses } from "../constants/addresses";
import styles from "../styles/Home.module.css";
import { useContext, useEffect, useState } from "react";
import ChainContext from "../context/chain";


type NFTprops = {
    tokenid: number;
};

export default function UnstakeNFTCard({ tokenid }: NFTprops) {

    const { selectedChain, setSelectedChain } = useContext(ChainContext);

    const [erc721contractAddress, seterc721ContractAddress] = useState(contractAddresses[selectedChain.name][0]);

    const [stakingContractAddress, setStakingContractAddress] = useState(contractAddresses[selectedChain.name][3]);

    useEffect(() => {
        seterc721ContractAddress(contractAddresses[selectedChain.name][0]);
        setStakingContractAddress(contractAddresses[selectedChain.name][3]);
    }, [selectedChain]);

    const {
        contract: NFTcontract
    } = useContract(erc721contractAddress, "signature-drop");

    const {
        contract: stakeContract
    } = useContract(stakingContractAddress);

    const {
        data: nftMetadata,
        isLoading: nftMetadataIsLoading
    } = useNFT(NFTcontract, tokenid);
    return (
        <div className={styles.card}>
            {nftMetadataIsLoading ? (
                "Loading..."
            ) : (
                <ThirdwebNftMedia metadata={nftMetadata?.metadata!}
                width="100%"
                height="auto"
                />
            )}

            
            <div className={styles.nftinofcontainer}>
                <p className={styles.nftName}>{nftMetadata?.metadata.name}</p>
                <p className={styles.nftTokenId}> TOKEN ID# {nftMetadata?.metadata.id}</p>
            </div>
            <Web3Button
                contractAddress={stakingContractAddress}
                action={(contract) => contract.call("withdraw", [[tokenid]])}
                style={{ width: "100%" }}
            >
                Unstake
            </Web3Button>



        </div>
    
        );
}
