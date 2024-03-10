import { use, useEffect, useReducer, useRef } from 'react';
import { Tile as TileModel } from '../models/tile';
import styles from '../styles/Board.module.css';
import Tile from './tile';
import gamerReducer, { initialState } from '../reducers/game-reducer';

export default function Board() {

    const [gameState, dispatch] = useReducer(gamerReducer, initialState)
    const initialized = useRef(false);

    const renderGrid = () => {
        const cells: JSX.Element[] = [];
        const totalCellsCount = 16;
        for (let i = 0; i < totalCellsCount; i++) {
            cells.push(<div key={i} className={styles.cell}></div>);
        }

        return cells;
    };

    const rednerTiles = () => {
        return Object.values(gameState.tiles).map((tile: TileModel, index:number) => {
            return <Tile key={`${index}`} {...tile} />
        });
    }


    useEffect(() => {
        if (initialized.current === false) {
            dispatch({type: "create_tile", tile: {position: [0,1], value: 2}})
            dispatch({type: "create_tile", tile: {position: [0,2], value: 2}})
            initialized.current = true;
        }



    }, [])



    return (
        <div className={styles.board}>
            <div className={styles.tiles}>
            {rednerTiles()}
            </div>
           <div className={styles.grid}>
                {renderGrid()}
            </div>
        </div>
    );
}