import { ThirdwebNftMedia, Web3Button, useAddress, useContract, useNFT } from "@thirdweb-dev/react";
import { ERC721_CONTRACT_ADDRESS, STAKING_CONTRACT_ADDRESS } from "../constants/addresses";
import styles from "../styles/Home.module.css";


type NFTprops = {
    tokenid: number;
};

export default function UnstakeNFTCard({ tokenid }: NFTprops) {
    const {
        contract: NFTcontract
    } = useContract(ERC721_CONTRACT_ADDRESS, "signature-drop");

    const {
        contract: stakeContract
    } = useContract(STAKING_CONTRACT_ADDRESS);

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
                contractAddress={STAKING_CONTRACT_ADDRESS}
                action={(contract) => contract.call("withdraw", [[tokenid]])}
                style={{ width: "100%" }}
            >
                Unstake
            </Web3Button>



        </div>
    
        );
}
