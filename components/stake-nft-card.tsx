import { NFT } from "@thirdweb-dev/sdk";
import styles from "../styles/Home.module.css";
import { ThirdwebNftMedia, Web3Button, useAddress, useContract } from "@thirdweb-dev/react";
import { ERC721_CONTRACT_ADDRESS, STAKING_CONTRACT_ADDRESS } from "../constants/addresses";
import { parse } from "path";

type NFTprops = {
    nft: NFT;
    };

export default function StakeNFTCard({ nft }: NFTprops) {
    const address = useAddress();

    const {
        contract: stakeContract
    } = useContract(STAKING_CONTRACT_ADDRESS);

    const {
        contract: NFTcontract
    } = useContract(ERC721_CONTRACT_ADDRESS, "signature-drop");

    async function stakeNFT(nftid: number[]) {
        if (!address) return;

        const isApproved = await NFTcontract?.isApproved(address, STAKING_CONTRACT_ADDRESS);

        if (!isApproved) {
            await NFTcontract?.setApprovalForAll(STAKING_CONTRACT_ADDRESS, true);
        }

        await stakeContract?.call("stake", [nftid])
    
    }

    return (
        <div className={styles.card}>
            <ThirdwebNftMedia metadata={nft.metadata}
            width="100%"
            height="auto" 
            />
            <div className="styles.nftinofcontainer">
                <p className={styles.nftName}>{nft.metadata.name}</p>
                <p className={styles.nftTokenId}> TOKEN ID# {nft.metadata.id}</p>
            </div>
            <Web3Button
                contractAddress={STAKING_CONTRACT_ADDRESS}
                action={() => stakeNFT([parseInt(nft.metadata.id)])}
                style={{ width: "100%" }}
            >

            Stake</Web3Button>
            
        </div>
    );
}