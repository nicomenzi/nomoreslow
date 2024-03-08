import styles from '../styles/Board.module.css';
import Tile from './tile';

export default function Board() {

    const renderGrid = () => {
        const cells: JSX.Element[] = [];
        const totalCellsCount = 16;
        for (let i = 0; i < totalCellsCount; i++) {
            cells.push(<div key={i} className={styles.cell}></div>);
        }

        return cells;
    }



    return (
        <div className={styles.board}>
            <div className={styles.tiles}>
            <Tile />
            </div>
           <div className={styles.grid}>
                {renderGrid()}
            </div>
        </div>
    );
}