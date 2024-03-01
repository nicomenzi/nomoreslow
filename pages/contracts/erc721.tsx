import { useContract, useContractMetadata } from '@thirdweb-dev/react';
import HeroCard from '../../components/hero-card'
import { ERC721_CONTRACT_ADDRESS } from '../../constants/addresses';
import styles from '../../styles/Home.module.css'

export default function Erc721() {
    const {
        contract
    } = useContract(ERC721_CONTRACT_ADDRESS, "signature-drop");
    const {
        data: contractMetadata,
        isLoading: contractMetadataIsLoading
    } = useContractMetadata(contract);

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
                        <p>Token Stats will go here</p>
                    </div>
                    <div className={styles.componentsCard}>
                        <h3>Contract Stats</h3>
                        <p>Token Balance will go here</p>
                    </div>
                    <div className={styles.componentsCard}>
                        <h3>Your NFTS</h3>
                        <p>Token Balance will go here</p>
                    </div>


                </div>
            </div>
        </div>
    )
}