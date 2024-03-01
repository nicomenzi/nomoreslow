import { MediaRenderer } from '@thirdweb-dev/react';
import styles from '../styles/Home.module.css';

type HeroCardProps = {
    isloading: boolean;
    title: string;
    description: string;
    image: string;
};

export default function HeroCard(props: HeroCardProps) {
    return (
        <>
            {props.isloading ? (
                <div className={styles.loadingText}>
                    <p>Loading...</p>
                </div>

            ) : (
                <div className={styles.heroContainer}>
                    <MediaRenderer 
                        src={props.image} 
                        alt={props.title} 
                        width='30%' 
                        height='Auto' 
                        className={styles.heroImage}
                    />
                    <div className={styles.HeroCardContent}>
                        <h1 className={styles.gradientText1}>{props.title}</h1>
                        <p>{props.description}</p>
                    </div>

                </div>
            )}
        </>

    )

}