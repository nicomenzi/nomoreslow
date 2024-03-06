import { NFT } from "@thirdweb-dev/sdk";
import styles from "../styles/Home.module.css";
import { ThirdwebNftMedia, Web3Button, useAddress, useContract } from "@thirdweb-dev/react";
import { contractAddresses } from "../constants/addresses";
import { parse } from "path";
import { useContext, useEffect, useState } from "react";
import ChainContext from "../context/chain";

type NFTprops = {
    nft: NFT;
    };

export default function StakeNFTCard({ nft }: NFTprops) {
    const address = useAddress();

    const { selectedChain, setSelectedChain } = useContext(ChainContext);

    const [erc721contractAddress, seterc721ContractAddress] = useState(contractAddresses[selectedChain.name][0]);

    const [stakingContractAddress, setStakingContractAddress] = useState(contractAddresses[selectedChain.name][3]);



    const {
        contract: stakeContract
    } = useContract(stakingContractAddress);

    const {
        contract: NFTcontract
    } = useContract(erc721contractAddress, "signature-drop");

    async function stakeNFT(nftid: number[]) {
        if (!address) return;

        const isApproved = await NFTcontract?.isApproved(address, stakingContractAddress);

        if (!isApproved) {
            await NFTcontract?.setApprovalForAll(stakingContractAddress, true);
        }

        await stakeContract?.call("stake", [nftid])
    }
    useEffect(() => {
        seterc721ContractAddress(contractAddresses[selectedChain.name][0]);
        setStakingContractAddress(contractAddresses[selectedChain.name][3]);
    }, [selectedChain]);

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
                contractAddress={stakingContractAddress}
                action={() => stakeNFT([parseInt(nft.metadata.id)])}
                style={{ width: "100%" }}
            >

            Stake</Web3Button>
            
        </div>
    );
}